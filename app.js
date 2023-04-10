require('dotenv').config()
require('express-async-errors')
const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimiter=require('express-rate-limit')

const express=require('express')
const app=express()


 
const authRouter=require('./routes/auth')
const jobsRouter=require('./routes/jobs')
const authenticatedUser=require('./middleware/authentication')

const connectDB=require('./db/connect')


//connectDB

//middleware
const errorHandlerMiddleware=require('./middleware/errorHandlerMiddleware')
const notFound=require('./middleware/notFound')

app.set('trust proxy',1);
app.use(
    rateLimiter({
        windowMs:15*60*1000,
        max:100,
    })

    );


app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


// routes

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticatedUser,jobsRouter)

app.use(errorHandlerMiddleware)
app.use(notFound)


const port=process.env.PORT || 3000;


const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,
            console.log(`Server is running in port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}

start()