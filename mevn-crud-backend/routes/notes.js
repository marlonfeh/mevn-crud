const express = require('express');

const notesController = require('../controllers/notes');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

// POST /user
router.post('/', isAuth, notesController.create);

// GET /user
router.get('/', isAuth, notesController.getAll);

// GET /user
router.get('/:noteId', isAuth, notesController.getNote);

// PUT
router.put('/:noteId', isAuth, notesController.updateNote);

// DELETE Note
router.delete('/:noteId', isAuth, notesController.delete);

// DELETE All
router.delete('/', isAuth, notesController.deleteAll);

module.exports = router;