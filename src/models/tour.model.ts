import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  Association,
  CreationOptional,
  ForeignKey,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  Optional
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Account from './account.model'
import type TourImage from './tourImage.model'
import type AirBooking from './airBooking.model'
import type TourService from './tourService.model'
import type Company from './company.model'

export enum TourType {
  OPEN = 'open',
  INCENTIVE = 'incentive',
  OTHER = 'other'
}

export type ITour = InferAttributes<Tour>

export type TourCreationAttributes = Optional<
  Tour,
  'id' | 'createdAt' | 'updatedAt'
>

export const STRING_CONCAT = '<<--->>'

class Tour extends Model<
  InferAttributes<Tour>,
  InferCreationAttributes<Tour>
> {
  declare id: CreationOptional<string>

  declare name: string

  declare desc?: string

  declare transport: string

  declare metatitle: string

  declare route: string

  declare departure: string

  declare tranportId: string

  declare visadate: Date

  declare link: string

  declare type: TourType

  declare detailLink: string

  declare price: number

  declare maxPax: number

  declare tourManId: string

  public companyId!: ForeignKey<Company['id']>

  declare tourGuideId: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare getTourImages: HasManyGetAssociationsMixin<TourImage>
  declare getAirBookings: HasManyGetAssociationsMixin<AirBooking>
  declare toursImages?: NonAttribute<TourImage[]>
  declare tourServices?: NonAttribute<TourService[]>

  declare static associations: {
    tourImages: Association<Tour, TourImage>
    tourMan: Association<Tour, Account>
    tourGuide: Association<Tour, Account>
    airBookings: Association<Tour, AirBooking>
    tourServices: Association<Tour, TourService>
  }
}

Tour.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    route: {
      type: DataTypes.STRING
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null
    },
    departure: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ''
    },
    metatitle: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    transport: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    visadate: {
      type: DataTypes.DATE
    },
    detailLink: {
      type: DataTypes.STRING
    },
    tourManId: {
      type: DataTypes.UUID
    },
    tourGuideId: {
      type: DataTypes.UUID
    },
    link: {
      type: DataTypes.STRING
    },
    maxPax: {
      type: DataTypes.DOUBLE
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
    type: {
      type: DataTypes.ENUM(...Object.values(TourType)),
      defaultValue: TourType.OTHER
    },
    tranportId: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'Tours',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default Tour
