import {noteStore} from '../services/noteStore.js'
import {sessionConfigurator} from "../utils/configurator";

export class NotesController {
    sessionConfigurator;
    async createNote(req, res) {
        await noteStore.add(req.body.title, req.body.description, req.body.importance, new Date(req.body.endDate), new Date(), req.body.finished === 'on');
        this.showAllNotes(req, res)
    }

    async showAllNotes(req, res) {
        if (req.session.sortBy === "finishDate") {
            res.render("index", {"allNotes": await noteStore.allSortedByFinishDate(req.session.sortAscending, req.session.withFinished)});
        } else if (req.session.sortBy === "createdDate") {
            res.render("index", {"allNotes": await noteStore.allSortedByCreatedDate(req.session.sortAscending, req.session.withFinished)});
        } else if (req.session.sortBy === "importance") {
            res.render("index", {"allNotes": await noteStore.allSortedByImportanceDate(req.session.sortAscending, req.session.withFinished)});
        } else {
            res.render("index", {"allNotes": await noteStore.allSortedByFinishDate(true, req.session.withFinished)});
        }
    }

    async setSessionInfos(req, res) {
        if (req.body.sortBy) {
            if (req.session.sortBy === req.body.sortBy) {
                req.session.sortAscending = !req.session.sortAscending
            } else {
                req.session.sortBy = req.body.sortBy
                req.session.sortAscending = true
            }
        } else if (req.body.theme) {
            req.session.theme = req.query.theme
        } else if (req.body.withFinished) {
            req.session.withFinished = !req.session.withFinished
        }
        this.showAllNotes(req, res)
    }

    async showNote(req, res) {
        if (req.params.id) {
            res.render("createNote", await noteStore.get(req.params.id));
        } else {
            res.render("createNote", {"today": new Date()});
        }
    }

    async editNote(req, res) {
        await noteStore.edit(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.endDate, req.body.finished === 'on');
        this.showAllNotes(req, res)
    }
}

export const notesController = new NotesController();