import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Role from '@/models/role.model'
import { entites } from '@/types/consts'
import * as bcrypt from 'bcrypt'
import type {
  BelongsTo,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Company from './company.model'

export interface IAccount {
  fullName: string
  password: string
  phoneNumber: string
  email: string
  address: string | null
  companyId?: string
  roleId: string
  status: AccountStatus
  passport?: string
  passportExp?: Date
}

export enum AccountStatus {
  acctive = 'active',
  blocked = 'blocked',
  deleted = 'deleted',
  waiting = 'watting'
}

class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  declare id: CreationOptional<string>
  declare fullName: string
  declare password: string
  declare phoneNumber: string
  declare email: string
  declare address: string | null
  declare status: AccountStatus
  declare passport?: string
  declare passportExp?: Date

  public companyId!: ForeignKey<Company['id']>
  public operatorId!: ForeignKey<Account['id']>
  public supplierId!: ForeignKey<Company['id']>
  public roleId!: ForeignKey<Role['id']>
  public readonly role?: Role
  public readonly company?: Company

  public static async validPassword(
    account: Account,
    password: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, account.password)
  }

  public static associations: {
    role: BelongsTo<Account, Role>
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
    companyId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    operatorId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    roleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    supplierId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    status: {
      type: DataTypes.ENUM(...Object.values(AccountStatus)),
      defaultValue: AccountStatus.waiting
    },
    fullName: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passport: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    passportExp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
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
    tableName: entites.Account,
    timestamps: true,
    sequelize: sequelizeMysql,
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  }
)
export default Account
