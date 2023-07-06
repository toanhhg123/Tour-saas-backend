import { AirBookingPayment } from '@/models'

class AirBookingPaymentService {
  public async removeByAriBookingId(airBookingId: string) {
    return await AirBookingPayment.destroy({
      where: { airBookingId }
    })
  }
}

export default new AirBookingPaymentService()
