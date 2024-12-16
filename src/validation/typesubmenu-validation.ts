import { z, ZodType } from "zod";

export class TypeSubMenuValidation {
    static readonly ADD: ZodType = z.object({
        name: z.string().min(1, { message: "Required" }).max(255, { message: "Max 255 characters" })
    })

}