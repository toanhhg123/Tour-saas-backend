import { Tour } from '@/models'
import type { IPageAction } from '@/types/IPageAcction'
import tourRepository from '@/repositories/tour.repository'
import type { TourCreationAttributes } from '@/models/tour.model'
import _tourService from './tourService.service'
import AirBookingService from './AirBooking.service'
import bookingService from './booking.service'
import { Op } from 'sequelize'

class TourService {
  public async getAll(pageAction: IPageAction) {
    const tours = tourRepository.query(pageAction)
    return tours
  }

  public async getByListId(ids: string[]) {
    return tourRepository.query(undefined, {
      id: {
        [Op.in]: ids
      }
    })
  }

  public async getByListTourManId(
    ids: string[],
    pageAction?: IPageAction
  ) {
    return tourRepository.query(pageAction, {
      tourManId: {
        [Op.in]: ids
      }
    })
  }

  public async create(tour: TourCreationAttributes) {
    const record = await Tour.create(tour)
    return record
  }

  public async update(
    tour: TourCreationAttributes,
    id: string
  ) {
    const [record] = await Tour.update(tour, {
      where: { id }
    })
    return record
  }

  public async remove(id: string) {
    await Promise.all([
      _tourService.removeByTourId(id),
      AirBookingService.removeByTourId(id),
      bookingService.removeByTourId(id)
    ])
    const num = await Tour.destroy({ where: { id } })
    return num
  }
}

export default new TourService()
