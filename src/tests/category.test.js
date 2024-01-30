const request = require('supertest');
const app = require('../app');

let id;
let token;


beforeAll(async()=>{
    const credencials ={
        email: "cristianMigrate@gmail.com",
        password: "cristian12345",
    }
    const res = await request(app).post('/users/login').send(credencials);
    token = res.body.token;
})

test("GET /categories obtiene todas las categorias", async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories debe crear una categoria', async () => {
    const newCategory = {
        name: "smartphone prueba"
    }
    const res = await request(app)
        .post('/categories')
        .send(newCategory)
        .set('Authorization',`Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newCategory.name);
});

test("PUT /categories/:id debe modificar una categoria", async () => {
    const category = {
        name: "smartphone actualizado"
    }
    const res = await request(app)
        .put(`/categories/${id}`)
        .send(category)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
});

test("DELETE /categories/:id debe eliminar una categoria", async () => {
    const res = await request(app)
        .delete(`/categories/${id}`)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});