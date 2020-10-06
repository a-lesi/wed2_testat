import {noteStore} from '../services/noteStore.js'

export class NotesController {
    async createNote(req, res) {
        let note = await noteStore.add(req.body.title, req.body.description, req.body.importance, req.body.todoDate);
        console.log(req.body);
    }

    async showNotes(req, res) {
        console.log(await noteStore.all());

        res.render("index", await noteStore.all());
    }
}

export const notesController = new NotesController();