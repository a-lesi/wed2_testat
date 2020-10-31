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
    constructor() {
        this.db = new Datastore({ filename: './data/note.db', autoload: true });
    }
    add(title, description, importance, endDate, createdDate, finished) {
        return __awaiter(this, void 0, void 0, function* () {
            let note = new Note(title, description, importance, endDate, createdDate, finished);
            return this.db.insert(note);
        });
    }
    edit(id, title, description, importance, endDate, finished) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db.update({ _id: id }, { $set: { title: title, description: description, importance: importance, endDate: endDate, finished: finished } });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.findOne({ _id: id });
        });
    }
    allSortedByFinishDate(ascending, withFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            let asc = ascending ? 1 : -1;
            if (withFinished) {
                return this.db.find({}).sort({ endDate: asc });
            }
            return this.db.find({ finished: { $ne: true } }).sort({ endDate: asc });
        });
    }
    allSortedByCreatedDate(ascending, withFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            let asc = ascending ? 1 : -1;
            if (withFinished) {
                return this.db.find({}).sort({ createdDate: asc });
            }
            return this.db.find({ finished: { $ne: true } }).sort({ createdDate: asc });
        });
    }
    allSortedByImportanceDate(ascending, withFinished) {
        return __awaiter(this, void 0, void 0, function* () {
            let asc = ascending ? 1 : -1;
            if (withFinished) {
                return this.db.find({}).sort({ importance: asc });
            }
            return this.db.find({ finished: { $ne: true } }).sort({ importance: asc });
        });
    }
}
export const noteStore = new NoteStore();
//# sourceMappingURL=noteStore.js.map