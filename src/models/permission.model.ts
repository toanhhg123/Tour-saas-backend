import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import { entites } from '@/types/consts'
import type { BelongsTo, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Role from './role.model'
import type Entity from './entity.model'
import type { TypePermission } from '@/types/IAuthType'

export interface IPermission {
  perms: TypePermission[]
  roleId: string
  entityId: number
}

const STRING_CONCAT = '<<--->>'
class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
  public declare id: CreationOptional<string>
  public declare perms: string

  setPerms(actions: TypePermission[]) {
    this.perms = actions.join(STRING_CONCAT)
  }

  public declare roleId: ForeignKey<Role['id']>
  public declare entityId: ForeignKey<Entity['id']>

  public readonly role?: Role
  public readonly entity?: Entity

  public static associations: {
    role: BelongsTo<Permission, Role>
    entity: BelongsTo<Permission, Entity>
  }
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

Permission.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    perms: {
      type: DataTypes.STRING,
      get(): Array<string> {
        return this.getDataValue('perms').split(STRING_CONCAT)
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  { tableName: entites.Permission, timestamps: true, sequelize: sequelizeMysql }
)

export default Permission
