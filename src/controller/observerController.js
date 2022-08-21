const observerData = require('../models/observerModel');
const path = require('path');
const fs = require('fs');

exports.createNewCourse = (req, res) => {
  const ipAdress = req.body.ipAdress;
  const question = req.body.question;
  const startedAt = req.body.startedAt;

  const newPost = new observerData({
    ipAdress: ipAdress,
    question: question,
    startedAt: startedAt,
  });

  newPost
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'new user just posted',
        data: result,
      });
    })
    .catch((err) => {
      console.log(`errornya : ${err}`);
    });
};

exports.getAllCourse = (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  observerData
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return observerData
        .find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(201).json({
        message: 'Show All Data',
        data: result,
        total_items: totalItems,
        perPage: parseInt(perPage),
        currentPage: parseInt(currentPage),
      });
    })
    .catch((err) => {
      console.log(`error : ${err}`);
    });
};

exports.getCourseById = (req, res) => {
  const dataId = req.params.dataId;

  observerData
    .findById(dataId)
    .then((result) => {
      res.status(201).json({
        message: 'data ditemukan',
        data: result,
      });
    })
    .catch((err) => {
      console.log(`error : ${err}`);
    });
};

exports.updateCourseData = (req, res) => {
  const dataId = req.params.dataId;

  const ipAdress = req.body.ipAdress;
  const question = req.body.question;
  const startedAt = req.body.startedAt;

  observerData
    .findById(dataId)
    .then((post) => {
      post.ipAdress = ipAdress;
      post.question = question;
      post.startedAt = startedAt;
      

      return post.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'Success Updated',
        data: result,
      });
    })
    .catch((err) => {
      console.log(`error : ${err}`);
    });
};

exports.deleteCourseData = (req, res) => {
  const dataId = req.params.dataId;

  observerData
    .findById(dataId)
    .then((post) => {
      //removeImage(post.image);
      return observerData.findByIdAndRemove(dataId);
    })
    .then(
      res.status(201).json({
        message: 'deleted',
      })
    )
    .catch((err) => {
      console.log(`errornya : ${err}`);
    });
};

// const removeImage = (filePath) => {
//   console.log('filepath', filePath);
//   console.log('dirname', __dirname);

//   filePath = path.join(__dirname, '../..', filePath);
//   fs.unlink(filePath, (err) => console.log(err));
// };
