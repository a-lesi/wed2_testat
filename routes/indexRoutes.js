import express from 'express';
const router = express.Router();
import {notesController} from '../controller/noteController.js';

router.get("/", notesController.showNotes.bind(notesController));

/*router.get("/edit", (req, res) => {
    res.render("createNote")
});
router.post("/edit", notesController.createNote);*/

export const indexRoutes = router;