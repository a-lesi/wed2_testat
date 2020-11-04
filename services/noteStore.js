var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Datastore from 'nedb-promises';
class Note {
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
    constructor() {
        this.db = new Datastore({ filename: './data/note.db', autoload: true });
    }
    add(title, description, importance, finishDate, createdDate, finished) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = new Note(title, description, importance, finishDate, createdDate, finished);
            return this.db.insert(note);
        });
    }
    edit(id, title, description, importance, finishDate, finished) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.update({ _id: id }, { $set: { title, description, importance, finishDate, finished } });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.findOne({ _id: id });
        });
    }
    getAllData(sortBy, ascending, withFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            const asc = ascending ? 1 : -1;
            if (withFinished) {
                return this.db.find({}).sort({ [sortBy]: asc });
            }
            return this.db.find({ finished: { $ne: true } }).sort({ [sortBy]: asc });
        });
    }
}
export const noteStore = new NoteStore();
//# sourceMappingURL=noteStore.js.map