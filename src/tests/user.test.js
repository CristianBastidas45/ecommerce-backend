const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users debe crear un usuario', async () => {
    const newUser = {
        firstName: "Cristian",
        lastName: "Bastidas",
        email: "cristianprueba@gmail.com",
        password: "cristian12345",
        phone: "123456789"
    }
    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST /users/login debe logear un usuario', async () => {
    const credentials = {
        email: "cristianprueba@gmail.com",
        password: "cristian12345",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(credentials.email);
    expect(res.body.token).toBeDefined();
});

test('POST /users/login con credenciales incorrectas', async () => {
    const credentials = {
        email: "cristianpruebaError@gmail.com",
        password: "cristian123456",
    }
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);
});

test("GET /users obtiene todos los usuarios", async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("PUT /users/:id debe modificar un usuario", async () => {
    const user = {
        firstName: "Camilo"
    }
    const res = await request(app)
        .put(`/users/${id}`)
        .send(user)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});