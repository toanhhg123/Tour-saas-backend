import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import { entites } from '@/types/consts'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type TourService from './tourService.model'

class TourPayment extends Model<
  InferAttributes<TourPayment>,
  InferCreationAttributes<TourPayment>
> {
  declare id: CreationOptional<string>
  declare date: Date
  declare amount: number

  public serviceId!: ForeignKey<TourService['id']>

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

TourPayment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    date: {
      type: DataTypes.DATE
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
    },
    amount: {
      type: DataTypes.DOUBLE
    }
  },
  {
    tableName: entites.TourPayment,
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default TourPayment
