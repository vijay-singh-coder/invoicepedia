ALTER TABLE "invoices" RENAME COLUMN "customer" TO "customerId";--> statement-breakpoint
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_customer_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;