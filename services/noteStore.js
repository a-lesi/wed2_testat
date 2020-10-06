import Datastore from 'nedb-promise'


class Note {
    constructor(title, description, importance, endDate) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.endDate = endDate;
        this.createdDate = "2020-10-06"; //todo: dynamisches created Date
        this.finished = false;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = new Datastore({ filename: './data/note.db', autoload: true });
    }

    async add(title, description, importance, endDate, callback) {
        let note = new Note(title, description, importance, endDate);
        return this.db.insert(note);
    }

    edit(id) {

    }

    finish(id) {

    }

    get(id) {

    }

    async all() {
        return this.db.find({});
    }
}

export const noteStore = new NoteStore();