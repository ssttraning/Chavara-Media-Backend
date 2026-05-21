const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

const insertmode = require('./Routes/insertmode')
const inserttype = require('./Routes/Insertype')
const insertcategory=require('./Routes/InsertCategory')
const getmode = require('./Routes/getmode')
const getcategory = require('./Routes/getcategory')
const gettype = require('./Routes/gettype')
const insertcourse = require('./Routes/insertcourse')

// middleware FIRST
app.use(cors({
     origin: [
        'http://localhost:5173',
        'http://chavaramedia.santhisoft.com/'
    ]
}))
app.use(express.json())

//  routes

app.use('/insertmode', insertmode)
app.use('/inserttype', inserttype)
app.use('/insertcategory',insertcategory)
app.use('/getmode',getmode)
app.use('/getcategory',getcategory)
app.use('/gettype',gettype)
app.use('/insertcourse',insertcourse)



//  listen LAST
app.listen(port, () => {
    console.log("Server is running on port 3000")
})
app.get('/', (req, res) => {
    res.send("Backend is running successfully")
})