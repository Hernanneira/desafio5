const express = require('express')
const app = express()
const Contenedor = require('./controllers/Contenedor')
const { Router } = express
const routerProductos = new Router()
const ProductoController = new Contenedor('productos.json')


app.set('view engine', 'ejs')
app.set('views', './views');

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/api/productos', routerProductos)

let vista = Boolean(true)
//CRUD
app.get('/', (req, res) => {
    vista = true
    res.render('pages/index', {vista});
})

app.get('/productos', async (req, res, next) =>{
    vista = false
    const productos = await ProductoController.getAll()
    console.log(productos)
    res.render('pages/index',{vista, productos})
})

routerProductos.get('/:id', async (req,res,next) => {
    vista = false
    const { id } = req.params
    const productos = await ProductoController.getById(id)
    res.render('pages/index',{vista, productos})
})

routerProductos.post('/', async (req, res, next) => {
    vista = false
    const { title, price, thumbnail } = req.body
    const newProducto = await ProductoController.save(title, price, thumbnail)
    console.log(newProducto)
    const productos = await ProductoController.getAll()
    res.render('pages/index', {vista, productos})
})

routerProductos.put('/:id',async (req, res, next) => {
    vista = false
    const { title, price, thumbnail } = req.body
    const { id } = req.params;
    const upDateProducto = await ProductoController.update(title, price, thumbnail,id)
    console.log(upDateProducto)
    const productos = await ProductoController.getAll()
    res.render('pages/index', {vista, productos})
})

routerProductos.delete('/:id', async (req, res, next) => {
    vista = false
    const { id } = req.params;
    const deleteProducto = await ProductoController.deleteById(id)
    console.log(deleteProducto)
    const productos = await ProductoController.getAll()
    res.render('pages/index', {vista, productos})
})

//Server
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
