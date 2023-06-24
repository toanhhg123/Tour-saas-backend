import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Supplier from './supplier.model'
import type Tour from './tour.model'

class AirBooking extends Model<
  InferAttributes<AirBooking>,
  InferCreationAttributes<AirBooking>
> {
  declare id: CreationOptional<string>
  declare code: string
  declare route: string
  declare depDay: Date
  declare depTime: Date
  declare retDate: Date
  declare retTime: Date
  declare numPax: number
  declare fare: number
  declare tax: number
  declare fee: number
  declare nameDate: Date
  declare payDate: Date
  declare note: string
  public supplierId!: ForeignKey<Supplier['id']>
  public tourId!: ForeignKey<Tour['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

AirBooking.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    supplierId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tourId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    depDay: {
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
    numPax: {
      type: DataTypes.DOUBLE
    },
    code: {
      type: DataTypes.STRING
    },
    route: {
      type: DataTypes.STRING
    },
    depTime: {
      type: DataTypes.DATE
    },
    retDate: {
      type: DataTypes.DATE
    },
    retTime: {
      type: DataTypes.DATE
    },
    fare: {
      type: DataTypes.DOUBLE
    },
    tax: {
      type: DataTypes.DOUBLE
    },
    fee: {
      type: DataTypes.DOUBLE
    },
    nameDate: {
      type: DataTypes.DATE
    },
    payDate: {
      type: DataTypes.DATE
    },
    note: {
      type: DataTypes.TEXT
    }
  },
  { tableName: 'AirBookings', timestamps: true, sequelize: sequelizeMysql }
)

export default AirBooking
