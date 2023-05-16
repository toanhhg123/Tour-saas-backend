import { Tour, TourImage } from '@/models'
import { ResponseError } from '@/models/CustomError.model'
import googleDriveService from '@/services/googleDrive.service'
import type IResponseObject from '@/types/ResponseObject'
import type { NextFunction, Request, Response } from 'express'

export async function create(
  req: Request<unknown, unknown, TourImage>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    if (req.bodyValid?.error) throw new ResponseError('Invalid information submitted', 400, req.bodyValid.error)
    if (!req.file) throw new ResponseError('not found file', 404)
    if (!(await Tour.findByPk(req.body.tourId))) throw new ResponseError('tour not found', 404)

    const file = await googleDriveService.createFile('testfile', req.file)
    await googleDriveService.publicFile(file.data.id || '')
    const { data } = await googleDriveService.getFile(file.data.id || '')

    const tourImage = await TourImage.create({
      alt: req.file.originalname,
      tourId: req.body.tourId,
      webContentLink: data.webContentLink || '',
      thumbnailLink: data.thumbnailLink || '',
      webViewLink: data.webViewLink || '',
      idImageGoole: file.data.id || ''
    })

    const response: IResponseObject<TourImage> = {
      message: 'query success',
      element: tourImage,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}

// export async function findOne(
//   req: Request<{ id: string }, unknown, Location>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void> {
//   try {
//     const location = await Location.findByPk(req.params.id)

//     if (!location) throw new ResponseError('not found', 404)

//     const response: IResponseObject<Location> = {
//       message: 'query success',
//       element: location,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }

// export async function update(
//   req: Request<{ id: string }, unknown, Location>,
//   res: Response,
//   next: NextFunction
// ): Promise<Response<IResponseObject<unknown>> | void | void> {
//   try {
//     const [location] = await Location.update(req.body, { where: { id: req.params.id } })

//     if (!location) throw new ResponseError('not found location', 404)

//     const response: IResponseObject<number> = {
//       message: 'query success',
//       element: location,
//       status: 'ok'
//     }

//     return res.json(response)
//   } catch (error) {
//     next(error)
//   }
// }

export async function remove(
  req: Request<{ id: string; idImageGoogle: string }, unknown, Location>,
  res: Response,
  next: NextFunction
): Promise<Response<IResponseObject<unknown>> | void> {
  try {
    const rowDeleted = await TourImage.destroy({ where: { id: req.params.id } })
    if (!rowDeleted) throw new ResponseError('delete faild', 404)

    await googleDriveService.deleteFile(req.params.idImageGoogle)

    const response: IResponseObject<number> = {
      message: 'query success',
      element: rowDeleted,
      status: 'ok'
    }

    return res.json(response)
  } catch (error) {
    next(error)
  }
}
