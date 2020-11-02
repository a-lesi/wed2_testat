import {noteStore} from '../services/noteStore.js'

export class NotesController {
    sessionConfigurator;
    async createNote(req, res) {
        await noteStore.add(req.body.title, req.body.description, req.body.importance, new Date(req.body.endDate), new Date(), req.body.finished === 'on');
        this.showAllNotes(req, res)
    }

    async showAllNotes(req, res) {
        if (req.session.sortBy === "finishDate") {
            res.render("index", {"allNotes": await noteStore.allSortedByFinishDate(req.session.sortAscending, req.session.showAll), "altTheme": req.session.altTheme});
        } else if (req.session.sortBy === "createdDate") {
            res.render("index", {"allNotes": await noteStore.allSortedByCreatedDate(req.session.sortAscending, req.session.showAll), "altTheme": req.session.altTheme});
        } else if (req.session.sortBy === "importance") {
            res.render("index", {"allNotes": await noteStore.allSortedByImportanceDate(req.session.sortAscending, req.session.showAll), "altTheme": req.session.altTheme});
        } else {
            res.render("index", {"allNotes": await noteStore.allSortedByFinishDate(true, req.session.showAll), "altTheme": req.session.altTheme});
        }
    }

    async setSessionInfos(req, res) {
        if (req.body.sortBy) {
            if (req.session.sortBy === req.body.sortBy) {
                req.session.sortAscending = !req.session.sortAscending
            } else {
                req.session.sortBy = req.body.sortBy;
                req.session.sortAscending = true;
            }
        } else if (req.body.altTheme) {
            req.session.altTheme = !req.session.altTheme;
        } else if (req.body.showAll) {
            req.session.showAll = !req.session.showAll;
        }
        this.showAllNotes(req, res)
    }

    async showNote(req, res) {
        if (req.params.id) {
            res.render("createNote", {"note": await noteStore.get(req.params.id), "altTheme": req.session.altTheme});
        } else {
            res.render("createNote", {"today": new Date(), "altTheme": req.session.altTheme});
        }
    }

    async editNote(req, res) {
        await noteStore.edit(req.params.id, req.body.title, req.body.description, req.body.importance, new Date(req.body.endDate), req.body.finished === 'on');
        this.showAllNotes(req, res)
    }
}

export const notesController = new NotesController();