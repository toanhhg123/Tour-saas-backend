import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Optional
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Tour from './tour.model'
import type Account from './account.model'

class TourOperSales extends Model<
  InferAttributes<TourOperSales>,
  InferCreationAttributes<TourOperSales>
> {
  public declare id: CreationOptional<string>
  public declare operSaleId: ForeignKey<Account['id']>
  public declare tourId: ForeignKey<Tour['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

export type ITourOperSales = InferAttributes<TourOperSales>

export type TourOperSalesCreationAttributes = Optional<
  TourOperSales,
  'id' | 'createdAt' | 'updatedAt'
>

TourOperSales.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    operSaleId: {
      type: DataTypes.UUID
    },
    tourId: {
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
  {
    tableName: 'TourOperSales',
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeMysql
  }
)

export default TourOperSales
