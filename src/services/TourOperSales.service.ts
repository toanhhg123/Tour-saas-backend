import TourOperSales, {
  type TourOperSalesCreationAttributes
} from '@/models/TourOperSales.model'

class TourOperSalesService {
  async create(body: TourOperSalesCreationAttributes) {
    return await TourOperSales.create(body)
  }

  async findByid(id: string) {
    return await TourOperSales.findByPk(id)
  }

  async getByOperSaleId(operSaleId: string) {
    return await TourOperSales.findAll({
      where: { operSaleId }
    })
  }

  async getByTourId(tourId: string) {
    return await TourOperSales.findAll({
      where: { tourId }
    })
  }

  async deleteById(id: string) {
    return await TourOperSales.destroy({
      where: { id }
    })
  }
}

export default new TourOperSalesService()
