import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Tour from '@/models/tour.model'
import type { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Supplier from './supplier.model'

export enum TypeTour {
  OPTION = 'OPTION',
  DEFAULT = 'DEFAULT'
}

export interface ITourService {
  id: string
  name: string
  price: number
  desc: string
  tourId: string
  type: TypeTour
  destination: string
  quantity: number
  supplierId: string
  details: string
  note: string
  createdAt: Date
  updatedAt: Date
}

class TourService extends Model<InferAttributes<TourService>, InferCreationAttributes<TourService>> {
  declare id: CreationOptional<string>
  declare name: string
  declare price: number
  declare desc: string
  declare type: TypeTour
  declare destination: string
  declare quantity: number
  declare details: string
  declare note: string

  public tourId!: ForeignKey<Tour['id']>
  public supplierId!: ForeignKey<Supplier['id']>
  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

TourService.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tourId: {
      type: DataTypes.UUID
    },
    supplierId: {
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TypeTour)),
      defaultValue: TypeTour.DEFAULT
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
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
    destination: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    details: {
      type: DataTypes.STRING
    },
    note: {
      type: DataTypes.TEXT
    }
  },
  { tableName: 'TourServices', timestamps: true, sequelize: sequelizeMysql }
)

export default TourService
