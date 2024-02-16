const request = require('supertest')
const app = require('../app')
const {signToken} = require('../helpers/jwt')
const {sequelize} = require('../models');
const {hash} = require('../helpers/toBcrypt')

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
        
        
    } catch (error) {
        console.log(error);
    }
    //  //seeding categories
    // const categories = require('../categories.json')
    // let category = users.map((el) => {
    //     el.createdAt = new Date()
    //     el.updatedAt = new Date()
    //     return el
    //  })
    //  await sequelize.queryInterface.bulkInsert('Users', category, {})
     
    //  //seeding cuisines
    //  const cuisines = require('../cuisines.json')
    //  let cuisine = users.map((el) => {
    //      el.createdAt = new Date()
    //      el.updatedAt = new Date()
    //      return el
    //   })
    //   await sequelize.queryInterface.bulkInsert('Users', cuisine, {})
    })

    //LOGIN
    
    describe("POST /login", () => {
        describe("POST /login - succeed", () => {
            test('should return an object with access token', async () => {
                const body = {
                    email : 'esya@mail.com',
                    password : '123456'
                }
                let response = await request(app).post('/login').send(body)
                expect(response.status).toBe(200)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty(
                    'access_token', expect.any(String) 
                )
            })
       })

       describe('POST /login - error', () => {
        test('email is empty, should return an object with error message', async () => {
            const body = {
                password : 'bakso'
            }
            let response = await request(app).post('/login').send(body)
            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'message', 'email is required'
            )
        })
       })

       describe('POST /login - error', () => {
        test('password is empty, should return an object with error message', async () => {
            const body = {
                email: 'esya@mail.com'
            }
            let response = await request(app).post('/login').send(body)
            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'message', 'password is required'
            )
        })
       })

       describe('POST /login - error', () => {
        test('email not registered, should return an object with error message', async () => {
            const body = {
                email: 'emailtidakada@mail.com',
                password: 'bakso'
            }
            let response = await request(app).post('/login').send(body)
            expect(response.status).toBe(404)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'message', 'Not found'
            )
        })
       })
       
       describe('POST /login - error', () => {
        test('email password not match, should return an object with error message', async () => {
            const body = {
                email: 'esya@mail.com',
                password: 'bakso123'
            }
            let response = await request(app).post('/login').send(body)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'message', 'Invalid email/password'
            )
        })
       })

    })

//register

describe("POST /register", () => {
    describe("POST /register - succeed", () => {
        test('should return an object contain new user', async () => {
            const body = {
                email : 'jordan@mail.com',
                password : 'bakso'
            }
            let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}`).send(body)
            expect(response.status).toBe(201)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'email', expect.any(String) 
            )
        })
   })

   describe('POST /register - error', () => {
    test('email is empty/null, should return an object with error message', async () => {
        const body = {
            password : 'bakso',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}`).send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', "email cannot be null"
        )
    })
   })

   describe('POST /register - error', () => {
    test('password is empty/null, should return an object with error message', async () => {
        const body = {
            email : 'jordan@mail.com',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}`).send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', "password cannot be null"
        )
    })
   })

   describe('POST /register - error', () => {
    test('email is empty string, should return an object with error message', async () => {
        const body = {
            email : '',
            password : 'bakso',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}`).send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', " email cannot be empty"
        )
    })
   })

   describe('POST /register - error', () => {
    test('password is empty string, should return an object with error message', async () => {
        const body = {
            email : 'jordan@mail.com',
            password : '',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}`).send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', "password cannot be empty"
        )
    })
   })

   describe('POST /register - error', () => {
    test('email already registered, should return an object with error message', async () => {
        const body = {
            email : 'esya@mail.com',
            password : 'bakso',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}`).send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', "Email already exists"
        )
    })
   })

   describe('POST /register - error', () => {
    test('wrong format email, should return an object with error message', async () => {
        const body = {
            email : 'esya',
            password : 'bakso',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}`).send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', "wrong format email"
        )
    })
   })

   describe('POST /register - error', () => {
    test('empty access token, should return an object with error message', async () => {
        const body = {
            email : 'esya@mail.com',
            password : 'bakso',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', expect.any(String)
        )
    })
   })

   describe('POST /register - error', () => {
    test('wrong access token, should return an object with error message', async () => {
        const body = {
            email : 'esya@mail.com',
            password : 'bakso',
            phoneNumber: '99898989',
            address: 'Purwakarta'
        }
        let response = await request(app).post('/register').set('Authorization', `Bearer ${access_token}8ysyuhui`).send(body)
        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty(
            'message', expect.any(String)
        )
    })
   })
})

    afterAll( async () => {
        await sequelize.queryInterface.bulkDelete('Users', null, {
            cascade:true,
            truncate: true,
            restartIdentity: true
        })
    })




