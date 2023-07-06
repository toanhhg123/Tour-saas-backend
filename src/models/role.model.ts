import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Account from '@/models/account.model'
import { entites } from '@/types/consts'
import type {
  Association,
  BelongsToMany,
  CreationOptional,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Permisstion from '@/models/permission.model'
import type { TypeRole } from '@/types/IAuthType'

export interface IRole {
  name: TypeRole
  desc?: string
}

class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  public declare id: CreationOptional<string>
  public declare name: TypeRole
  public declare desc?: string
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
  public readonly accounts?: Account[]
  public declare getPermissions: HasManyGetAssociationsMixin<Permisstion>
  public declare permissions?: NonAttribute<Permisstion[]>
  public static associations: {
    accounts: BelongsToMany<Role, Account>
    permissions: Association<Role, Permisstion>
  }
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    desc: {
      type: DataTypes.STRING
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
  {
    tableName: entites.Role,
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default Role
