import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Supplier from './supplier.model'

export interface IOtherService {
  id: string
  name: string
  price: number
  supplierId: string
  createdAt: Date
  updatedAt: Date
}

class OtherService extends Model<
  InferAttributes<OtherService>,
  InferCreationAttributes<OtherService>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare price: number
  declare supplierId: ForeignKey<Supplier['id']>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare supplier?: NonAttribute<Supplier>
}

OtherService.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    supplierId: {
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
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
    tableName: 'OtherServices',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default OtherService
