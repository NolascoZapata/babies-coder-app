
const ProdDao = require('./../models/daos/Product.dao')
const products = new ProdDao()
const categories = ['baby','boy','girl']

const getProdController = async (req,res,next)=>{
    try {
        const prods = await products.getAll()
        console.log('info','[GET]==> Get Products')
        res.json(prods)
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}

const getProdByParam = async(req,res,next)=>{
    let {params} = req.params
    let p = categories.find(cat=>cat===params)
    if (p !== undefined){
        //getProdByCategoryController
        try {
            const prods = await products.getProdByCategory(params)
            console.log('info',`[GET]==> Get Products By Category ${params}`)
            res.json(prods)
        } catch (error) {
            console.log('error',error.message)
            next(error)
        }
    } else {
        //getProdByIdController
        try {
            const prod = await products.getById(params)
            console.log('info',`[GET]==> Get Product with id '${params}'`)
            res.json(prod)
        } catch (error) {
            console.log('error',error.message)
            next(error)
        }
    }
}

const saveProdController = async (req,res,next)=>{
    try {
        const newprod = await products.createProduct(req.body)
        console.log('info','[POST]==> Product saved')
        res.json(newprod)
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}
const updateProdController= async(req,res,next)=>{
    try {
        const {id} = req.params.id
        await products.model.findOne({id})
                .then((prod)=>{
                    prod.name=req.body.name;
                    prod.price=req.body.price;
                    prod.size=req.body.size;
                    prod.imgDir=req.body.imgDir;
                    prod.category=req.body.category;
                    prod.stock=req.body.stock;
                    prod.timestamp= new Date()
                    prod.save()
                        .then(()=>{
                            console.log('info','[PUT]==> Product updated')
                            res.json({prod})
                            
                        })
                })
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}
const deleteProdController = async (req,res,next)=>{
    try {
        const {id} = req.params
        const deletedProd = await products.model.deleteOne({_id:id})
        console.log('info',`[DELETE]==> Product with id ${id}`)
        res.json(deletedProd)
    } catch (error) {
        console.log('error',error.message)
        next(error)
    }
}


module.exports = {
    getProdController,
    updateProdController,
    deleteProdController,
    saveProdController,
    getProdByParam,
    products
}