import { images} from "../model/schema"

export type Image = typeof images.$inferSelect
export type InsertImage = typeof images.$inferInsert

export type Query = {
    page: number;
    limit: number
    start_date: string;
    end_date: string
}

export type Metadata = {
    page: number;
    limit: number;
    from: number;
    to: number;
    total_row: number;
}

export type Success<T> = {
    status: number
    data: T;
    meta?: Metadata
    message: string;
}
export type Error = {
    status: number;
    type: string;
    message?: string;
    errors?: unknown;
}

