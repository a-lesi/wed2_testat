import Datastore from 'nedb-promises'

class Note {
    private title: string;
    private description: string;
    private importance: number;
    private finishDate: any;
    private createdDate: any;
    private finished: boolean;

    constructor(title, description, importance, finishDate, createdDate, finished = false) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.finishDate = finishDate;
        this.createdDate = createdDate;
        this.finished = finished;
    }
}

export class NoteStore {
    private db: any;

    constructor() {
        this.db = new Datastore({ filename: './data/note.db', autoload: true });
    }

    async add(title, description, importance, finishDate, createdDate, finished) {
        const note = new Note(title, description, importance, finishDate, createdDate, finished);
        return this.db.insert(note);
    }

    async edit(id, title, description, importance, finishDate, finished) {
        this.db.update({ _id: id }, { $set: { title, description, importance, finishDate, finished}});
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async getAllData(sortBy, ascending, withFinished) {
        const asc = ascending ? 1 : -1
        if (withFinished) {
            return this.db.find({}).sort({ [sortBy]: asc});
        }
        return this.db.find({ finished: { $ne: true }}).sort({ [sortBy]: asc});
    }
}

export const noteStore = new NoteStore();