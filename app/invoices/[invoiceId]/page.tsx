import { db } from "@/db"
import { Invoices } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Invoice from "./invoice"

export default async function InvoicePage({ params }: { params: { invoiceId: string } }) {

    const { userId } = await auth();
    if (!userId) return;
    const resolvedParams = await params; // Await the `params`
    const invoiceId = Number.parseInt(resolvedParams.invoiceId);
    if (Number.isNaN(invoiceId)) {
        throw new Error("Invalid invoice id")
    }
    const [results] = await db.select()
        .from(Invoices)
        .where(
            and(
                eq(Invoices.id, invoiceId),
                eq(Invoices.userId, userId)
            )
        )
        .limit(1);
    if (!results) {
        return notFound()
    }

    return (
        <Invoice invoice={results} />
    )
}