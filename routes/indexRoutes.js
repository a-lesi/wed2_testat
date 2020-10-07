import express from 'express';
const router = express.Router();
import {notesController} from '../controller/noteController.js';

router.get("/", notesController.showNotes.bind(notesController));

router.get("/edit", notesController.showNote.bind(notesController));
router.post("/edit", notesController.createNote.bind(notesController));
router.get("/edit/:id/", notesController.showNote.bind(notesController));
router.post("/edit/:id/", notesController.editNote.bind(notesController));
router.post("/edit/:id/finished", notesController.changeFinished.bind(notesController));

export const indexRoutes = router;