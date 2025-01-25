import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function DashboardPage() {
    return (
        <Container className="w-full min-h-screen" >
            <main className="flex flex-col justify-between w-full gap-4 items-start py-4">
                <div className="flex justify-between w-full gap-4 items-center py-4">
                    <h1 className="text-3xl font-bold">Invoices</h1>
                </div>
                <form action="" className="max-w-sm w-full flex flex-col gap-2"  >
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="name" className="font-semibold">Billing Name </Label>
                        <Input id="name " name="name " type="text" placeholder="Name" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="email" className="font-semibold">Billing Email </Label>
                        <Input id="email " name="email " type="email" placeholder="Name" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="value" className="font-semibold">Value</Label>
                        <Input id="value " name="value " type="text" placeholder="Name" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="description" className="font-semibold">Description</Label>
                        <Textarea id="description" name="description" placeholder="Name" />
                    </div>
                    <Button type="submit" className="font-semibold">Submit</Button>
                </form>
            </main>
        </Container>
    );
}