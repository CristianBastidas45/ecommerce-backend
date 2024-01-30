const sequelize = require('../utils/connection');
const request = require('supertest')
const app = require('../app')

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const newUser = {
            firstName: "Cristian",
            lastName: "Bastidas",
            email: "cristianMigrate@gmail.com",
            password: "cristian12345",
            phone: "123456789"
        }
        await request(app).post('/users').send(newUser)
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();