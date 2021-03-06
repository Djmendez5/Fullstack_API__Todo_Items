'use strict';

/* THIS FILE IS GIVEN WHEN WE IMPORT! HOWEVER, THIS TUTORIAL:
https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
GIVES THIS ES6 VERSION */
/* In this file, we are requiring the modules we're going to be using. 
Then, we're reading the configuration specific to our current Node environment. 
If we don't have a Node environment defined, we're defaulting to development. 
Then, we are establishing a connection with our database, after which we read 
our models folder, discovering and importing any and all the models in it, 
adding them to the db object and applying relationships between the models, 
if such relationships exist. */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;

if (config.use_env_variable) {

    // From the environment, extract the key with the name provided in the config as use_env_variable
    // and use that to establish a connection to our database.
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} 

else {

    sequelize = new Sequelize(
        config.database, config.username, config.password, config
    );
}

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};



fs
    .readdirSync(__dirname)
    .filter(file =>

        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))

    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


