const { db, Images } = require('./database');

// exports.load = (id) => {
//     return new Promise((resolve, reject) => {
//         db.get('SELECT * FROM Images WHERE id = ?', id, function (err, row) {
//             if (err) reject(err);
//
//             if (row) {
//                 resolve(row.data);
//             } else {
//                 reject();
//             }
//         });
//     });
// };

exports.load = (id) => Images.findByPk(id).then((image) => image.data);

// exports.save = (data) => {
//     return new Promise((resolve, reject) => {
//         db.run('INSERT INTO Images (data) VALUES (?)', data, function (err) {
//             if (err) reject(err);
//
//             resolve(this.lastID);
//         });
//     });
// };

exports.save = (data) => Images.create({ data }).then((image) => image.id);
