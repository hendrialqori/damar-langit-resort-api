import {
    mysqlTable, int,
    varchar, text, timestamp
} from 'drizzle-orm/mysql-core';

const IMAGES = "images" as const
const TYPE_SUBMENU = "type_submenu" as const
const MAPS = "maps" as const
const PROMOS = "promos" as const

export const images = mysqlTable(IMAGES, {
    id: int("id").primaryKey().autoincrement(),
    cloudId: varchar("cloud_id", { length: 50 }).notNull(),
    cloudUrl: text("cloud_url").notNull(),
    menu: varchar("menu", { length: 225 }).notNull(),
    submenu: varchar("submenu", { length: 100 }).notNull(),
    typeSubMenuId: int("type_sub_menu_id")
        .notNull().references(() => typeSubMenu.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow()
})

export const typeSubMenu = mysqlTable(TYPE_SUBMENU, {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 30 }).notNull(),
    createdAt: timestamp("created_at").defaultNow()
})

export const maps = mysqlTable(MAPS, {
    id: int("id").primaryKey().autoincrement(),
    cloudId: varchar("cloud_id", { length: 50 }).notNull(),
    cloudUrl: text("cloud_url").notNull(),
    location: varchar("location", { length: 100 }).notNull(),
    xCoordinate: int("x_coordinate"),
    yCoordinate: int("y_coordinate"),
    createdAt: timestamp("created_at").defaultNow()
})

export const promos = mysqlTable(PROMOS, {
    id: int("id").primaryKey().autoincrement(),
    cloudId: varchar("cloud_id", { length: 50 }).notNull(),
    cloudUrl: text("cloud_url").notNull(),
    createdAt: timestamp("created_at").defaultNow()
})
