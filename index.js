const express = require('express')
const cors = require('cors')
const route = require('./routes')
const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use(route)

app.get('/', (req, res) => {
    res.status(200).json({
        data: null,
        message: 'success'
    })
})

app.listen(port, () => console.log("Server run on http://localhost:"+port))