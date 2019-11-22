const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const chalk = require('chalk')
const cors = require('cors')
const morgan = require('morgan')

app.use(cors('*'))
app.use(morgan("dev"))

const userRoutes = require('./routes/userRouter')
const eventRoutes = require('./routes/eventRouter')

app.use('/events', eventRoutes)
app.use('/users', userRoutes)

mongoose.connect(process.env.DBURI, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log(chalk.yellow('Database connection success'))
})

app.listen(process.env.PORT, ()=>{
    console.log(chalk.blue(`app listening to port ${process.env.PORT}`))
})