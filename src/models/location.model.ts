import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>> {
  declare id: CreationOptional<string>
  declare name: string
  declare desc?: string

  // public readonly roles?: Role[]

  // public static associations: {
  //   users: BelongsToMany<Location, Role>
  // }

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
