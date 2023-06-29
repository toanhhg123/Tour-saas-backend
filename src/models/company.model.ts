import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import { entites } from '@/types/consts'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Account from './account.model'

export interface ICompany {
  id: string
  name: string
  address: string
  email: string
  phone: string
  operatorId: string
  createdAt: Date
  updatedAt: Date
}

class Company extends Model<
  InferAttributes<Company>,
  InferCreationAttributes<Company>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare address: string
  declare email: string
  declare phone: string

  public operatorId!: ForeignKey<Account['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

Company.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    operatorId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    name: {
      type: DataTypes.STRING
    },
    phone: {
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
  {
    tableName: entites.Company,
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default Company
