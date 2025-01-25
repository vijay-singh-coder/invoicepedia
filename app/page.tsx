"use client"

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import Link from "next/link";


export default async function HomePage() {
  const { rows: [database] } = await db.execute(sql`SELECT current_database() AS database`);

  return (
    <Container>
      <main className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-5xl font-bold">Invoicepedia</h1>
        <Button>
          <Link href="/dashboard">Sign In</Link>
        </Button>
        <p className="text-center">
          Connected to <code>{database}</code>
        </p>
      </main>
    </Container>
  );
}
