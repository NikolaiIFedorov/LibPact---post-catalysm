import pkg from "sqlite3";
const { verbose } = pkg;

const sqlite3 = verbose();

const db = new sqlite3.Database(":libpact:");

export function UploadData(table: string, data: string) {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ${table} (info ${data})`);

    const stmt = db.prepare(`INSERT INTO ${table} VALUES (?)`);
    stmt.run(data);

    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM teams", (err, row: any) => {
      console.log(row.id + ": " + row.info);
    });
  });

  db.close();
}

export function RecallData(table: string) {
  let data = [];
  db.serialize(() => {
    db.each(`SELECT rowid AS id, info FROM ${table}`, (err, row: any) => {
      data.push(row.id + ": " + row.info);
    });
  });
  db.close();
  return data;
}
