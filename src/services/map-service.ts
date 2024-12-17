import { Request, Response } from "express";
import { maps as mapsTable } from "../model/schema";
import { db } from "../model/db";
import { SQL, and, eq } from "drizzle-orm";
import { InsertMap } from "../@types";
import { Validation } from "../validation/validation";
import { MapValidation } from "../validation/map-validation";
import cloudinary from "../configs/cloudinary";
import { FileUploadError, ResponseError } from "../utils/errors";
import { StatusCodes } from "http-status-codes";
import { MySqlColumn } from "drizzle-orm/mysql-core";

export default class MapService {

    static async list(req: Request, res: Response) {
        const query = req.query as { location: string }

        const condt = [] as SQL<unknown>[]

        if (query.location) condt.push(eq(mapsTable.location, query.location))

        const whereClause = condt.length ? and(...condt) : undefined

        const results = await db.select().from(mapsTable).where(whereClause)
        return results

    }

    static async add(req: Request, res: Response) {
        const body = req.body as InsertMap
        const imageFile = req.file as Express.Multer.File

        const mapRequest = Validation.validate(MapValidation.ADD, body)

        const PUBLIC_ID = `${Date.now().toString()}-${body.location}`
        const { url, public_id } = await cloudinary.uploader.upload(imageFile.path,
            {
                public_id: PUBLIC_ID, transformation:
                    { fetch_format: "webp", quality: "auto" }
            })
            .catch((err) => {
                throw new FileUploadError(StatusCodes.BAD_REQUEST, "Upload image fail")
            })

        const payload: InsertMap = {
            cloudId: public_id,
            cloudUrl: url,
            location: mapRequest.location
        }

        await db.insert(mapsTable).values(payload)
        return url

    }

    static async remove(req: Request, _res: Response) {

        const params = req.params as unknown as { id: string }

        const image = await this.checkMap(mapsTable.id, params.id)
        if (!image) throw new ResponseError(StatusCodes.NOT_FOUND, "Map image not found")

        await db.delete(mapsTable).where(eq(mapsTable.id, image.id))
        await cloudinary.uploader.destroy(image.cloudId.toString())
            .catch((err) => {
                throw new ResponseError(StatusCodes.BAD_REQUEST, "Remove image fail")
            })
    }

    private static async checkMap<T extends {}>(column: MySqlColumn, value: T) {
        const [result] = await db.select().from(mapsTable).where(eq(column, value))
        return result
    }

}