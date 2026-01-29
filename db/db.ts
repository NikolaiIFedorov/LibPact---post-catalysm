import pkg from "sqlite3";
import { InputType } from "../input_types/";
import { v4 as uuidv4 } from "uuid";

const { verbose } = pkg;
const sqlite3 = verbose();

const db = new sqlite3.Database("./db/:libpact:");
type TableNames = InputType | "icon";
type SearchFilter = {
  data: string;
  where: string;
  whereData: string;
};

const downloadData = (
  name: TableNames,
  searchFilter?: SearchFilter,
): Promise<object[]> => {
  if (searchFilter) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT ${searchFilter.data} FROM ${name} WHERE ${searchFilter.where}="${searchFilter.whereData}"`,
        (err, rows: any[]) => {
          if (err) {
            reject(err);
          } else {
            const data = rows.map((row) => row.data);
            resolve(data);
          }
        },
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${name}`, (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};

const uploadData = (
  name: TableNames,
  data: { [key: string]: string | number | null }[],
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const columns = [...new Set(data.flatMap((o) => Object.keys(o)))];

    const stmt = db.prepare(
      `INSERT INTO ${name} (key, ${columns.join(", ")}) VALUES (?, ${columns.map(() => "?").join(", ")})`,
      (err) => {
        if (err) reject(err);
      },
    );

    data.forEach((row) => {
      const key = uuidv4();
      const values = [key, ...columns.map((col) => row[col])];
      stmt.run(values, (err) => {
        if (err) reject(err);
      });
    });

    stmt.finalize((err) => {
      if (err) {
        reject(err);
      } else resolve();
    });
  });
};

type Data =
  | {
      name: string;
      type: "boolean" | "number" | "string";
      reference?: undefined;
    }
  | {
      name: string;
      type: "number";
      reference: TableNames;
    };

const createTableIfNotExists = (table: Table) => {
  const fields = table.data
    .map(
      (field) =>
        `${field.name} ${field.type}${
          field.reference ? ` REFERENCES ${field.reference}(key)` : ""
        }`,
    )
    .join(", ");
  db.run(
    `CREATE TABLE IF NOT EXISTS ${table.name} (key number, ${fields}, PRIMARY KEY(key))`,
  );
};

class Table {
  private static instance: Table | null = null;
  name: TableNames;
  data: Array<Data>;

  private constructor(name: TableNames, data: Array<Data>) {
    this.name = name;
    this.data = data;
    createTableIfNotExists(this);
  }

  static getInstance(name: TableNames, data: Array<Data>): Table {
    Table.instance = new Table(name, data);

    return Table.instance;
  }

  get(searchFilter?: SearchFilter): Promise<object[]> {
    return downloadData(this.name, searchFilter);
  }

  insert(data: { [key: string]: string | number | null }[]): Promise<void> {
    return uploadData(this.name, data);
  }
}

export type DbImg = {
  character: string;
  icon: string;
  sticker: string | null;
};

export const dbImg: Table = Table.getInstance("icon", [
  { name: "character", type: "string" },
  { name: "icon", type: "string" },
  { name: "sticker", type: "string" },
]);

export const dbBuilds: Table = Table.getInstance("build", [
  { name: "name", type: "string" },
  { name: "team", type: "number", reference: "team" },
]);

export const dbTeams: Table = Table.getInstance("team", [
  { name: "name", type: "string" },
]);

export const dbCache: Table = Table.getInstance("icon", [
  { name: "character", type: "string" },
  { name: "icon", type: "string" },
  { name: "sticker", type: "string" },
]);
