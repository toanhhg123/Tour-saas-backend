import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import Role from '@/models/role.model'
import type { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import Account from './account.model'

class AccountRole extends Model<InferAttributes<AccountRole>, InferCreationAttributes<AccountRole>> {
  public id!: CreationOptional<string>
  public accountId!: ForeignKey<Account['id']>
  public roleId!: ForeignKey<Role['id']>

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

AccountRole.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    accountId: {
      type: DataTypes.UUID
    },
    roleId: {
      type: DataTypes.UUID
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
  { tableName: 'AccountRole', modelName: 'AccountRole', timestamps: true, sequelize: sequelizeMysql }
)

Account.belongsToMany(Role, { through: AccountRole, as: 'roles', foreignKey: 'roleId' })
Role.belongsToMany(Account, { through: AccountRole, as: 'users', foreignKey: 'accountId' })

export default AccountRole
