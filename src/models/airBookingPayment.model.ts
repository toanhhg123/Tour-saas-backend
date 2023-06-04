import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type AirBooking from './airBooking.model'

class AirBookingPayment extends Model<InferAttributes<AirBookingPayment>, InferCreationAttributes<AirBookingPayment>> {
  declare id: CreationOptional<string>
  declare date: Date
  declare amount: number
  declare note: string

  public airBookingId!: ForeignKey<AirBooking['id']>

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

AirBookingPayment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    airBookingId: {
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
    },
    note: {
      type: DataTypes.TEXT
    }
  },
  { tableName: 'AirBookingPayments', timestamps: true, sequelize: sequelizeMysql }
)

export default AirBookingPayment
