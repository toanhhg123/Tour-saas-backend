import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Role from '@/models/role.model'
import type { BelongsToMany, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
  declare id: string
  declare fullName: string
  declare password: string
  declare phoneNumber: string
  declare email: string
  declare address: string | null

  public readonly roles?: Role[]

  public static associations: {
    users: BelongsToMany<Account, Role>
  }

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    fullName: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
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
  { tableName: 'Accounts', timestamps: true, sequelize: sequelizeMysql }
)

export default Account
