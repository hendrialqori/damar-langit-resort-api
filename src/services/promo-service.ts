import { Request, Response } from "express";
import { promos as promosTable } from "../model/schema";
import { db } from "../model/db";
import { eq } from "drizzle-orm";
import { InsertPromo } from "../@types";
import cloudinary from "../configs/cloudinary";
import { FileUploadError, ResponseError } from "../utils/errors";
import { StatusCodes } from "http-status-codes";
import { MySqlColumn } from "drizzle-orm/mysql-core";

export default class PromosService {

    static async list(req: Request, res: Response) {
        const results = await db.select().from(promosTable)
        return results

    }

    static async add(req: Request, res: Response) {
        const imageFile = req.file as Express.Multer.File

        const PUBLIC_ID = `${ Date.now().toString()}-PROMO`
        const { url, public_id } = await cloudinary.uploader.upload(imageFile.path,
            {
                public_id: PUBLIC_ID, transformation:
                    { fetch_format: "webp", quality: "auto" }
            })
            .catch((err) => {
                throw new FileUploadError(StatusCodes.BAD_REQUEST, "Upload promo image fail")
            })

        const payload: InsertPromo = {
            cloudId: public_id,
            cloudUrl: url
        }

        await db.insert(promosTable).values(payload)
        return url

    }

    static async remove(req: Request, _res: Response) {

        const params = req.params as unknown as { id: string }

        const image = await this.checkMap(promosTable.id, params.id)
        if (!image) throw new ResponseError(StatusCodes.NOT_FOUND, "Promo image not found")

        await db.delete(promosTable).where(eq(promosTable.id, image.id))
        await cloudinary.uploader.destroy(image.cloudId.toString())
            .catch((err) => {
                throw new ResponseError(StatusCodes.BAD_REQUEST, "Remove image fail")
            })
    }

    private static async checkMap<T extends {}>(column: MySqlColumn, value: T) {
        const [result] = await db.select().from(promosTable).where(eq(column, value))
        return result
    }

}