import pkg from "sqlite3";
const { verbose } = pkg;

const sqlite3 = verbose();

const db = new sqlite3.Database("./db/:libpact:");

type Name = "teams";

type Data = {
  name: string;
  type: "boolean" | "number" | "string";
};

const createTableIfNotExists = (table: Table) => {
  const fields = table.data
    .map((field) => `${field.name} ${field.type}`)
    .join(", ");
  db.run(`CREATE TABLE IF NOT EXISTS ${table.name} (${fields})`);
};

const downloadData = (name: Name): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${name}`, (err, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        const data = rows.map((row) => row.data as string);
        resolve(data);
      }
    });
  });
};

class Table {
  private static instance: Table | null = null;
  name: Name;
  data: Array<Data>;

  private constructor(name: Name, data: Array<Data>) {
    this.name = name;
    this.data = data;
    createTableIfNotExists(this);
  }

  static getInstance(name: Name, data: Array<Data>): Table {
    if (!Table.instance) {
      Table.instance = new Table(name, data);
    }
    return Table.instance;
  }

  get(): Promise<string[]> {
    return downloadData(this.name);
  }
}

export const dbTeams: Table = Table.getInstance("teams", [
  { name: "name", type: "string" },
]);
