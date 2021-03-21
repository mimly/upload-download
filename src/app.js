const path = require('path');
const express = require('express');
const multer  = require('multer')
const upload = multer()
const { load, save } = require('./model');
const app = express();
const port = 8989;

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/image/:id', (req, res) => {
    load(req.params.id)
        .then((data) => {
            res.status(200).send(data);
        }).catch((e) => {
            if (e) console.error(e);

            res.status(404).end();
        });
});

app.post('/image', express.raw({ type: '*/*', limit: '100mb' }), (req, res) => {
    save(req.body)
        .then((id) => {
            res.status(200).send(id.toString());
        }).catch((e) => {
            if (e) console.error(e);

            res.status(400).end();
        });
});

app.post('/image-form', upload.single('file'), (req, res) => {
    console.log(req.body.description);
    save(req.file.buffer)
        .then((id) => {
            res.status(200).send(id.toString());
        }).catch((e) => {
            if (e) console.error(e);

            res.status(400).end();
        });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
