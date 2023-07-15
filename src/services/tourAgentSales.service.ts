import { Account } from '@/models'
import type { TourAgentSalesCreationAttributes } from '@/models/tourAgentSales.model'
import TourAgentSales from '@/models/tourAgentSales.model'

class TourAgentSalesService {
  async create(body: TourAgentSalesCreationAttributes) {
    return await TourAgentSales.create(body)
  }

  async getByTourId(id: string) {
    return await TourAgentSales.findAll({
      where: { tourId: id },
      include: [{ model: Account, as: 'sales' }]
    })
  }

  async getBySaleId(id: string) {
    return await TourAgentSales.findAll({
      where: { saleId: id }
    })
  }

  async remove(id: string) {
    return await TourAgentSales.destroy({ where: { id } })
  }
}

export default new TourAgentSalesService()
