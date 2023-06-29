import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Account from './account.model'
import type Tour from './tour.model'

export enum StatusBooking {
  reservation = 'reservation',
  deposit = 'deposit',
  paid = 'paid'
}

export interface IBooking {
  id: string
  bookDate: Date
  comfirmDate: Date
  price: number
  status: StatusBooking
  com: number
  paxNum: number
  clientId: string
  saleId: string
  tourId: string
  createdAt: Date
  updatedAt: Date
}

class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  declare id: CreationOptional<string>
  declare bookDate: Date
  declare comfirmDate: Date
  declare price: number
  declare status: StatusBooking
  declare com: number
  declare paxNum: number
  public clientId!: ForeignKey<Account['id']>
  public saleId!: ForeignKey<Account['id']>
  public tourId!: ForeignKey<Tour['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    paxNum: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    clientId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    tourId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    saleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    bookDate: {
      type: DataTypes.DATE
    },
    comfirmDate: {
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
    com: {
      type: DataTypes.DOUBLE
    },
    price: {
      type: DataTypes.DOUBLE
    },
    status: {
      type: DataTypes.ENUM(...Object.values(StatusBooking))
    }
  },
  {
    tableName: 'Bookings',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default Booking
