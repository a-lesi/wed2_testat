import {noteStore} from '../services/noteStore.js'

export class NotesController {
    async createNote(req, res) {
        let today = getToDate();
        await noteStore.add(req.body.title, req.body.description, req.body.importance, req.body.todoDate, today);
        this.showNotes(req, res)
    }

    async showNotes(req, res) {
        res.render("index", {"allNotes": await noteStore.all()});
    }

    async showNote(req, res) {
        if (req.params.id) {
            res.render("createNote", await noteStore.get(req.params.id));
        } else {
            res.render("createNote", {"today": getToDate()});
        }
    }

    async editNote(req, res) {
        await noteStore.edit(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.todoDate)
        this.showNotes(req, res)
    }

    async changeFinished(req, res) {
        console.log(req.body);
        await noteStore.finish(req.params.id);

        this.showNotes(req, res)
    }

}

function getToDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    }
    if(mm<10) {
        mm='0'+mm;
    }

    return yyyy + '-' + mm + '-' + dd;
}

export const notesController = new NotesController();