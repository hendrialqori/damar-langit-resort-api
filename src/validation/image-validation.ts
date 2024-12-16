import { z, ZodType } from "zod";

export class ImageValidation {
    static readonly ADD: ZodType = z.object({
        menu: z.string().min(1, { message: "Required" }).max(255, { message: "Max 255 characters" }),
        submenu: z.string().min(1, { message: "Required" }).max(255, { message: "Max 255 characters" }),
        typeSubMenuId: z.string().min(1, { message: "Required" })
    })

    static readonly DELETE: ZodType = z.object({
        cloud_id: z.number().nonnegative()
    })
}