import type { ITour } from '@/models/tour.model'
import { type ITourImage } from '@/models/tourImage.model'
import joi from 'joi'

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
