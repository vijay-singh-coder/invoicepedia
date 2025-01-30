import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Invoices } from "@/db/schema";
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

export default async function DashboardPage() {
    const results = await db.select().from(Invoices);
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
                        {results.map((invoice) => (
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
                                        {invoice.description}
                                    </Link>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="w-full h-full block"
                                    >
                                        vj23act@email.com
                                    </Link>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="w-full h-full block"
                                    >
                                        <Badge className="rounded-full">{invoice.status}</Badge>
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
