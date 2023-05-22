import type { IAccount } from '@/models/account.model'
import { AccountStatus } from '@/models/account.model'
import { type IPermission } from '@/models/permission.model'
import type { IRole } from '@/models/role.model'
import type { ITour } from '@/models/tour.model'
import { type ITourImage } from '@/models/tourImage.model'
import { TypeTour, type ITourService } from '@/models/tourService.model'
import joi from 'joi'
import type { IAuthRequest } from '../types/IAuthType'

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
    metatitle: joi.string().required(),
    locationId: joi.string().required(),
    transports: joi.array<string>().required(),
    itineraries: joi.array<string>().required(),
    accommodations: joi.array<string>().required(),
    price: joi.number().required()
  })

  return tourImageSchema.validate(tourImage)
}

export const validateTourService = (tourImage: ITourService) => {
  const tourImageSchema = joi.object<ITourService>({
    name: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string().required(),
    tourId: joi.string().required(),
    type: joi.string().valid(...Object.values(TypeTour))
  })

  return tourImageSchema.validate(tourImage)
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
    roleId: joi.string().required(),
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
