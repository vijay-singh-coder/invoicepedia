"use client"
import { updateStatusAction } from "@/app/action"
import Container from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AVILABLE_STATUSES } from "@/data/invoice"
import { Invoices } from "@/db/schema"
import { cn } from "@/lib/utils"
import { useOptimistic } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

interface InvoiceProps {
    invoice: typeof Invoices.$inferSelect
}

export default function Invoice({ invoice }: InvoiceProps) {

    const [currentStatus, setCurrentStatus] = useOptimistic(
        invoice.status,
        (state, newStatus) => {
            return String(newStatus)
        })

    async function handleOnUpdate(formData: FormData) {
        const orignalStatus = currentStatus;
        setCurrentStatus(formData.get("status"))
        try {
            await updateStatusAction(formData)
        } catch (error) {
            console.log(error)
            setCurrentStatus(orignalStatus)
        }
    }
    return (
        <Container className="w-full min-h-screen" >
            <main className="flex flex-col justify-between w-full gap-4 items-start py-4">
                <div className=" flex justify-between w-full gap-4 items-center py-4">
                    <div className="flex justify-center  gap-4 items-center py-4">

                        <h1 className="text-3xl font-bold">Invoice {invoice.id}</h1>
                        <Badge
                            className={cn(
                                "rounded-full capitalize",
                                currentStatus === "open" && "bg-blue-500",
                                currentStatus === "paid" && "bg-green-600",
                                currentStatus === "void" && "bg-zinc-700",
                                currentStatus === "uncollectible" && "bg-red-600",
                            )}
                        >
                            {currentStatus}
                        </Badge>
                    </div>
                    <p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Status
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {AVILABLE_STATUSES.length > 0 && AVILABLE_STATUSES.map((item) => (
                                    <DropdownMenuItem key={item.id}>
                                        <form action={handleOnUpdate}>
                                            <input type="hidden" name="id" value={invoice.id} />
                                            <input type="hidden" name="status" value={item.id} />
                                            <button type="submit">{item.label}</button>
                                        </form>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </p>
                </div>
                <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>

                <p className="text-lg mb-8">{invoice.description}</p>

                <h2 className="font-bold text-lg mb-4">Billing Details</h2>

                <ul className="grid gap-2">
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice ID
                        </strong>
                        <span>{invoice.id}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice Date
                        </strong>
                        <span>{new Date(invoice.createTs).toDateString()}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Billing Name
                        </strong>
                        <span>
                            {/* {results.customer.name} */}
                            vijay singh

                        </span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Billing Email
                        </strong>
                        <span>
                            {/* {results.customer.email} */}
                            vijaysingh@email.com
                        </span>
                    </li>
                </ul>

            </main>
        </Container>
    )
}