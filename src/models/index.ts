import Account from '@/models/account.model'
import Entity from '@/models/entity.model'
import Permissions from '@/models/permission.model'
import Role from '@/models/role.model'
import AirBooking from './airBooking.model'
import { default as AirBookingPayment, default as TourPayment } from './airBookingPayment.model'
import Booking from './booking.model'
import BookingPayment from './bookingPayment.model'
import Company from './company.model'
import Supplier from './supplier.model'
import Tour from './tour.model'
import TourService from './tourService.model'

// roles
Permissions.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })
Permissions.belongsTo(Entity, { foreignKey: 'entityId', as: 'entity' })

//account
Account.belongsTo(Role, { as: 'role', foreignKey: 'roleId' })
Account.belongsTo(Company, { foreignKey: 'companyId', as: 'company' })

//role
Role.hasMany(Permissions, { as: 'permissions', foreignKey: 'roleId' })
Role.hasMany(Account, { foreignKey: 'roleId', as: 'accounts' })

Tour.belongsTo(Account, { as: 'tourMan', foreignKey: 'tourManId' })
Tour.belongsTo(Account, { as: 'tourGuide', foreignKey: 'tourGuideId' })
Tour.hasMany(TourService, { as: 'tourServices', foreignKey: 'tourId' })

// tourservice
TourService.belongsTo(Supplier, {
  as: 'supplier',
  foreignKey: 'supplierId'
})
TourService.belongsTo(Tour, { as: 'tour', foreignKey: 'tourId' })

//tourPayment
TourPayment.belongsTo(TourService, { as: 'tourService', foreignKey: 'serviceId' })

Booking.belongsTo(Tour, { as: 'tour', foreignKey: 'tourId' })
Booking.belongsTo(Account, { as: 'sale', foreignKey: 'saleId' })
Booking.belongsTo(Account, { as: 'client', foreignKey: 'clientId' })

BookingPayment.belongsTo(Booking, { as: 'booking', foreignKey: 'bookingId' })

AirBooking.belongsTo(Tour, { as: 'tour', foreignKey: 'tourId' })
AirBooking.belongsTo(Supplier, { as: 'supplier', foreignKey: 'supplierId' })
Tour.hasMany(AirBooking, { as: 'airBookings', foreignKey: 'tourId' })

AirBookingPayment.belongsTo(AirBooking, { as: 'airBooking', foreignKey: 'airBookingId' })

// //init Entity
// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('Tables synchronized successfully')
//   })
//   .then(async () => {
//     try {
//       const res = await Promise.all([
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af81' },
//           defaults: {
//             name: 'Agent.Sales',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7au8' },
//           defaults: {
//             name: 'Sys.Admin',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af98' },
//           defaults: {
//             name: 'Agent.Admin',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af82' },
//           defaults: {
//             name: 'Client',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af83' },
//           defaults: {
//             name: 'Oper.Admin',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af84' },
//           defaults: {
//             name: 'Oper.Acct',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af85' },
//           defaults: {
//             name: 'Oper.Guide',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af86' },
//           defaults: {
//             name: 'Oper.Mamnager',
//             desc: ''
//           }
//         }),

//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af87' },
//           defaults: {
//             name: 'Oper.Sales',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af88' },
//           defaults: {
//             name: 'Oper.TourMan',
//             desc: ''
//           }
//         }),
//         await Role.findOrCreate({
//           where: { id: '1e79eb56-ce05-425a-9c45-31d063f7af89' },
//           defaults: {
//             name: 'Oper.Visa',
//             desc: ''
//           }
//         })
//       ])

//       console.log({ res })
//     } catch (error) {
//       console.log({ error })
//     }
//   })
//   .catch((error) => {
//     console.error('Error synchronizing tables:', error)
//   })
export { Account, Role, Permissions, Entity, Company, Supplier, TourService }
