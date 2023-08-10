import { sequelize as sequelizeMysql } from '@/config/db/mysql.db'
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize'
import { DataTypes, Model } from 'sequelize'

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
  declare operVisaId: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

export type IVisaGroup = InferAttributes<VisaGroup>

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
    operVisaId: {
      type: DataTypes.UUID,
      allowNull: true
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
