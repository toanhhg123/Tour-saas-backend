import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Tour from '@/models/tour.model'
import type { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

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
  createdAt: Date
  updatedAt: Date
}

class TourService extends Model<InferAttributes<TourService>, InferCreationAttributes<TourService>> {
  declare id: CreationOptional<string>
  declare name: string
  declare price: number
  declare desc: string
  declare type: TypeTour
  public tourId!: ForeignKey<Tour['id']>
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
    }
  },
  { tableName: 'TourServices', timestamps: true, sequelize: sequelizeMysql }
)

export default TourService
