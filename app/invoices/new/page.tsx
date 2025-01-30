"use client"

import { createActionInvoice } from "@/app/action";
import Container from "@/components/container";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SyntheticEvent, useState } from "react";
import Form from "next/form";

export default function DashboardPage() {
    const [state, setState] = useState("start")
    function createHandler(event: SyntheticEvent) {
        if (state === "pending") {
            event.preventDefault()
            return
        }
        setState("pending")
    }

    return (
        <Container className="w-full" >
            <main className="flex flex-col w-full gap-4 items-start">
                <div className="flex justify-between w-full gap-4 items-center py-4">
                    <h1 className="text-3xl font-bold">Create Invoices</h1>
                </div>
                <Form action={createActionInvoice} onSubmit={createHandler} className="max-w-sm w-full flex flex-col gap-2"  >
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="name" className="font-semibold">Billing Name </Label>
                        <Input id="name" name="name" type="text" placeholder="Billing Name" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="email" className="font-semibold">Billing Email </Label>
                        <Input id="email" name="email" type="email" placeholder="Email" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="value" className="font-semibold">Value</Label>
                        <Input id="value" name="value" type="text" placeholder="Value" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="description" className="font-semibold">Description</Label>
                        <Textarea id="description" name="description" placeholder="Description" />
                    </div>
                    <SubmitButton />
                </Form>
            </main>
        </Container>
    );
}