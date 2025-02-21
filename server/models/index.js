'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// 🔹 确保 Sequelize 读取的是正确的环境配置
console.log("🔍 Environment:", env);

const config = require(__dirname + '/../config/config.json')[env];

// 🔹 打印 `config` 确保它被正确加载
console.log("🔍 Loaded Config:", config);

const db = {};

let sequelize;
if (config.dialect === 'sqlite') {
  // SQLite 只需要传入 storage
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: config.storage,
    logging: console.log, // 方便 Debug SQL 查询
  });
} else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 🔹 打印 Sequelize 连接信息，确保 `storage` 不为空
console.log("🔍 Connected DB (Sequelize Storage):", sequelize.options.storage);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
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
