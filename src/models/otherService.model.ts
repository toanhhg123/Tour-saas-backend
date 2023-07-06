import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Optional
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Supplier from './supplier.model'

class OtherService extends Model<
  InferAttributes<OtherService>,
  InferCreationAttributes<OtherService>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare price: number
  declare supplierId: ForeignKey<Supplier['id']>
  declare isDeleted: boolean
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
  declare supplier?: NonAttribute<Supplier>
}

export type IOtherService = InferAttributes<OtherService>

export type OtherServiceCreationAttributes = Optional<
  IOtherService,
  'id' | 'createdAt' | 'updatedAt'
>

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
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
