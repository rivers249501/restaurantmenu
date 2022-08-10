const express = require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')
const { globalErrorHandler } = require('./controllers/globalErrorHandler')
const { menusRouter } = require('./routes/menus.routes')
const { adminUsersRouter } = require('./routes/adminusers.routes')
const { AppError } = require('./util/AppError')

//swagger
const swaggerSpec ={
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Node pgAdmin API',
            version: '1.0.0'
        },
        servers: [
            {
                url: "http://localhost:4000"
            }

        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

//middlewares

const app = express()

app.use(express.json())
app.use('/api/v1/menus', menusRouter)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('/api/v1/adminuser', adminUsersRouter)
app.use('*', (req,res,next) => {
    next(new AppError(404, "The `${req.originalUrl}` does not found in this server."))
})

app.use(globalErrorHandler)
//app.use((err, req, res, next) => {
//    res.status(err.statusCode).json({
//        status: err.status,
//        message: err.message,
//        stack: err.stack
//    })
//})

module.exports = { app }