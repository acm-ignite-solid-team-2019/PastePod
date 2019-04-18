import sqlite3 from "sqlite3";

export class Database {
  getUri(hash) {
    return Promise.reject("Abstract");
  }

  putUri(hash, uri) {
    return Promise.reject("Abstract");
  }

  close() {
    return Promise.reject("Abstract");
  }
}

export class SqliteDatabase extends Database {
  constructor() {
    super();
    this.db = new sqlite3.Database("./prod/pastes.db", (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connected to the database.");
        this.db.run("CREATE TABLE IF NOT EXISTS shareLinks(hash text, uri text)");
      }
    });
  }

  getUri(hash) {
    return new Promise((resolve, reject) => {
      this.db.prepare("SELECT uri FROM shareLinks WHERE hash = (?)", err => {
        if (err) reject(err);
      })
        .get([hash], (err, row) => {
          if (err) reject(err);

          if (row) resolve(row.uri);
          else reject("No such paste.");
        });
    });
  }

  putUri(hash, uri) {
    return new Promise((resolve, reject) => {
      this.db.prepare("INSERT INTO shareLinks (hash, uri) VALUES(?,?)", err => {
        if (err) reject(err);
      })
        .run([hash, uri], err => {
          if (err) reject(err);
          else resolve();
        });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close(err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

export class MapDatabase extends Database {
  constructor() {
    super();
    this.map = new Map();
  }

  getUri(hash) {
    return new Promise((resolve, reject) => {
      if (this.map.has(hash)) {
        resolve(this.map.get(hash));
      } else {
        reject("No such paste.");
      }
    });
  }

  putUri(hash, uri) {
    return new Promise((resolve, reject) => {
      this.map.set(hash, uri);
      resolve();
    });
  }
}