import { OtherServiceBookingPayment } from '@/models'
import type { OSBookingPaymentCreationAttributes } from '@/models/otherServiceBookingPayment.model'

class OtherServiceBookingPaymentService {
  public async getByOtherServiceBookingId(
    otherServiceBookingId: string
  ) {
    return await OtherServiceBookingPayment.findAll({
      where: { otherServiceBookingId }
    })
  }

  public async create(
    body: OSBookingPaymentCreationAttributes
  ) {
    return await OtherServiceBookingPayment.create(body)
  }

  public async deleteByOtherServiceBookingId(
    otherServiceBookingId: string
  ) {
    return await OtherServiceBookingPayment.destroy({
      where: { otherServiceBookingId }
    })
  }

  public async update(
    body: OSBookingPaymentCreationAttributes,
    id: string
  ) {
    const [num] = await OtherServiceBookingPayment.update(
      body,
      { where: { id } }
    )
    return num
  }

  public async remove(id: string) {
    return await OtherServiceBookingPayment.destroy({
      where: { id }
    })
  }
}

export default new OtherServiceBookingPaymentService()
