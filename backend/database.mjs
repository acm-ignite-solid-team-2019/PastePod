export class Database {
    getUri(hash) {
        return Promise.reject("Abstract")
    }

    putUri(hash, uri) {
        return Promise.reject("Abstract")
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
                reject("No such paste.")
            }
        });
    }

    putUri(hash, uri) {
        return new Promise((resolve, reject) => {
            this.map.set(hash, uri);
            resolve();
        })
    }
}

export class SqliteDatabase extends Database {
    // TODO
}