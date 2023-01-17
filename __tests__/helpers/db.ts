import { db } from "~/lib/db.server";

export async function truncateDB() {
  let tablenames: Array<{ TABLE_NAME: string }> =
    await db.$queryRaw`select table_name from information_schema.tables where table_schema = 'juniper_cash'`;

  for (const { TABLE_NAME } of tablenames) {
    try {
      /// console.log(TABLE_NAME);
      await db.$executeRawUnsafe(`TRUNCATE TABLE ${TABLE_NAME} `);
    } catch (error) {
      console.log({ error });
    }
  }
}
