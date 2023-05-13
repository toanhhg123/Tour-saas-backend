import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Account from '@/models/account.model'
import type { BelongsToMany, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: string
  declare name: string
  declare desc?: string

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>

  public readonly accounts?: Account[] // Define the association property
  public static associations: {
    accounts: BelongsToMany<Role, Account>
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
      type: DataTypes.STRING
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
  { tableName: 'Roles', timestamps: true, sequelize: sequelizeMysql }
)

export default Role
