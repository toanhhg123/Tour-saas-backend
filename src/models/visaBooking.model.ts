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
import type VisaGroup from './VisaGroup.model'

class VisaBooking extends Model<
  InferAttributes<VisaBooking>,
  InferCreationAttributes<VisaBooking>
> {
  public declare id: CreationOptional<string>
  public declare bookDate: Date
  public declare clientId: ForeignKey<Account['id']>
  public declare saleId: ForeignKey<Account['id']>
  public declare tourId?: ForeignKey<Tour['id']>
  public declare visaGroupId: ForeignKey<VisaGroup['id']>
  public declare paid: number
  public declare returnDate: Date
  public declare status: string
  public declare note?: string
  public declare type: string
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

export type IVisaBooking = InferAttributes<VisaBooking>

export type VisaBookingCreationAttributes = Optional<
  VisaBooking,
  'id' | 'createdAt' | 'updatedAt'
>

VisaBooking.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
    tourId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    visaGroupId: {
      type: DataTypes.UUID
    },
    paid: {
      type: DataTypes.DOUBLE
    },
    returnDate: {
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
    type: {
      type: DataTypes.STRING
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
    tableName: 'VisaBookings',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default VisaBooking
