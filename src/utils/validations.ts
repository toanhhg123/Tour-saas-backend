import type { IAccount } from '@/models/account.model'
import { AccountStatus } from '@/models/account.model'
import { type IPermission } from '@/models/permission.model'
import type { IRole } from '@/models/role.model'
import type { ITour } from '@/models/tour.model'
import { type ITourImage } from '@/models/tourImage.model'
import { type ITourService } from '@/models/tourService.model'
import joi from 'joi'
import type { IAuthRequest } from '../types/IAuthType'
import { TourType } from '@/models/tour.model'
import { TypeTour } from '@/models/tourService.model'
import type { ISupplier } from '@/models/supplier.model'
import { IBooking, StatusBooking } from '@/models/booking.model'
export const validateTourImage = (tourImage: ITourImage) => {
  const tourImageSchema = joi.object<ITourImage>({
    tourId: joi.string().required()
  })

  return tourImageSchema.validate(tourImage)
}

export const validateTour = (tourImage: ITour) => {
  const tourImageSchema = joi.object<ITour>({
    name: joi.string().required(),
    desc: joi.string(),
    metatitle: joi.string(),
    route: joi.array<string>().required(),
    transport: joi.string().required(),
    departure: joi.string().required(),
    tranportId: joi.string().required(),
    visadate: joi.date().required(),
    link: joi.string().required(),
    detailLink: joi.string().required(),
    tourManId: joi.string().required(),
    tourGuideId: joi.string().required(),
    type: joi.string().valid(...Object.values(TourType)),
    price: joi.number().required(),
    maxPax: joi.number().required()
  })

  return tourImageSchema.validate(tourImage)
}

export const validateTourService = (tourImage: ITourService) => {
  const tourImageSchema = joi.object<ITourService>({
    id: joi.string().allow(''),
    name: joi.string().required(),
    supplierId: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string().required(),
    tourId: joi.string().required(),
    type: joi.string().valid(...Object.values(TypeTour)),
    destination: joi.string().required(),
    quantity: joi.number().required(),
    details: joi.string().required(),
    note: joi.string().required()
  })

  return tourImageSchema.validate(tourImage)
}

export const validateBooking = (data: IBooking) => {
  const dataSchema = joi.object<IBooking>({
    id: joi.string().allow(''),
    bookDate: joi.date().required(),
    comfirmDate: joi.date().required(),
    price: joi.number().required(),
    status: joi.string().valid(...Object.values(StatusBooking)),
    com: joi.number().required(),
    clientId: joi.string().required(),
    saleId: joi.string().required(),
    tourId: joi.string().required()
  })

  return dataSchema.validate(data)
}
export const validateAccount = (data: IAccount) => {
  const dataSchema = joi.object<IAccount>({
    fullName: joi.string().required(),
    password: joi.string().min(4).required(),
    phoneNumber: joi
      .string()
      .regex(/^[0-9]{10}$/)
      .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
      .required(),
    email: joi.string().email().required(),
    address: joi.string().required(),
    status: joi.string().valid(...Object.values(AccountStatus))
  })

  return dataSchema.validate(data)
}

export const validateRole = (data: IRole) => {
  const schema = joi.object<IRole>({
    name: joi.string().required(),
    desc: joi.string().allow()
  })
  return schema.validate(data)
}

export const validatePermission = (data: IPermission) => {
  const schema = joi.object<IPermission>({
    perms: joi.array().min(1).items(joi.string().valid('ALL', 'EDIT', 'READ', 'DELETE', 'CREATE')).required(),
    roleId: joi.string().required(),
    entityId: joi.number().required()
  })

  return schema.validate(data)
}

export const validateAuthRequest = (data: IAuthRequest) => {
  const schema = joi.object<IAuthRequest>({
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
  })

  return schema.validate(data)
}

export const validateSupplier = (data: ISupplier) => {
  const schema = joi.object<ISupplier>({
    email: joi.string().email().required(),
    phone: joi
      .string()
      .regex(/^[0-9]{10}$/)
      .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
      .required(),
    name: joi.string().required(),
    address: joi.string().required()
  })

  return schema.validate(data)
}
