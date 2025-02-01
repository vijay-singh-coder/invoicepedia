CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "customer" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_customers_id_fk" FOREIGN KEY ("customer") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;