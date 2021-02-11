const db = require("../models");
const config = require("../config/auth.config");
const Session = db.app_session;

exports.getAllSessions = (req, res) => {
  // Lists all session for a given user
  Session.findAll({
    where: {
      user_uuid: req.user_uuid
    }
  }).then(users => {
    if (users) {
      res.status(201).send(users);
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
  console.log(req.body);
};

exports.getSession = (req, res) => {
  // Shows specific session by ID, must be the user's own session
  console.log("Finding session")
  Session.findOne({
    where: {
      session_uuid: req.params.session_id
    }
  }).then(session => {
    res.status(201).send(session)
    console.log("Session found");
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.newSession = (req, res) => {
  // Save session to db
  Session.create({
    session_start: req.body.session_start,
    session_note: req.body.session_note,
    user_uuid: req.user_uuid,
    task_uuid: req.body.session_task_uuid
  })
  .then(res.status(201).send({message: "Session was created successfully!"}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.updateSession = (req, res) => {
  // Save session to db
  Session.update({
    session_start: req.body.session_start,
    session_end: req.body.session_end,
    session_note: req.body.session_note,
    user_uuid: req.body.session_user_uuid,
    task_uuid: req.body.session_task_uuid
  })
  .then(res.send({message: "Session was updated successfully!"}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

  res.status(201).send("Session creation.");
  console.log("Creating a session", req.body);
}