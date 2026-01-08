import pkg from "sqlite3";
const { verbose } = pkg;

const sqlite3 = verbose();

const db = new sqlite3.Database(":libpact:");

type Table = "teams" | "builds" | "characters" | "artifacts" | "weapons";

export async function uploadData(table: Table, data: string) {
  db.serialize(async () => {
    db.run(`CREATE TABLE IF NOT EXISTS ${table} (info TEXT)`);

    const stmt = db.prepare(`INSERT INTO ${table} VALUES (?)`);
    stmt.run(data);

    stmt.finalize();
  });
}

export async function downloadData(table: Table) {
  return new Promise<string[]>((resolve, reject) => {
    const tableData: string[] = [];
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS ${table} (info TEXT)`);

      db.get(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [table],
        (err: Error | null, row: { name: string } | undefined) => {
          if (err) {
            reject(err);
            return;
          } else if (!row) {
            resolve([]);
            return;
          }

          db.each(
            `SELECT rowid AS id, info FROM ${table}`,
            (err: Error, row: { id: number; info: string }) => {
              if (err) {
                console.error(err);
              } else {
                tableData.push(row.info);
              }
            },
            (err: Error | null) => {
              if (err) {
                reject(err);
              } else {
                resolve(tableData);
              }
            }
          );
        }
      );
    });
  });
}

export async function deleteData(table: Table) {
  db.serialize(() => {
    db.run(`DELETE FROM ${table}`, function (err) {
      if (err) {
        return console.error(err.message);
      }
    });
  });
}
