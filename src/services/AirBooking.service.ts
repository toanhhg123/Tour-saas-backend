import Singleton from '@/core/singleton'
import type {
  AirBookingCreationAttributes,
  IAirBooking
} from '@/models/airBooking.model'
import AirBooking from '@/models/airBooking.model'
import type { WhereOptions } from 'sequelize'

export class AirBookingService extends Singleton {
  public async test() {
    return 'test cc'
  }
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
  public async remove(
    opt: WhereOptions<IAirBooking>
  ): Promise<number> {
    const record = await AirBooking.destroy({
      where: opt
    })
    if (!record)
      throw new Error('not found Air Booking delete')
    return record
  }
}

export default AirBookingService.Instance<AirBookingService>()
