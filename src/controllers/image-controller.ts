import ImageService from "../services/image-service";
import type { NextFunction, Request, Response } from "express"
import { mockSuccessResponse } from "../utils/mock";
import { StatusCodes } from "http-status-codes";

export default class ImageController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await ImageService.list(req, res)
            return mockSuccessResponse(res, {
                status: StatusCodes.OK,
                data: results,
                message: "Success"
            })
        } catch (error) {
            next(error)
        }
    }

    static async add(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await ImageService.add(req, res)
            
            return mockSuccessResponse(res, {
                status: StatusCodes.OK,
                data: results,
                message: "Success upload image"
            })

        } catch (error) {
            next(error)
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            await ImageService.remove(req, res)

            return mockSuccessResponse(res, {
                status: StatusCodes.OK,
                data: null,
                message: "Success remove image"
            })

        } catch (error) {
            next(error)
        }

    }

}