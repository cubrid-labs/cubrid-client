import { createClient } from "../src/index.js";

async function main(): Promise<void> {
  const db = createClient({
    host: "localhost",
    database: "demodb",
    user: "dba",
  });

  const rows = await db.query("SELECT * FROM athlete");
  console.log(rows);
  await db.close();
}

void main();
