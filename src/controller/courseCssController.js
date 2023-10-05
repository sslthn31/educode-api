const courseCssData = require('../models/coursecssModel');
const path = require('path');
const fs = require('fs');

exports.createNewCourse = (req, res) => {
  const courseId = req.body.courseId;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file.path;

  const newPost = new courseCssData({
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

  courseCssData
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return courseCssData
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

  courseCssData
  .find({ courseId: dataId }) // Use courseId in the query
  .then((result) => {
    if (result.length === 0) {
      return res.status(404).json({
        message: 'Data not found',
      });
    }

    res.status(200).json({
      message: 'Data found',
      data: result,
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  });
};

exports.updateCourseData = (req, res) => {
  const dataId = req.params.dataId;

  const courseId = req.body.courseId;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.file.path;

  courseCssData
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

  courseCssData
    .findById(dataId)
    .then((post) => {
      removeImage(post.image);
      return courseCssData.findByIdAndRemove(dataId);
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
