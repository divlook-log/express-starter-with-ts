import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import lessMiddleware from 'less-middleware'
import logger from '@/middleware/logger'
import router from '@/routes'

let app = express()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(lessMiddleware(path.join(__dirname, '../public')))
app.use(express.static(path.join(__dirname, '../public')))
app.use(logger('log'))
app.use(router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

export default app
