import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'

export interface IVisaGroup {
  id: string
  name: string
  submitedDate: Date
  receiptCode: string
  resultDate: Date
  entryDate: Date
  entryPort: string
  entryHotel: string
  itenerary: string
  createdAt: Date
  updatedAt: Date
}

class VisaGroup extends Model<
  InferAttributes<VisaGroup>,
  InferCreationAttributes<VisaGroup>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare submitedDate: Date
  declare receiptCode: string
  declare resultDate: Date
  declare entryDate: Date
  declare entryPort: string
  declare entryHotel: string
  declare itenerary: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

VisaGroup.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },

    submitedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    receiptCode: { type: DataTypes.STRING },
    resultDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    entryDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    entryPort: { type: DataTypes.STRING },
    entryHotel: { type: DataTypes.STRING },
    itenerary: { type: DataTypes.STRING },

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
    tableName: 'VisaGroups',
    timestamps: true,
    sequelize: sequelizeMysql
  }
)

export default VisaGroup
