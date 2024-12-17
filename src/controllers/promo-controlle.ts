import PromoService from "../services/promo-service";
import type { NextFunction, Request, Response } from "express"
import { mockSuccessResponse } from "../utils/mock";
import { StatusCodes } from "http-status-codes";

export default class PromoController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await PromoService.list(req, res)
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
            const results = await PromoService.add(req, res)

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
            await PromoService.remove(req, res)

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