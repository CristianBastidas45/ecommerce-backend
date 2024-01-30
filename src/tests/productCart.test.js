const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models')

let token;

beforeAll(async()=>{
    const credencials ={
        email: "cristianMigrate@gmail.com",
        password: "cristian12345",
    }
    const res = await request(app).post('/users/login').send(credencials);
    token = res.body.token;
});

test("GET /cart obtiene todas los productos del carrito", async () => {
    const res = await request(app)
        .get('/cart')
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart debe crear un producto del carrito', async () => {
    const product = await Product.create({
        title: "galaxi prueba",
        description: "memoria ram camara",
        brand: "SamSung",
        price: 550,
    })
    const newProductCart = {
        quantity: 2,
        productId: product.id
    }
    const res = await request(app)
        .post('/cart')
        .send(newProductCart)
        .set('Authorization',`Bearer ${token}`);
    id = res.body.id;
    product.destroy()
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(newProductCart.quantity);
});

test("PUT /cart/:id debe modificar un producto del carrito", async () => {
    const productCart = {
        quantity: 3
    }
    const res = await request(app)
        .put(`/cart/${id}`)
        .send(productCart)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(productCart.quantity);
});

test("DELETE /cart/:id debe eliminar un producto del carrito", async () => {
    const res = await request(app)
        .delete(`/cart/${id}`)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});