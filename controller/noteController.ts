import {noteStore} from '../services/noteStore.js'

export class NotesController {
    private allowedSortBy = ["finishDate", "createdDate", "importance"];

    async createNote(req, res) {
        await noteStore.add(req.body.title, req.body.description, req.body.importance, new Date(req.body.endDate), new Date(), req.body.finished === 'on');
        res.redirect("/");
    }

    async showAllNotes(req, res) {
        if (this.allowedSortBy.includes(req.session.sortBy)) {
            res.render("index", {"allNotes": await noteStore.getAllData(req.session.sortBy, req.session.sortAscending, req.session.showAll), "altTheme": req.session.altTheme});
        } else {
            res.render("index", {"allNotes": await noteStore.getAllData("finishDate" , true, req.session.showAll), "altTheme": req.session.altTheme});
        }
    }

    async setSessionInfos(req, res) {
        if (req.body.sortBy) {
            if (req.session.sortBy === req.body.sortBy) {
                req.session.sortAscending = !req.session.sortAscending;
            } else {
                req.session.sortBy = req.body.sortBy;
                req.session.sortAscending = true;
            }
        } else if (req.body.altTheme) {
            req.session.altTheme = !req.session.altTheme;
        } else if (req.body.showAll) {
            req.session.showAll = !req.session.showAll;
        }
        res.redirect("/");
    }

    async showNote(req, res) {
        if (req.params.id) {
            res.render("note", {"note": await noteStore.get(req.params.id), "altTheme": req.session.altTheme});
        } else {
            res.render("note", {"today": new Date(), "altTheme": req.session.altTheme});
        }
    }

    async editNote(req, res) {
        await noteStore.edit(req.params.id, req.body.title, req.body.description, req.body.importance, new Date(req.body.endDate), req.body.finished === 'on');
        res.redirect("/");
    }
}

export const notesController = new NotesController();