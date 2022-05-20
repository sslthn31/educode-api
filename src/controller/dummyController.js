const dummyData = require('../models/dummyModels');

exports.createNewDummy = (req, res, next) => {
  const title = req.body.title;
  const link = req.body.link;
  const description = req.body.description;
  const alternativeLink = req.body.alternativeLink;
  const image = req.file.path;

  const newPost = new dummyData({
    title: title,
    link: link,
    description: description,
    alternativeLink: alternativeLink,
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
      console.log(`error : ${err}`);
    });
};

exports.getAllDummy = (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  dummyData
    .find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return dummyData
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

exports.getDummyById = (req, res) => {
  const dataId = req.params.dataId;

  dummyData
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

exports.updateDummyData = (req, res) => {
  const dataId = req.params.dataId;

  const title = req.body.title;
  const link = req.body.link;
  const description = req.body.description;
  const alternativeLink = req.body.alternativeLink;
  const image = req.file.path;

  dummyData
    .findById(dataId)
    .then((post) => {
      post.title = title;
      post.link = link;
      post.description = description;
      post.alternativeLink = alternativeLink;
      post.image = req.file.path;

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

exports.deleteDummyData = (req, res) => {
  const dataId = req.params.dataId;

  dummyData
    .findById(dataId)
    .then((post) => {
      return dummyData.findByIdAndRemove(dataId);
    })
    .then(
      res.status(201).json({
        message: 'deleted',
      })
    )
    .catch((err) => {
      console.log(`errors : ${err}`);
    });
};
