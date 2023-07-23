import { Tour } from '@/models'
import type {
  IPageAction,
  IPageActionResponse
} from '@/types/IPageAcction'
import { initPageAction } from '@/types/IPageAcction'
import type { WhereOptions } from 'sequelize'
import { Op } from 'sequelize'

class TourRepository {
  public async query(
    fill?: IPageAction,
    whereOp?: WhereOptions<Tour>
  ): Promise<IPageActionResponse<Tour[]>> {
    let { _search, _page, type, userId } =
      fill ?? initPageAction

    const limit = 2
    _page = _page ? Number(_page) : 1
    _search = _search ?? ''

    const skip = (_page - 1) * limit

    let objSearch = {}
    let objType = {}
    let objUserId = {}

    if (_search)
      objSearch = { name: { [Op.like]: `%${_search}%` } }

    if (type)
      objType = {
        type: {
          [Op.in]: !Array.isArray(type) ? [type] : [...type]
        }
      }

    console.log(objType)
    if (userId) objUserId = { tourManId: userId }

    const { rows, count } = await Tour.findAndCountAll({
      limit,
      offset: skip,
      where: {
        ...objSearch,
        ...objType,
        ...objUserId,
        ...whereOp
      }
    })

    return {
      _search,
      _page,
      data: rows,
      _totalPage: Math.ceil(count / limit)
    }
  }
}

export default new TourRepository()
