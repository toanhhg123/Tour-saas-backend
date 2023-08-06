import { Supplier } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import type { SupplierCreationAttributes } from '@/models/supplier.model'

export class SupplierService {
  public async create(
    supplier: SupplierCreationAttributes
  ) {
    return Supplier.create(supplier)
  }

  public async getSuplierByOperatorId(opreId: string) {
    return Supplier.findAll({
      where: { operatorId: opreId }
    })
  }

  public async update(params: {
    body: SupplierCreationAttributes
    id: string
    userUpdateId: string
  }) {
    const { body, id, userUpdateId } = params

    const sup = await this.isOperator(id, userUpdateId)

    body.operatorId = userUpdateId

    return sup.update(body, { where: { id } })
  }

  // helper

  private async isOperator(id: string, operId: string) {
    const supplier = await Supplier.findByPk(id)

    if (supplier?.operatorId !== operId)
      throw new ResponseError('forbidden', 403)

    return supplier
  }
}

export default new SupplierService()
