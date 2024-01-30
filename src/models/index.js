const Category = require("./Category");
const Product = require("./Product");
const Image = require("./Image");
const User = require("./User");
const ProductCart = require("./ProductCart");
const Purchase = require("./Purchase");



Product.belongsTo(Category);
Category.hasMany(Product);

Image.belongsTo(Product);
Product.hasMany(Image);

User.hasMany(ProductCart);
ProductCart.belongsTo(User);

Product.hasMany(ProductCart);
ProductCart.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);


