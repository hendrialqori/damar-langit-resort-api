import { z, ZodType } from "zod";
import { TYPE_ENUM } from "../constant";

export class ImageValidation {
    static readonly ADD: ZodType = z.object({
        menu: z.string().min(1, { message: "Required" }).max(255, { message: "Max 255 characters" }),
        submenu: z.string().min(1, { message: "Required" }).max(255, { message: "Max 255 characters" }),
        type: z.enum(TYPE_ENUM)
    })

    static readonly DELETE: ZodType = z.object({ 
        cloud_id: z.number().nonnegative()
     })
}