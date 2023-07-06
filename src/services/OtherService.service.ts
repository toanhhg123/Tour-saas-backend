import { OtherService } from '@/models'
import type { OtherServiceCreationAttributes } from '@/models/otherService.model'
import otherServiceRepositoty from '@/repositories/otherService.repositoty'

class _OtherService {
  public async getAll() {
    return await otherServiceRepositoty.query()
  }

  public async create(
    body: OtherServiceCreationAttributes
  ) {
    return await OtherService.create(body)
  }

  public async update(
    body: OtherServiceCreationAttributes,
    id: string
  ) {
    const [num] = await OtherService.update(body, {
      where: { id }
    })
    return num
  }

  public async remove(id: string) {
    const [num] = await OtherService.update(
      { isDeleted: true },
      { where: { id } }
    )
    return num
  }
}

export default new _OtherService()
