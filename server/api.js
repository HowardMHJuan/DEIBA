const express = require('express');
const bodyParser = require('body-parser');
const Ceiba = require('./node-ceiba-sdk/ceiba');

const router = express.Router();

let data = {};

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/data', (req, res) => {
  const user = new Ceiba(req.body.ID, req.body.password, (err) => {
    if(!err) {
      for(course of user.semester[0].courses) {
        course.fetch();
      }
      setTimeout(() => {
        if(req.body.ID.toLowerCase() in data === false) {
          data[req.body.ID.toLowerCase()] = {};
        }
        let deadlines = data[req.body.ID.toLowerCase()];
        for(course of user.semester[0].courses) {
          for(hw of course.homeworks) {
            // console.log(hw);
            const time = new Date(`${hw.end_date} ${hw.end_hour}:00`);
            if(hw.sn in deadlines === false) {
              deadlines[hw.sn] = {
                subject: course.cname,
                title: hw.name,
                content: hw.description,
                time: time,
                done: time < new Date() - 86400000 * 7 ? true : false,
              };
            }
          }
        }
        data[req.body.ID.toLowerCase()] = deadlines;
        res.json(deadlines);
      }, 5000);
    } else {
      console.error(err);
      res.json(null);
    }
  });
});

router.post('/update', (req, res) => {
  // console.log(req.body.ID, req.body.password);
  const user = new Ceiba(req.body.ID, req.body.password, (err) => {
    if(!err) {
      data[req.body.ID.toLowerCase()][req.body.sn][req.body.key] = req.body.value;
      // console.log(data[req.body.ID.toLowerCase()][req.body.sn], req.body.value);
      res.json('done');
    } else {
      console.error(err);
      res.json(null);
    }
  });
});

router.post('/add', (req, res) => {
  // console.log(req.body.ID, req.body.password);
  const user = new Ceiba(req.body.ID, req.body.password, (err) => {
    if(!err) {
      data[req.body.ID.toLowerCase()][req.body.sn] = {
        title: req.body.title,
        subject: req.body.subject,
        time: req.body.time,
        content: req.body.content,
        done: req.body.done,
      };
      // console.log(data[req.body.ID.toLowerCase()][req.body.sn]);
      res.json('done');
    } else {
      console.error(err);
      res.json(null);
    }
  });
});

module.exports = router;