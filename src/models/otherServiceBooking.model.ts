import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Optional
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Account from './account.model'
import type OtherService from './otherService.model'

class OtherServiceBooking extends Model<
  InferAttributes<OtherServiceBooking>,
  InferCreationAttributes<OtherServiceBooking>
> {
  public declare id: CreationOptional<string>
  public declare bookDate: Date
  public declare clientId: ForeignKey<Account['id']>
  public declare saleId: ForeignKey<Account['id']>
  public declare otherServiceId: ForeignKey<
    OtherService['id']
  >
  public declare amount: number
  public declare price: number
  public declare departureDate: Date
  public declare arrivalDate: Date
  public declare status: string
  public declare note?: string
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}
export type IOtherServiceBooking =
  InferAttributes<OtherServiceBooking>

export type OSBookingCreationAttributes = Optional<
  OtherServiceBooking,
  'id' | 'createdAt' | 'updatedAt'
>

OtherServiceBooking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookDate: {
      type: DataTypes.DATE
    },
    clientId: {
      type: DataTypes.UUID
    },
    saleId: {
      type: DataTypes.UUID
    },
    otherServiceId: {
      type: DataTypes.UUID
    },
    amount: {
      type: DataTypes.DOUBLE
    },
    price: {
      type: DataTypes.DOUBLE
    },
    departureDate: {
      type: DataTypes.DATE
    },
    arrivalDate: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
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
    tableName: 'OtherServiceBookings',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)
export default OtherServiceBooking
