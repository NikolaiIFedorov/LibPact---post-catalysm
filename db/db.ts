import pkg from "sqlite3";
import { InputType } from "../input_types/";
import { v4 as uuidv4 } from "uuid";

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { normalizeName } from "@/input_types/Team/Build/";

const { verbose } = pkg;
const sqlite3 = verbose();

const db = new sqlite3.Database("./db/:libpact:");
type TableNames = InputType;
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

  delete(confirm: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (confirm === this.name)
        db.run(`DELETE FROM ${this.name}`, (err) => {
          if (err) {
            reject(err);
          } else resolve();
        });
      else reject("Table name does not match. Deletion aborted.");
    });
  }
}

/**
 * Downloads an image from a URL and saves it to the public folder
 * @param url - The URL of the image to download
 * @param filename - The desired filename (without extension)
 * @param subfolder - Optional subfolder within public (e.g., 'characters', 'weapons')
 * @returns The local path relative to public folder, or null if failed
 */
export async function downloadImage(
  url: string,
  filename: string,
  subfolder?: string,
): Promise<string | null> {
  try {
    const urlPath = new URL(url).pathname;
    const ext = path.extname(urlPath) || ".png";

    const fullFilename = `${filename}${ext}`;
    console.log(fullFilename);

    const publicDir = path.join(process.cwd(), "public");
    const targetDir = subfolder ? path.join(publicDir, subfolder) : publicDir;

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, fullFilename);

    if (fs.existsSync(filePath)) {
      console.log(`Image already exists: ${fullFilename}`);
      return subfolder ? `/${subfolder}/${fullFilename}` : `/${fullFilename}`;
    }

    await new Promise<void>((resolve, reject) => {
      const protocol = url.startsWith("https") ? https : http;
      const file = fs.createWriteStream(filePath);

      protocol
        .get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`Failed to download: ${response.statusCode}`));
            return;
          }

          response.pipe(file);

          file.on("finish", () => {
            file.close();
            resolve();
          });
        })
        .on("error", (err) => {
          fs.unlink(filePath, () => {});
          reject(err);
        });

      file.on("error", (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    });

    const relativePath = subfolder
      ? `/${subfolder}/${fullFilename}`
      : `/${fullFilename}`;
    return relativePath;
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error);
    return null;
  }
}

export async function getImgs(
  name: string,
  type: "character" | "weapon" | "artifact",
): Promise<string> {
  const nameNormal = normalizeName(name);
  if (nameNormal === "") return "";
  if (nameNormal === "Traveler") return "Traveler";

  if (fs.existsSync(`./public/${type}/${nameNormal}.png`)) return nameNormal;

  let target = "";
  if (type === "character") target = `${name}/Gallery`;
  else if (type === "weapon") target = name;
  else if (type === "artifact") target = name;
  const filters = "&prop=images&imlimit=500&format=json&origin=*";
  const base = "https://genshin-impact.fandom.com/api.php?action=query&titles=";
  const url = base + target + filters;

  const galleryResponse = await fetch(url);

  const galleryData = await galleryResponse.json();
  const galleryPages = galleryData.query.pages;
  const galleryPageId = Object.keys(galleryPages)[0];
  const galleryImages = galleryPages[galleryPageId].images;

  const iconImages = galleryImages.filter((img: any) => {
    if (type === "character")
      return img.title.startsWith("File: " + name + " Icon");
    else if (type === "weapon")
      return img.title === "File:Weapon " + name + ".png";
    else if (type === "artifact") {
      return img.title.startsWith("File:Item " + name);
    }
  });

  if (iconImages.length === 0) {
    console.log();
    throw galleryImages
      .filter((img: any) => img.title.includes(name))
      .map((img: any) => img.title)
      .join(", ");
  }

  let images = [];
  for (const img of iconImages) {
    const iconResponse = await fetch(
      `https://genshin-impact.fandom.com/api.php?action=query&titles=${encodeURIComponent(
        img.title,
      )}&prop=imageinfo&iiprop=url&format=json&origin=*`,
    );
    const iconData = await iconResponse.json();
    const iconPages = iconData.query.pages;
    const iconPageId = Object.keys(iconPages)[0];
    const iconUrl = iconPages[iconPageId].imageinfo?.[0]?.url;

    if (iconUrl) images.push(iconUrl);
  }

  if (images[0]) {
    const imageUrl = images[0].split("/revision")[0];
    const localPath = await downloadImage(imageUrl, nameNormal, type);
    return localPath || imageUrl;
  }

  return "";
}

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
