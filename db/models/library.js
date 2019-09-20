const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Library extends Sequelize.Model {}
  Library.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"',
        },
        notEmpty: {
          msg: 'Please provide a value for "title"',
        },
      },
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "author"',
          },
          notEmpty: {
            msg: 'Please provide a value for "author"',
          },
        },
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "genre"',
          },
          notEmpty: {
            msg: 'Please provide a value for "genre"',
          },
        },
      },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "year"',
        },
        min: { 
            args: 1,
            msg: 'Please provide a value greater than "0" for "runtime"',
        },
      },
    }
    }, {  // enable "soft" deletes 
    sequelize });

    return Library;
};