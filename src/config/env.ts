import * as dotenv from 'dotenv'
dotenv.config()

const env = {
  PORT: process.env.PORT,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE
}

export default env
