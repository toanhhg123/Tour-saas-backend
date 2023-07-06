import { BookingPayment } from '@/models'

class BookingPaymentService {
  public async remove(id: string) {
    return await BookingPayment.destroy({ where: { id } })
  }

  public async removeByBookingId(bookingId: string) {
    return await BookingPayment.destroy({
      where: { bookingId }
    })
  }
}

export default new BookingPaymentService()
