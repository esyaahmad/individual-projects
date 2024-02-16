const request = require('supertest')
const app = require('../app')
const {signToken} = require('../helpers/jwt')
const {sequelize} = require('../models');
const {hash} = require('../helpers/toBcrypt');

let access_token;
const payload = { 
    id: 1,
    email: 'esya@mail.com',
}

access_token = signToken(payload)


beforeAll( async () => {
    try {
        //seeding users
        const users = require('../data/users.json')
        let user = users.map((el) => {
            el.password = hash(el.password)
            el.createdAt = new Date()
            el.updatedAt = new Date()
            return el
         })
         await sequelize.queryInterface.bulkInsert('Users', user, {})
        
        

     //seeding categories
    const categories = require('../data/categories.json')
    let category = categories.map((el) => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
        return el
     })
     await sequelize.queryInterface.bulkInsert('Categories', category, {})
     
    } catch (error) {
        console.log(error);
    }
    })


//=================================================== READ(GET) ====================================================
describe("GET /categories", () => {
    describe("GET /categories - succeed", () => {
        test('should return array of object', async () => {
        
            let response = await request(app).get('/categories').set('Authorization', `Bearer ${access_token}`)
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('category', expect.any(Object))
        })
    })

    describe("GET /categories - error", () => {
        test('not logged in, should return an object with error message', async () => {
        
            let response = await request(app).get('/categories')
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Please login first')
        })
    })

    describe("GET /categories - error", () => {
        test('wrong access token, should return an object with error message', async () => {
        
            let response = await request(app).get('/categories').set('Authorization', `Bearer ${access_token}fnlkenk`)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Unauthorized')
        })
    })





})





    afterAll( async () => {
        await sequelize.queryInterface.bulkDelete('Users', null, {
            cascade:true,
            truncate: true,
            restartIdentity: true
        })
        await sequelize.queryInterface.bulkDelete('Categories', null, {
            cascade:true,
            truncate: true,
            restartIdentity: true
        })
    })



