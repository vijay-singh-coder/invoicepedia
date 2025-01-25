import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";


export default function DashboardPage() {
    return (
        <Container className="w-full min-h-screen" >
            <main className="flex  flex-col justify-between  gap-4 items-center py-4">
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
                        <TableRow >
                            <TableCell className="py-4 font-medium" >INV001</TableCell>
                            <TableCell className="py-4">Vijay Singh</TableCell>
                            <TableCell className="py-4">vijay@example.com</TableCell>
                            <TableCell className="py-4">
                                <Badge className="rounded-full">
                                    Open
                                </Badge>
                            </TableCell>
                            <TableCell className="py-4 text-right">$19.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </main>
        </Container>
    );
}