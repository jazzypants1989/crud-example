console.log('May Node be with you')
const express = require('express')
const res = require('express/lib/response')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://USERNAME:PASSWORD@cluster0.ftizc.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
    console.log('Connected to database.')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.use(bodyParser.urlencoded({ extended: true}))

    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => (
                console.log(results)
            ))
            .catch(error => console.log(error))
        res.sendFile(__dirname + '/index.html')
})

    app.post('/quotes',(req,res) => {
    quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.log(error))
    })

    app.listen(3001, function(){
        console.log('listening on 3001')
    })
    
})
    .catch(error => console.error(error))
