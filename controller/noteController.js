var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { noteStore } from '../services/noteStore.js';
export class NotesController {
    constructor() {
        this.allowedSortBy = ["finishDate", "createdDate", "importance"];
    }
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield noteStore.add(req.body.title, req.body.description, req.body.importance, new Date(req.body.finishDate), new Date(), req.body.finished === 'on');
            res.redirect("/");
        });
    }
    showAllNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.allowedSortBy.includes(req.session.sortBy)) {
                res.render("index", { "allNotes": yield noteStore.getAllData(req.session.sortBy, req.session.sortAscending, req.session.showAll), "altTheme": req.session.altTheme });
            }
            else {
                res.render("index", { "allNotes": yield noteStore.getAllData("finishDate", true, req.session.showAll), "altTheme": req.session.altTheme });
            }
        });
    }
    setSessionInfos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.sortBy) {
                if (req.session.sortBy === req.body.sortBy) {
                    req.session.sortAscending = !req.session.sortAscending;
                }
                else {
                    req.session.sortBy = req.body.sortBy;
                    req.session.sortAscending = true;
                }
            }
            else if (req.body.altTheme) {
                req.session.altTheme = !req.session.altTheme;
            }
            else if (req.body.showAll) {
                req.session.showAll = !req.session.showAll;
            }
            res.redirect("/");
        });
    }
    showNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                res.render("note", { "note": yield noteStore.get(req.params.id), "altTheme": req.session.altTheme });
            }
            else {
                res.render("note", { "today": new Date(), "altTheme": req.session.altTheme });
            }
        });
    }
    editNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield noteStore.edit(req.params.id, req.body.title, req.body.description, req.body.importance, new Date(req.body.finishDate), req.body.finished === 'on');
            res.redirect("/");
        });
    }
}
export const notesController = new NotesController();
//# sourceMappingURL=noteController.js.map