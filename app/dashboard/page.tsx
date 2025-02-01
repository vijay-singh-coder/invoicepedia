import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Customers, Invoices } from "@/db/schema";
import Container from "@/components/container";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";


export default async function DashboardPage() {

    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in")
        return
    }
    const results = await db.select()
        .from(Invoices)
        .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
        .where(eq(Invoices.userId, userId));

    const invoices = results?.map(({ invoices, customers }) => {
        return {
            ...invoices,
            customer: customers
        };
    });

    return (
        <Container className="w-full min-h-screen">
            <main className="flex flex-col justify-between gap-4 items-center py-4">
                <div className="flex justify-between w-full gap-4 items-center py-4">
                    <h1 className="text-3xl font-bold">Invoices</h1>
                    <Button variant={"ghost"} asChild>
                        <Link href="/invoices/new">
                            <CirclePlus size={4} />
                            <p>Create Invoices</p>
                        </Link>
                    </Button>
                </div>

                {/* Table */}
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.id} className="hover:bg-gray-100 cursor-pointer">
                                <TableCell className="py-4 font-medium">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="w-full h-full block"
                                    >
                                        {(new Date(invoice.createTs)).toLocaleDateString("en-GB")}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="w-full h-full block"
                                    >
                                        {invoice.customer.name}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="w-full h-full block"
                                    >
                                        {invoice.customer.email}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="w-full h-full block"
                                    >
                                        <Badge
                                            className={cn(
                                                "rounded-full capitalize",
                                                invoice.status === "open" && "bg-blue-500",
                                                invoice.status === "paid" && "bg-green-600",
                                                invoice.status === "void" && "bg-zinc-700",
                                                invoice.status === "uncollectible" && "bg-red-600",
                                            )}
                                        >
                                            {invoice.status}
                                        </Badge>
                                    </Link>
                                </TableCell>
                                <TableCell className="py-4 text-right">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="w-full h-full block"
                                    >
                                        {invoice.value}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
        </Container>
    );
}
