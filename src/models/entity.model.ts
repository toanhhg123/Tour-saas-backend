import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import { entites } from '@/types/consts'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'

export interface IEntity {
  name: string
}
class Entity extends Model<
  InferAttributes<Entity>,
  InferCreationAttributes<Entity>
> {
  declare id: number
  declare name: string

  public createdAt!: CreationOptional<Date>
  public updatedAt!: CreationOptional<Date>
}

Entity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
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
  {
    tableName: entites.Entity,
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default Entity
