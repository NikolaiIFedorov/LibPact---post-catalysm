import pkg from "sqlite3";
import { InputType } from "../input_types/";

const { verbose } = pkg;

const sqlite3 = verbose();

const db = new sqlite3.Database("./db/:libpact:");

type Tables = InputType | "icon";

type SearchFilter = {
  data: string;
  where: string;
  whereData: string;
};

const downloadData = (
  name: Tables,
  searchFilter?: SearchFilter
): Promise<string[]> => {
  if (searchFilter) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT ${searchFilter.data} FROM ${name} WHERE ${searchFilter.where}="${searchFilter.whereData}"`,
        (err, rows: any[]) => {
          if (err) {
            reject(err);
          } else {
            const data = rows.map((row) => row.data as string);
            resolve(data);
          }
        }
      );
    });
  } else {
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
  }
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
      reference: Tables;
    };

const createTableIfNotExists = (table: Table) => {
  const fields = table.data
    .map(
      (field) =>
        `${field.name} ${field.type}${
          field.reference ? ` REFERENCES ${field.reference}(key)` : ""
        }`
    )
    .join(", ");
  db.run(
    `CREATE TABLE IF NOT EXISTS ${table.name} (key number, ${fields}, PRIMARY KEY(key))`
  );
};

class Table {
  private static instance: Table | null = null;
  name: Tables;
  data: Array<Data>;

  private constructor(name: Tables, data: Array<Data>) {
    this.name = name;
    this.data = data;
    createTableIfNotExists(this);
  }

  static getInstance(name: Tables, data: Array<Data>): Table {
    Table.instance = new Table(name, data);

    return Table.instance;
  }

  get(searchFilter?: SearchFilter): Promise<string[]> {
    return downloadData(this.name, searchFilter);
  }
}

export const dbPng: Table = Table.getInstance("icon", [
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
