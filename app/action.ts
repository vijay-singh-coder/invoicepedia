"use server";

import { db } from "@/db";
import { Customers, Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createActionInvoice(formData: FormData) {
    const { userId } = await auth();
    if (!userId) return
    const value = Math.floor(parseFloat(formData.get("value") as string) * 100)
    const description = formData.get("description") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    const [customers] = await db.insert(Customers).values({
        name,
        email,
        userId
    }).returning({ id: Customers?.id });

    const results = await db.insert(Invoices).values({
        userId,
        value,
        description,
        customerId: customers?.id,
        status: "open"
    }).returning({ id: Invoices?.id });
    redirect(`/invoices/${results[0]?.id}`);
}

export async function updateStatusAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) return
    const id = formData.get("id") as string;
    const status = formData.get("status") as Status;
    await db
        .update(Invoices)
        .set({ status })
        .where(
            and(
                eq(Invoices.id, Number.parseInt(id)),
                eq(Invoices.userId, userId),
            ),
        );
    revalidatePath(`/invoices/${id}`, "page");
}

export async function deleteStatusAction(formData: FormData) {
    const { userId } = await auth();
    if (!userId) return
    const id = formData.get("id") as string;
    await db
        .delete(Invoices)
        .where(
            and(
                eq(Invoices.id, Number.parseInt(id)),
                eq(Invoices.userId, userId),
            ),
        );
    redirect("/dashboard");
}
