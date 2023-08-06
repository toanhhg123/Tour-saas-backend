import Singleton from '@/core/singleton'
import type {
  AirBookingCreationAttributes,
  IAirBooking
} from '@/models/airBooking.model'
import AirBooking from '@/models/airBooking.model'
import AirBookingPayment from '@/models/airBookingPayment.model'
import type { WhereOptions } from 'sequelize'
import airBookingPaymentService from './airBookingPayment.service'

export class AirBookingService extends Singleton {
  //------------create-----------------//
  public async create(
    data: AirBookingCreationAttributes
  ): Promise<AirBooking> {
    const record = await AirBooking.create(data)
    return record
  }

  //--------query-----------//
  public async queryAirBooking(
    opt: WhereOptions<IAirBooking>
  ): Promise<AirBooking[]> {
    const record = await AirBooking.findAll({ where: opt })
    return record
  }

  //--------update-----------//
  public async update(
    data: AirBookingCreationAttributes,
    opt: WhereOptions<IAirBooking>
  ): Promise<number> {
    const [record] = await AirBooking.update(data, {
      where: opt
    })
    if (!record)
      throw new Error('not found Air Booking update')
    return record
  }

  //--------remove---------------//
  public async remove(id: string): Promise<number> {
    await AirBookingPayment.destroy({
      where: { airBookingId: id }
    })

    const record = await AirBooking.destroy({
      where: { id }
    })
    return record
  }

  // -------remove by tourId ------------//
  public async removeByTourId(tourId: string) {
    const airBooking = await AirBooking.findOne({
      where: { tourId }
    })
    if (airBooking) {
      const { id } = airBooking
      await airBookingPaymentService.removeByAriBookingId(
        id
      )
      return await AirBooking.destroy({ where: { tourId } })
    }
    return 0
  }
}

export default AirBookingService.Instance<AirBookingService>()
