import { sequelize } from '@/config/db/mysql.db'
import Account from '@/models/account.model'
import Role from '@/models/role.model'
import AccountRole from '@/models/accountRole.model'
import Location from './location.model'

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Tables synchronized successfully')
  })
  .catch((error) => {
    console.error('Error synchronizing tables:', error)
  })

export { Account, Role, AccountRole, Location }
