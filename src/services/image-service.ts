import { Request, Response } from "express";
import { SQL, and, eq } from "drizzle-orm";
import { InsertImage } from "../@types";
import { db } from "../model/db";
import { images as imagesTable } from "../model/schema";
import type { TYPE_ENUM } from "../constant"
import cloudinary from "../configs/cloudinary";
import { FileUploadError, ResponseError } from "../utils/errors";
import { StatusCodes } from "http-status-codes";
import { Validation } from "../validation/validation";
import { ImageValidation } from "../validation/image-validation";
import { MySqlColumn } from "drizzle-orm/mysql-core";

export default class ImageService {

    static async list(req: Request, _res: Response) {
        const query = req.query as Record<"menu" | "submenu" | "type", string>

        const condt = [] as SQL<unknown>[]

        if (query.menu) condt.push(eq(imagesTable.menu, query.menu))
        if (query.submenu) condt.push(eq(imagesTable.submenu, query.submenu))
        if (query.type) condt.push(eq(imagesTable.type, query.type as typeof TYPE_ENUM[number]))

        const whereClause = condt.length ? and(...condt) : undefined

        const results = await db.select().from(imagesTable).where(whereClause)

        return results

    }

    static async add(req: Request, _res: Response) {
        const body = req.body as InsertImage
        const imageFile = req.file as Express.Multer.File
        console.log(req.file)

        const imageRequest = Validation.validate(ImageValidation.ADD, body)

        const PUBLIC_ID = Date.now().toString()

        const { url, public_id } = await cloudinary.uploader.upload(imageFile.path,
            {
                public_id: PUBLIC_ID, transformation:
                    { fetch_format: "webp", quality: "auto" }
            })
            .catch((err) => {
                throw new FileUploadError(StatusCodes.BAD_REQUEST, "Upload image fail")
            })

        const payload: InsertImage = {
            cloudId: public_id,
            cloudUrl: url,
            menu: imageRequest.menu,
            submenu: imageRequest.submenu,
            type: imageRequest.type
        }

        await db.insert(imagesTable).values(payload)
        return url
    }

    static async remove(req: Request, _res: Response) {

        const params = req.params as unknown as { id: string }

        const image = await this.checkImage(imagesTable.id, params.id)
        if (!image) throw new ResponseError(StatusCodes.NOT_FOUND, "Image not found")

        await db.delete(imagesTable).where(eq(imagesTable.id, image.id))
        await cloudinary.uploader.destroy(image.cloudId.toString())
            .catch((err) => {
                throw new ResponseError(StatusCodes.BAD_REQUEST, "Remove image fail")
            })
    }

    private static async checkImage<T extends {}>(column: MySqlColumn, value: T) {
        const [result] = await db.select().from(imagesTable).where(eq(column, value))
        return result
    }
}