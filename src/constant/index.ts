//.env
export const PRODUCTION_MODE = process.env.NODE_ENV === "production"

export const PORT = process.env.PORT
export const SECRET_KEY = process.env.SECRET_KEY
export const DATABASE_URL = process.env.DATABASE_URL
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN

export const MAX_IMAGE_SIZE = 3000000 //3mb
export const ALLOWS_MIME_TYPE = ["image/png", "image/jpg", "image/jpeg"] as const
export const TYPE_ENUM = ["NATIONAL", "ARABIC"] as const