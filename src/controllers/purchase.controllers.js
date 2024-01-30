const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const { id } = req.user;
    const purchase = await Purchase.findAll({
        include: [{
            model: Product,
            include: [Image]
        }],
        where: {userId: id}
    });
    return res.json(purchase)
});


const create = catchError(async(req,res)=>{
    const productsCart = await ProductCart.findAll({ 
        where: { userId: req.user.id },
        attributes: ['quantity', 'userId', 'productId'],
        raw: true,
    });
    const purchases = await Purchase.bulkCreate(productsCart);
    await ProductCart.destroy({ where: { userId: req.user.id }})
    return res.json(purchases);
})

// const create = catchError(async(req,res)=>{
//     const { id } = req.user;
//     const productCart = await ProductCart.findAll({
//         where: {userId: id}
//     })
    
//     productCart.map(async prod =>{
//         const {id,quantity,userId,productId} = prod.dataValues
//         await Purchase.create({
//             quantity,
//             userId,
//             productId
//         })
//     })
//     await ProductCart.destroy({ where: {userId: id} });
//     return res.json({message: "Carrito comprado"});
// })

module.exports = {
    getAll,
    create
}