const express = require("express")
const handlebars = require('express-handlebars')
const Contenedor = require('./class/Contenedor')
const app = express()
const routerProd = express.Router()
const contenedor1 = new Contenedor()

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', routerProd)
app.get('/', (req, res) => {
    res.render('form');
})

routerProd
.get('/', (req, res) => {
    const productos = contenedor1.getAll

    res.render('table', {productos});
})
.post('/', (req, res) => {
    // luego del guardado
    const { title, price, url } = req.body
    const nuevoProducto = contenedor1.save(title, price, url)

    res.render('form');
})

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))