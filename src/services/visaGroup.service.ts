import { VisaGroup } from '@/models'

class VisaGroupService {
  async getByOperVisaId(operVisaId: string) {
    return VisaGroup.findAll({
      where: { operVisaId }
    })
  }
}

export default new VisaGroupService()
