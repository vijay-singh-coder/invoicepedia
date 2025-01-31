"use server";

import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createActionInvoice(formData: FormData) {
    const { userId } = await auth();
    if (!userId) return
    console.log("userId", userId);
    const value = Math.floor(parseFloat(formData.get("value") as string) * 100)
    const description = formData.get("description") as string
    const results = await db.insert(Invoices).values({
        userId,
        value,
        description,
        status: "open"
    }).returning({ id: Invoices?.id });
    redirect(`/invoices/${results[0]?.id}`);
}

export async function updateStatusAction(formData: FormData) {
    console.log("clicked on status");
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
