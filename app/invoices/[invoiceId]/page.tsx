
import Error from "@/app/error"
import Container from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { db } from "@/db"
import { Invoices } from "@/db/schema"
import { cn } from "@/lib/utils"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

export default async function InvoivePage({ params }: {
    params: {
        invoiceId: string
    }
}) {
    const invoiceId = await parseInt(params.invoiceId)
    if (isNaN(invoiceId)) {
        return <Error error={{ message: "Invalid invoice id", statusCode: 500 }} />;
    }
    const [results] = await db.select().from(Invoices).where(eq(Invoices.id, invoiceId)).limit(1);
    const currentStatus = results?.status
    if (!results) {
        return notFound()
    }

    return (
        <Container className="w-full min-h-screen" >
            <main className="flex flex-col justify-between w-full gap-4 items-start py-4">
                <div className=" flex w-full gap-4 items-center py-4">
                    <h1 className="text-3xl font-bold">Invoice {invoiceId}</h1>
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
                <p className="text-3xl mb-3">${(results.value / 100).toFixed(2)}</p>

                <p className="text-lg mb-8">{results.description}</p>

                <h2 className="font-bold text-lg mb-4">Billing Details</h2>

                <ul className="grid gap-2">
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice ID
                        </strong>
                        <span>{results.id}</span>
                    </li>
                    <li className="flex gap-4">
                        <strong className="block w-28 flex-shrink-0 font-medium text-sm">
                            Invoice Date
                        </strong>
                        <span>{new Date(results.createTs).toLocaleDateString()}</span>
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