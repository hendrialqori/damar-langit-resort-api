import { z, ZodType } from "zod";

export class MapValidation {
    static readonly ADD: ZodType = z.object({
        location: z.string().min(1, { message: "Required" }).max(100, { message: "Max 100 characters" }),
    })

    static readonly DELETE: ZodType = z.object({
        cloud_id: z.number().nonnegative()
    })
}