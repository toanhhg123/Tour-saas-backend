import { sequelize } from '@/config/db/mysql.db'
import Account from '@/models/account.model'
import Role from '@/models/role.model'
import AccountRole from '@/models/accountRole.model'
import Location from './location.model'
import Tour from './tour.model'
import TourImage from './tourImage.model'

// Tour.belongsTo(Account, { foreignKey: 'accountId' })
Tour.belongsTo(Location, { foreignKey: 'locationId' })
TourImage.belongsTo(Tour, { foreignKey: 'tourId' })
// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('Tables synchronized successfully')
//   })
//   .catch((error) => {
//     console.error('Error synchronizing tables:', error)
//   })
export { Account, Role, AccountRole, Location, Tour }
