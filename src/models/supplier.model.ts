import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import { entites } from '@/types/consts'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Optional
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Account from './account.model'

class Supplier extends Model<
  InferAttributes<Supplier>,
  InferCreationAttributes<Supplier>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare address: string
  declare email: string
  declare phone: string
  declare isDeleted: boolean

  public operatorId!: ForeignKey<Account['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

export type ISupplier = InferAttributes<Supplier>

export type SupplierCreationAttributes = Optional<
  Supplier,
  'id' | 'createdAt' | 'updatedAt'
>

Supplier.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    operatorId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    tableName: entites.Supplier,
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default Supplier
