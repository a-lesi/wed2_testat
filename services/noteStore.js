import Datastore from 'nedb-promise'


class Note {
    constructor(title, description, importance, endDate, createdDate, finished = false) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.endDate = endDate;
        this.createdDate = createdDate;
        this.finished = finished;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = new Datastore({ filename: './data/note.db', autoload: true });
    }

    async add(title, description, importance, endDate, creationDate, finished) {
        let note = new Note(title, description, importance, endDate, creationDate, finished);
        return this.db.insert(note);
    }

    async edit(id, title, description, importance, endDate, finished) {
        this.db.update({ _id: id }, { $set: { title: title, description: description, importance: importance, endDate: endDate, finished: finished}});
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async all() {
        return this.db.find({});
    }
}

export const noteStore = new NoteStore();