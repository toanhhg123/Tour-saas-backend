import {
  Account,
  Booking,
  BookingPayment,
  Tour
} from '@/models'
import bookingPaymentService from './bookingPayment.service'
import { ResponseError } from '@/models/CustomError.model'

class BookingService {
  private async checkRoleTourMan(
    tourManId: string,
    tourId: string
  ) {
    const tour = await Tour.findOne({
      where: { tourManId: tourManId, id: tourId }
    })

    if (!tour) throw new ResponseError('forbidden', 403)
    return true
  }

  public async remove(id: string) {
    await BookingPayment.destroy({
      where: { bookingId: id }
    })

    return await Booking.destroy({
      where: { id }
    })
  }

  public async getBookingsByTourManId(
    tourManId: string,
    tourId: string
  ) {
    await this.checkRoleTourMan(tourManId, tourId)

    return Booking.findAll({
      where: { tourId }
    })
  }

  async getSalesBookingByTourMan(params: {
    tourId: string
    saleId: string
    userId: string
  }) {
    const { tourId, saleId, userId } = params

    return Booking.findAll({
      where: {
        tourId,
        saleId
      },
      include: [
        { model: Account, as: 'client' },
        { model: Account, as: 'sale' },
        { model: BookingPayment, as: 'bookingPayments' }
      ]
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
