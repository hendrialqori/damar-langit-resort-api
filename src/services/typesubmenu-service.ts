import { Request, Response } from "express";
import { Validation } from "../validation/validation";
import { TypeSubMenuValidation } from "../validation/typesubmenu-validation"
import { typeSubMenu as typeSubMenuTable } from "../model/schema";
import { db } from "../model/db";
import { InsertTypeSubMenu } from "../@types";
import { MySqlColumn } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";
import { ResponseError } from "../utils/errors";
import { StatusCodes } from "http-status-codes";

export default class TypeSubMenuService {

    static async list(req: Request, _res: Response) {
        const results = await db.select().from(typeSubMenuTable)
        return results
    }

    static async add(req: Request, _res: Response) {
        const body = req.body as InsertTypeSubMenu
        const typeSubMenuRequest = Validation.validate(TypeSubMenuValidation.ADD, body)
        await db.insert(typeSubMenuTable).values(typeSubMenuRequest)
    }

    static async update(req: Request, res: Response) {
        const params = req.params as { id: string }
        const body = req.body as InsertTypeSubMenu


        const typeSubMenu = await TypeSubMenuService.checkTypeSubmenu(typeSubMenuTable.id, params.id)
        if (!typeSubMenu) throw new ResponseError(StatusCodes.NOT_FOUND, "Not found")

        const typeSubMenuRequest = Validation.validate(TypeSubMenuValidation.ADD, body)

        await db.update(typeSubMenuTable).set(typeSubMenuRequest).where(eq(typeSubMenuTable.id, typeSubMenu.id))
    }

    private static async checkTypeSubmenu<T extends {}>(column: MySqlColumn, value: T) {
        const [result] = await db.select().from(typeSubMenuTable).where(eq(column, value))
        return result
    }

}
