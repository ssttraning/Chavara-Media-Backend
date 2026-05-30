const express = require('express')
const cors = require('cors')
var path = require('path');

const app = express()
const port = process.env.PORT || 3000

const insertmode = require('./Routes/insertmode')
const inserttype = require('./Routes/Insertype')
const insertcategory=require('./Routes/InsertCategory')
const getmode = require('./Routes/getmode')
const getcategory = require('./Routes/getcategory')
const gettype = require('./Routes/gettype')
const insertcourse = require('./Routes/insertcourse')
const deletemode = require('./Routes/deletemode')
const deletecategory = require('./Routes/deletecategory')
const deletetype = require('./Routes/deletetype')
const getcategorybyid = require('./Routes/getcategorybyid')
const categoryupdate = require('./Routes/categoryupdate')
const getmodebyid = require('./Routes/getmodebyid')
const modeupdate = require('./Routes/modeupdate')
const gettypebyid = require('./Routes/gettypebyid')
const typeupdate = require('./Routes/typeupdate')
const getcourse = require('./Routes/getcourse')
const getcoursebycategory = require('./Routes/getcoursebycategory')
const deletecourse = require('./Routes/deletecourse')
const getcoursebyid = require('./Routes/getcoursebyid')
const courseupdate = require('./Routes/courseupdate')
const addcoursematerial = require('./Routes/addcoursematerial')
const getcoursematerial = require('./Routes/getcoursematerial')
const getmaterialbycourseid = require('./Routes/getmaterialbycourseid')
const deletematerial = require('./Routes/deletematerial')
const getcoursematerialbyid = require('./Routes/getcoursematerialbyid')
const coursematerialupdate = require('./Routes/coursematerialupdate')

const uploadFile = require('./Routes/uploadFile')

// middleware FIRST
app.use(cors({
     origin: [
        'http://localhost:5173',
        'http://chavaramedia.santhisoft.com/'
    ]
}))
app.use(express.json())

// access uploaded files
// app.use('/uploads', express.static('./uploads'))
app.use(express.static(path.join(__dirname, 'public')));
global.__basedir = path.resolve(path.dirname(''));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//  routes

app.use('/insertmode', insertmode)
app.use('/inserttype', inserttype)
app.use('/insertcategory',insertcategory)
app.use('/getmode',getmode)
app.use('/getcategory',getcategory)
app.use('/gettype',gettype)
app.use('/insertcourse',insertcourse)
app.use('/deletemode',deletemode)
app.use('/deletecategory',deletecategory)
app.use('/deletetype',deletetype)
app.use('/getcategorybyid',getcategorybyid)
app.use('/categoryupdate',categoryupdate)
app.use('/getmodebyid',getmodebyid)
app.use('/modeupdate',modeupdate)
app.use('/gettypebyid',gettypebyid)
app.use('/typeupdate',typeupdate)
app.use('/getcourse',getcourse)
app.use('/getcoursebycategory',getcoursebycategory)
app.use('/deletecourse',deletecourse)
app.use('/getcoursebyid',getcoursebyid)
app.use('/courseupdate',courseupdate)
app.use('/addcoursematerial',addcoursematerial)
app.use('/getcoursematerial',getcoursematerial)
app.use('/getmaterialbycourseid',getmaterialbycourseid)
app.use('/deletematerial',deletematerial)
app.use('/getcoursematerialbyid',getcoursematerialbyid)
app.use('/coursematerialupdate',coursematerialupdate)

app.use('/uploadFile',uploadFile)

//  listen LAST
app.listen(port, () => {
    console.log("Server is running on port 3000")
})
app.get('/', (req, res) => {
    res.send("Backend is running successfully")
})