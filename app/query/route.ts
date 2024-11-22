import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
  const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return {
    rows: data.rows,
    total: data.rowCount,
  };
}

export async function GET() {
  try {
    const result = await listInvoices();
    return Response.json(result);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
