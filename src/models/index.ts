import { sequelize } from '@/config/db/mysql.db'
import Account from '@/models/account.model'
import Role from '@/models/role.model'
import AccountRole from '@/models/accountRole.model'
import Location from './location.model'
import Tour from './tour.model'
import TourImage from './tourImage.model'

// Tour.belongsTo(Account, { foreignKey: 'accountId' })
Tour.belongsTo(Location, { foreignKey: 'locationId', as: 'location' })
TourImage.belongsTo(Tour, { foreignKey: 'tourId' })

Location.hasMany(Tour, {
  sourceKey: 'id',
  foreignKey: 'locationId',
  as: 'tours' // this determines the name in `associations`!
})

Tour.hasMany(TourImage, {
  sourceKey: 'id',
  foreignKey: 'tourId',
  as: 'tourImages' // this determines the name in `associations`!
})

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log('Tables synchronized successfully')
//   })
//   .catch((error) => {
//     console.error('Error synchronizing tables:', error)
//   })
export { Account, Role, AccountRole, Location, Tour, TourImage }
