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

class TourAgentSales extends Model<
  InferAttributes<TourAgentSales>,
  InferCreationAttributes<TourAgentSales>
> {
  public declare id: CreationOptional<string>
  public declare saleId: ForeignKey<Account['id']>
  public declare tourId: ForeignKey<Tour['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

export type ITourAgentSales =
  InferAttributes<TourAgentSales>

export type TourAgentSalesCreationAttributes = Optional<
  TourAgentSales,
  'id' | 'createdAt' | 'updatedAt'
>

TourAgentSales.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    saleId: {
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
    tableName: 'TourAgentSales',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default TourAgentSales
