import TypeSubMenuService from "../services/typesubmenu-service";
import type { NextFunction, Request, Response } from "express"
import { mockSuccessResponse } from "../utils/mock";
import { StatusCodes } from "http-status-codes";

export default class TypeSubMenuController {
    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await TypeSubMenuService.list(req, res)
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
            await TypeSubMenuService.add(req, res)

            return mockSuccessResponse(res, {
                status: StatusCodes.OK,
                data: null,
                message: "Success add type submenu"
            })

        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            await TypeSubMenuService.update(req, res)

            return mockSuccessResponse(res, {
                status: StatusCodes.OK,
                data: null,
                message: "Success update type submenu"
            })

        } catch (error) {
            next(error)
        }
    }

}