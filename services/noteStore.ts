import Datastore from 'nedb-promises'

class Note {
    private title: string;
    private description: string;
    private importance: number;
    private endDate: any;
    private createdDate: any;
    private finished: boolean;

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
    private db: any;

    constructor() {
        this.db = new Datastore({ filename: './data/note.db', autoload: true });
    }

    async add(title, description, importance, endDate, createdDate, finished) {
        let note = new Note(title, description, importance, endDate, createdDate, finished);
        return this.db.insert(note);
    }

    async edit(id, title, description, importance, endDate, finished) {
        this.db.update({ _id: id }, { $set: { title: title, description: description, importance: importance, endDate: endDate, finished: finished}});
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async allSortedByFinishDate(ascending, withFinished) {
        let asc = ascending ? 1 : -1
        if (withFinished) {
            return this.db.find({}).sort({ endDate: asc});
        }
        return this.db.find({ finished: { $ne: true }}).sort({ endDate: asc});
    }

    async allSortedByCreatedDate(ascending, withFinished) {
        let asc = ascending ? 1 : -1
        if (withFinished) {
            return this.db.find({}).sort({ createdDate: asc});
        }
        return this.db.find({ finished: { $ne: true }}).sort({ createdDate: asc});
    }

    async allSortedByImportanceDate(ascending, withFinished) {
        let asc = ascending ? 1 : -1
        if (withFinished) {
            return this.db.find({}).sort({ importance: asc});
        }
        return this.db.find({ finished: { $ne: true }}).sort({ importance: asc});
    }
}

export const noteStore = new NoteStore();