import { AVILABLE_STATUSES } from "@/data/invoice";
import { integer, pgTable, timestamp, text, pgEnum, serial } from "drizzle-orm/pg-core";


export type Status = (typeof AVILABLE_STATUSES)[number]["id"];

const statuses = AVILABLE_STATUSES.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
    "status",
    statuses as [Status, ...Array<Status>],
);


export const Invoices = pgTable("invoices", {
    id: serial("id").primaryKey().notNull(),
    createTs: timestamp("createTs").notNull().defaultNow(),
    value: integer("value").notNull(),
    customerId: integer("customerId").notNull().references(() => Customers.id),
    description: text("description").notNull(),
    userId: text("userId").notNull(),
    status: statusEnum("status").notNull(),
})

export const Customers = pgTable("customers", {
    id: serial("id").primaryKey().notNull(),
    createTs: timestamp("createTs").notNull().defaultNow(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    userId: text("userId").notNull(),
})
