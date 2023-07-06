import { Sequelize } from 'sequelize'
import env from '@/config/env'
import winstonLogger from '@/utils/logger.utils'

export const sequelize = new Sequelize(env.MYSQL_DATABASE) // Example for postgres
const connectDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    winstonLogger.info('connect success mysql db')
    return Promise.resolve()
  } catch (error) {
    console.log({
      mysqlError: error
    })
  }
}

export default connectDb
