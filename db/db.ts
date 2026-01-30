import pkg from "sqlite3";
import { InputType } from "../input_types/";
import { v4 as uuidv4 } from "uuid";

const { verbose } = pkg;
const sqlite3 = verbose();

const db = new sqlite3.Database("./db/:libpact:");
type TableNames = InputType | "icon";
type SearchFilter = {
  what: string;
  in: string;
  whereIn: string;
};

const downloadData = (
  name: TableNames,
  searchFilter?: SearchFilter,
): Promise<any[]> => {
  if (searchFilter) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT ${searchFilter.what} FROM ${name} WHERE ${searchFilter.in}="${searchFilter.whereIn}"`,
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

const uploadData = (name: TableNames, data: any[]): Promise<void> => {
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

const createTableIfNotExists = (table: Table<any>) => {
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

class Table<RowType> {
  private static instance: Table<any> | null = null;
  name: TableNames;
  data: Array<Data>;

  private constructor(name: TableNames, data: Array<Data>) {
    this.name = name;
    this.data = data;
    createTableIfNotExists(this);
  }

  static getInstance(name: TableNames, data: Array<Data>): Table<any> {
    Table.instance = new Table(name, data);

    return Table.instance;
  }

  get(searchFilter?: SearchFilter): Promise<RowType[]> {
    return downloadData(this.name, searchFilter);
  }

  insert(data: RowType[]): Promise<void> {
    return uploadData(this.name, data);
  }
}

export type DbImg = {
  character: string;
  icon: string;
  sticker: string | null;
};

export const dbImg: Table<DbImg> = Table.getInstance("icon", [
  { name: "character", type: "string" },
  { name: "icon", type: "string" },
  { name: "sticker", type: "string" },
]);

type DbBuilds = {
  name: string;
  team: number;
};

export const dbBuilds: Table<DbBuilds> = Table.getInstance("build", [
  { name: "name", type: "string" },
  { name: "team", type: "number", reference: "team" },
]);

type DbTeams = {
  name: string;
};

export const dbTeams: Table<DbTeams> = Table.getInstance("team", [
  { name: "name", type: "string" },
]);

type DbCache = any;

export const dbCache: Table<DbCache> = Table.getInstance("icon", [
  { name: "character", type: "string" },
  { name: "icon", type: "string" },
  { name: "sticker", type: "string" },
]);
