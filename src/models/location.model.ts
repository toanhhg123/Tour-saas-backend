import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  Association,
  CreationOptional,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'
import type Tour from './tour.model'

class Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>> {
  declare id: CreationOptional<string>
  declare name: string
  declare desc?: string

  // public readonly roles?: Role[]
  declare getTours: HasManyGetAssociationsMixin<Tour>
  declare tours?: NonAttribute<Tour[]>

  declare static associations: {
    tours: Association<Location, Tour>
  }

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    desc: {
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
  { tableName: 'Locations', timestamps: true, sequelize: sequelizeMysql }
)

export default Location
