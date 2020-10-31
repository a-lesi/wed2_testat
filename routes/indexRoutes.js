import express from 'express';
const router = express.Router();
import { notesController } from '../controller/noteController.js';
router.get("/", notesController.showAllNotes.bind(notesController));
router.post("/", notesController.setSessionInfos.bind(notesController));
router.get("/createNote/", notesController.showNote.bind(notesController));
router.post("/createNote", notesController.createNote.bind(notesController));
router.get("/edit/:id/", notesController.showNote.bind(notesController));
router.post("/edit/:id/", notesController.editNote.bind(notesController));
export const indexRoutes = router;
//# sourceMappingURL=indexRoutes.js.map