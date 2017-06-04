const express = require('express')
const GoogleImages = require('google-images');

const { mongoose } = require('./mongoose')
const { QUERIES } = require('./queries')

var app = express()
const port = process.env.PORT || 3000;
const baseURL = "https://fcc-img-src.herokuapp.com/"

const client = new GoogleImages('012018654353341728844:s_vdxhocsh0', 'AIzaSyCI7fbd92raffAsnCY8BJu7chIm_64N4RQ');

app.get('/', (req, res) => {
    res.send(`Example to use: ${baseURL}query/freecodecamp <br><hr>Check recents here: ${baseURL}recent?offset=1`)
})

app.get('/query/:search', (req, res) => {

    var result = [],
        q = req.params.search;

    if (!q || q == " ")
        res.send(400).send("Please enter a search query");

    client.search(q)
        .then((images) => {
            images.forEach((img) => {
                result.push({
                    url: img.url,
                    alt_text: img.description,
                    page_url: img.parentPage
                });
            })

            var query = new QUERIES({
                term: q,
                when: new Date().getTime()
            })
            query.save()

        })
        .then(() => {
            res.send(result);
        })
        .catch((e) => res.status(400).send(e))
})

app.get('/recent', (req, res) => {
    var offset = req.query.offset || 0;

    QUERIES.find().limit(10).skip(Number(offset) * 10)
        .then((qs) => {
            if (!qs.length)
                res.status(404).send({
                    error: "No data to fetch"
                })
            res.send(qs)
        })
        .catch((e) => res.status(400).send(e))
})


app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})