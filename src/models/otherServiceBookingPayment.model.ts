import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Optional
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type OtherServiceBooking from './otherServiceBooking.model'

class OtherServiceBookingPayment extends Model<
  InferAttributes<OtherServiceBookingPayment>,
  InferCreationAttributes<OtherServiceBookingPayment>
> {
  public declare id: CreationOptional<string>
  public declare date: Date
  public declare amount: number
  public declare otherServiceBookingId: ForeignKey<
    OtherServiceBooking['id']
  >

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

export type IOtherServiceBookingPayment =
  InferAttributes<OtherServiceBookingPayment>

export type OSBookingPaymentCreationAttributes = Optional<
  OtherServiceBookingPayment,
  'id' | 'createdAt' | 'updatedAt'
>

OtherServiceBookingPayment.init(
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
    otherServiceBookingId: {
      type: DataTypes.UUID
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
    tableName: 'OtherServiceBookingPayments',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default OtherServiceBookingPayment
