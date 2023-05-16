import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Location from '@/models/location.model'
import type {
  Association,
  CreationOptional,
  ForeignKey,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type TourImage from './tourImage.model'

export interface ITour {
  name: string
  desc?: string
  transports: string[]
  itineraries: string[]
  accommodations: string[]
  metatitle: string
  locationId: string
  price: number
}

const STRING_CONCAT = '<<--->>'
class Tour extends Model<InferAttributes<Tour>, InferCreationAttributes<Tour>> {
  declare id: CreationOptional<string>
  declare name: string
  declare desc?: string

  declare transports: string

  declare itineraries: string

  declare accommodations: string

  declare metatitle: string

  declare price: number

  public locationId!: ForeignKey<Location['id']>

  setTransports(value: string[]) {
    this.setDataValue('transports', value.join(STRING_CONCAT))
  }
  setItineraries(value: string[]) {
    this.setDataValue('itineraries', value.join(STRING_CONCAT))
  }
  setAccommodations(value: string[]) {
    this.setDataValue('accommodations', value.join(STRING_CONCAT))
  }
  // public accountId!: ForeignKey<Account['id']>

  declare getTourImages: HasManyGetAssociationsMixin<TourImage>
  declare toursImages?: NonAttribute<TourImage[]>

  declare static associations: {
    tourImages: Association<Tour, TourImage>
  }

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
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
    locationId: {
      type: DataTypes.UUID
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    // accountId: {
    //   type: DataTypes.UUID
    // },
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
    transports: {
      type: DataTypes.STRING,
      defaultValue: '',
      get() {
        return this.getDataValue('transports').split(STRING_CONCAT)
      }
    },
    itineraries: {
      type: DataTypes.STRING,
      defaultValue: '',
      get() {
        return this.getDataValue('itineraries').split(STRING_CONCAT)
      }
    },
    accommodations: {
      type: DataTypes.STRING,
      defaultValue: '',
      get() {
        return this.getDataValue('accommodations').split(STRING_CONCAT)
      }
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
    tableName: 'Tours',
    timestamps: true,
    sequelize: sequelizeMysql,
    setterMethods: {
      transportsArr(value: string[]) {
        this.setDataValue('transports', value.join(STRING_CONCAT))
      }
    }
  }
)

export default Tour
