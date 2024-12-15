import {
    mysqlTable, mysqlEnum, int,
    varchar, text, timestamp
} from 'drizzle-orm/mysql-core';
import { TYPE_ENUM } from '../constant';

const IMAGES = "images" as const

export const images = mysqlTable(IMAGES, {
    id: int("id").primaryKey().autoincrement(),
    cloudId: varchar("cloud_id", { length: 50 }).notNull(),
    cloudUrl: text("cloud_url").notNull(),
    menu: varchar("menu", { length: 225 }).notNull(),
    submenu: varchar("submenu", { length: 100 }).notNull(),
    type: mysqlEnum("type", TYPE_ENUM).notNull(),
    createdAt: timestamp("created_at").defaultNow()
})
