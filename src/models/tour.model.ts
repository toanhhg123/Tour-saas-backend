import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type Location from '@/models/location.model'
import type { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Tour extends Model<InferAttributes<Tour>, InferCreationAttributes<Tour>> {
  declare id: CreationOptional<string>
  declare name: string
  declare desc?: string

  declare transports: string

  declare itineraries: string

  declare accommodations: string

  declare metatitle: string

  public locationId!: ForeignKey<Location['id']>

  // public accountId!: ForeignKey<Account['id']>

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
    // accountId: {
    //   type: DataTypes.UUID
    // },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metatitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transports: {
      type: DataTypes.STRING
    },
    itineraries: {
      type: DataTypes.STRING
    },
    accommodations: {
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
  { tableName: 'Tours', timestamps: true, sequelize: sequelizeMysql }
)

export default Tour
