import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default async function HomePage() {
  return (
    <main className="flex items-center justify-center gap-4">
      <Container className="flex flex-col items-center justify-center gap-4" >
        <h1 className="text-5xl font-bold">Invoicepedia</h1>
        <Button asChild>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </Container>
    </main>
  );
}
