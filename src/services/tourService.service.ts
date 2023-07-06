import { TourService } from '@/models'

class _TourService {
  public async remove(id: string) {
    return await TourService.destroy({ where: { id } })
  }

  public async removeByTourId(tourId: string) {
    return await TourService.destroy({
      where: { tourId: tourId }
    })
  }
}

export default new _TourService()
