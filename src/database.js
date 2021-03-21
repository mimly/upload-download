const path = require('path'); //  Helps resolve relative paths, into absolute baths, independent of operating system
const databasePath = path.join(__dirname, 'db.sqlite');

const sequelizeEnabled = true;

if (sequelizeEnabled) {
    const { Sequelize, DataTypes } = require('sequelize');
    const db = new Sequelize({
      dialect: 'sqlite',
      storage: databasePath,
    });

    // Test connection
    db.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      }).catch(console.error);

    const Images = db.define('Images', {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      data: {
        type: DataTypes.BLOB,
      },
    }, {
      // Other model options go here
      timestamps: false,
    });

    Images.sync({ force: true });

    module.exports = { db, Images };
} else {
    const { Database } = require('sqlite3').verbose();
    const db = new Database(databasePath);

    db.serialize(() => {
      db.run('DROP TABLE IF EXISTS Images');
      db.run('CREATE TABLE Images (id INTEGER PRIMARY KEY AUTOINCREMENT, data BLOB)');
    });

    module.exports = { db };
}
