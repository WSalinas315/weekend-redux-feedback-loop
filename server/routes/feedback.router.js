const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET for admin functionality
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "feedback" ORDER BY "id";`;
  pool.query(queryText).then(result => {
    res.send(result.rows);
  }).catch(error => {
    console.log('Error with getting information from  database:', error);
    res.sendStatus(500);
  });
});

// POST for review page
router.post('/', (req, res) => {
  let feedback = req.body;
  console.log('Adding feedback entry', feedback);
  let queryText = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
                  VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [feedback.feeling, feedback.understanding, feedback.support, feedback.comments]).then(result =>{
    res.sendStatus(201);
  }).catch(error => {
    console.log(`Error adding new feedback`, error);
  });
});

// DELETE for admin functionality
router.delete('/:id', (req, res) => {
  console.log('In server router delete');
  let deleteID = req.params.id;
  let queryText = `DELETE FROM "feedback" WHERE "id"=$1;`;
  pool.query(queryText, [deleteID]).then(result => {
    res.sendStatus(200);
  }).catch(error => {
    console.log('Error with deleting feedback from database:', error);
  });
});

// PUT for admin flagging
router.put('/:id', (req, res) => {
  let changeID = req.params.id;
  let queryText = `UPDATE "feedback" SET "flagged" = NOT "flagged" WHERE "id"=$1;`;
  pool.query(queryText, [changeID]).then(result => {
    res.sendStatus(200);
  }).catch(error => {
    console.log('Error with updating feedback flagging in database:', error);
  });
});

module.exports = router;