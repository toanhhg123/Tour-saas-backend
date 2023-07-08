import { Account, OtherServiceBooking } from '@/models'
import type { OSBookingCreationAttributes } from '@/models/otherServiceBooking.model'
import otherServiceBookingPaymentService from './otherServiceBookingPayment.service'

class OtherServiceBookingService {
  public async getByOtherServiceId(otherServiceId: string) {
    return await OtherServiceBooking.findAll({
      where: { otherServiceId },
      include: [
        { model: Account, as: 'client' },
        { model: Account, as: 'sale' }
      ]
    })
  }

  public async create(body: OSBookingCreationAttributes) {
    return await OtherServiceBooking.create(body, {
      include: [
        { model: Account, as: 'client' },
        { model: Account, as: 'sale' }
      ]
    })
  }

  public async remove(id: string) {
    await otherServiceBookingPaymentService.deleteByOtherServiceBookingId(
      id
    )
    return await OtherServiceBooking.destroy({
      where: { id }
    })
  }

  public async update(
    body: OSBookingCreationAttributes,
    id: string
  ) {
    const [num] = await OtherServiceBooking.update(body, {
      where: { id }
    })
    return num
  }
}

export default new OtherServiceBookingService()
