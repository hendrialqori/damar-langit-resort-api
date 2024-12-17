import MapService from "../services/map-service";
import type { NextFunction, Request, Response } from "express"
import { mockSuccessResponse } from "../utils/mock";
import { StatusCodes } from "http-status-codes";

export default class MapController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await MapService.list(req, res)
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
            const results = await MapService.add(req, res)

            return mockSuccessResponse(res, {
                status: StatusCodes.OK,
                data: results,
                message: "Success upload map image"
            })

        } catch (error) {
            next(error)
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            await MapService.remove(req, res)

            return mockSuccessResponse(res, {
                status: StatusCodes.OK,
                data: null,
                message: "Success remove map image"
            })

        } catch (error) {
            next(error)
        }

    }

}