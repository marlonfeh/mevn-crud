const express = require('express');
const notesController = require('../controllers/notes');

const router = express.Router();

// POST /user
router.post('/', notesController.create);

// GET /user
router.get('/', notesController.getAll);

// GET /user
router.get('/:noteId', notesController.getNote);

// PUT
router.put('/:noteId', notesController.updateNote);

// DELETE Note
router.delete('/:noteId', notesController.delete);

// DELETE All
router.delete('/', notesController.deleteAll);

module.exports = router;