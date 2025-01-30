"use server";

import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export async function createActionInvoice(formData: FormData) {
    const { userId } = await auth();
    if (!userId) {
        return {
            success: false,
            error: "Authentication required"
        };
    }
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