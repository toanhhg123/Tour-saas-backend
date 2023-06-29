import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Booking from './booking.model'

export interface IBookingPayment {
  id: string
  date: Date
  amount: number
  note: string
  bookingId: string
  createdAt: Date
  updatedAt: Date
}

class BookingPayment extends Model<
  InferAttributes<BookingPayment>,
  InferCreationAttributes<BookingPayment>
> {
  declare id: CreationOptional<string>
  declare date: Date
  declare amount: number
  declare note: string
  public bookingId!: ForeignKey<Booking['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

BookingPayment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    bookingId: {
      type: DataTypes.UUID,
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
    },
    note: {
      type: DataTypes.TEXT,
      defaultValue: ''
    }
  },
  {
    tableName: 'BookingPayments',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default BookingPayment
