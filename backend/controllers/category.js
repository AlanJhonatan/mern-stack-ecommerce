const _ = require('lodash');
const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category doesn't exists !",
      });
    }

    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({ data });
  });
};

exports.read = (req, res) => {
  res.json(req.category);
};

exports.list = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json(categories);
  });
};

exports.update = (req, res) => {
  let category = req.category;
  category = _.extend(category, req.body);

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({ data });
  });
};

exports.remove = (req, res) => {
  let category = req.category;

  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      deletedCategory,
      message: 'Category deleted successfully !',
    });
  });
};
