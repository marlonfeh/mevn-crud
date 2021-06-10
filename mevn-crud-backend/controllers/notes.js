const Note = require('../models/notes');

exports.create = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const creator = req.body.creator;
  const note = new Note({
    title: title,
    content: content,
    creator: creator
  });
  note
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Note created successfully!',
        note: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAll = (req, res, next) => {
  Note.find()
    .then(notes => {
      res
        .status(200)
        .json({ message: 'Fetched notes successfully.', notes: notes });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getNote = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .then(note => {
      if (!note) {
        const error = new Error('Could not find note.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Note fetched.', note: note });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateNote = (req, res, next) => {
  const noteId = req.params.noteId;
  const title = req.body.title;
  const content = req.body.content;
  
  Note.findById(noteId)
    .then(note => {
      if (!note) {
        const error = new Error('Could not find note.');
        error.statusCode = 404;
        throw error;
      }
      note.title = title;
      note.content = content;
      return note.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Note updated!', note: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.delete = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .then(note => {
      if (!note) {
        const error = new Error('Could not find note.');
        error.statusCode = 404;
        throw error;
      }
      
      return Note.findByIdAndRemove(noteId);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Deleted note.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Note.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};