const express = require("express")
const app = express()

const Contenedor = require('./class/Contenedor')

const routerProd = express.Router()
const contenedor1 = new Contenedor()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', routerProd)

let vista = Boolean(true)

app.get('/', (req, res) => {
    vista = true
    res.render('pages/index', {vista});
})

routerProd
    .get('/', (req, res) => {
        vista = false
        const productos = contenedor1.getAll

        res.render('pages/index', {vista, productos});
    })
    .post('/', (req, res) => {
        // luego del guardado
        const { title, price, url } = req.body
        const nuevoProducto = contenedor1.save(title, price, url)
        vista = true

        res.render('pages/index', {vista, nuevoProducto});
    })

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))