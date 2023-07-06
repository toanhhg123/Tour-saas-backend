import { Tour } from '@/models'
import type {
  IPageAction,
  IPageActionResponse
} from '@/types/IPageAcction'
import { initPageAction } from '@/types/IPageAcction'
import { Op } from 'sequelize'

class TourRepository {
  public async query(
    fill?: IPageAction
  ): Promise<IPageActionResponse<Tour[]>> {
    let { _search, _page, type, userId } =
      fill ?? initPageAction

    const limit = 20
    _page = _page ? Number(_page) : 1
    console.log('page:::::', _page)
    _search = _search ?? ''

    const skip = (_page - 1) * limit

    let objSearch = {}
    let objType = {}
    let objUserId = {}

    if (_search)
      objSearch = { name: { [Op.like]: `%${_search}%` } }
    if (type) objType = { type: type }
    if (userId) objUserId = { tourManId: userId }

    const { rows, count } = await Tour.findAndCountAll({
      limit,
      offset: skip,
      where: {
        ...objSearch,
        ...objType,
        ...objUserId
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
