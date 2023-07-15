import { VisaBooking } from '@/models'
import type { VisaBookingCreationAttributes } from '@/models/visaBooking.model'

class VisaBookingService {
  public async getByVisaGrId(visaGroupId: string) {
    return await VisaBooking.findAll({
      where: { visaGroupId }
    })
  }

  public async create(body: VisaBookingCreationAttributes) {
    return await VisaBooking.create(body)
  }

  public async update(
    body: VisaBookingCreationAttributes,
    id: string
  ) {
    const [num] = await VisaBooking.update(body, {
      where: { id }
    })
    return num
  }

  public async remove(id: string) {
    return await VisaBooking.destroy({ where: { id } })
  }
}

export default new VisaBookingService()
