import { OtherService } from '@/models'

class OtherServiceRepository {
  public async query() {
    return OtherService.findAll({
      where: { isDeleted: false }
    })
  }
}

export default new OtherServiceRepository()
