import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Tour from '@/models/tour.model'
import type { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class TourImage extends Model<InferAttributes<TourImage>, InferCreationAttributes<TourImage>> {
  declare id: CreationOptional<string>

  declare url: string
  declare alt: string
  declare idImageGoole: string
  declare otherInfo: string

  public tourId!: ForeignKey<Tour['id']>

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

TourImage.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    url: {
      type: DataTypes.STRING
    },

    tourId: {
      type: DataTypes.UUID
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idImageGoole: {
      type: DataTypes.STRING,
      allowNull: true
    },
    otherInfo: {
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
  { tableName: 'TourImages', timestamps: true, sequelize: sequelizeMysql }
)

export default TourImage
