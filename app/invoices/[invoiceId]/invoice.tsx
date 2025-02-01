"use client"
import { updateStatusAction, deleteStatusAction } from "@/app/action"
import Container from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AVILABLE_STATUSES } from "@/data/invoice"
import { Customers, Invoices } from "@/db/schema"
import { cn } from "@/lib/utils"
import { SyntheticEvent, useOptimistic, useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Ellipsis, Trash2 } from "lucide-react"
import SubmitButton from "@/components/SubmitButton"

interface InvoiceProps {
    invoice: typeof Invoices.$inferSelect & {
        customer: typeof Customers.$inferSelect
    }
}

export default function Invoice({ invoice }: InvoiceProps) {

    const [state, setState] = useState("start")
    function deleteHandler(event: SyntheticEvent) {
        if (state === "pending") {
            event.preventDefault()
            return
        }
        setState("pending")
    }

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

                    <div className="flex gap-2 items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Change Status
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

                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <Ellipsis size={16} />
                                        <span className="sr-only">More Options</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        {/* Wrap multiple elements with a React.Fragment */}
                                        <DialogTrigger asChild>
                                            <div className="flex items-center gap-2">
                                                <Trash2 size={16} />
                                                <button type="submit">Delete</button>
                                            </div>
                                        </DialogTrigger>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your invoice
                                        and remove your data from our servers.
                                    </DialogDescription>
                                    <DialogFooter>
                                        <form
                                            onSubmit={deleteHandler}
                                            action={deleteStatusAction}
                                            className="flex gap-2 items-center justify-center"
                                        >
                                            <input type="hidden" name="id" value={invoice.id} />
                                            <SubmitButton text="Delete" variant="destructive" className="w-full" />
                                        </form>
                                    </DialogFooter>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>

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
                            {invoice.customer.name}

                        </span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Billing Email
                        </strong>
                        <span>
                            {invoice.customer.email}
                        </span>
                    </li>
                </ul>

            </main>
        </Container>
    )
}