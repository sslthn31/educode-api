const courseHtmlData = require('../models/courserhtmlModel');
const path = require('path');
const fs = require('fs');

exports.createNewCourse = (req, res) => {
  const courseId = req.body.courseId;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file.path;

  const newPost = new courseHtmlData({
    courseId: courseId,
    title: title,
    description: description,
    image: image,
  });

  newPost
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'new dummy just posted',
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

  courseHtmlData
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return courseHtmlData
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

  courseHtmlData
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

  const courseId = req.body.courseId;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file.path;

  courseHtmlData
    .findById(dataId)
    .then((post) => {
      post.courseId = courseId;
      post.title = title;
      post.description = description;
      post.image = image;

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

  courseHtmlData
    .findById(dataId)
    .then((post) => {
      removeImage(post.image);
      return courseHtmlData.findByIdAndRemove(dataId);
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

const removeImage = (filePath) => {
  console.log('filepath', filePath);
  console.log('dirname', __dirname);

  filePath = path.join(__dirname, '../..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
