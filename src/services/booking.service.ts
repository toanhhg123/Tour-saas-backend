import { Booking, BookingPayment } from '@/models'
import bookingPaymentService from './bookingPayment.service'

class BookingService {
  public async remove(id: string) {
    await BookingPayment.destroy({
      where: { bookingId: id }
    })

    return await Booking.destroy({
      where: { id }
    })
  }

  public async removeByTourId(tourId: string) {
    const booking = await Booking.findOne({
      where: { tourId }
    })

    if (booking) {
      const { id } = booking
      await bookingPaymentService.removeByBookingId(id)
      return await Booking.destroy({ where: { tourId } })
    }
    return 0
  }
}

export default new BookingService()
