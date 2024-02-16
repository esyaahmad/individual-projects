const request = require('supertest')
const app = require('../app')
const {signToken} = require('../helpers/jwt')
const {sequelize} = require('../models');
const {hash} = require('../helpers/toBcrypt');

// //buat testing PATCH
// const path = require('path')
// const fs = require('fs')
// const filePath = path.resolve(__dirname,'../meme.png')
// const imageBuffer = fs.readFileSync(filePath)

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
     
     //seeding projects
     const projects = require('../data/projects.json')
     let project = projects.map((el) => {
         el.createdAt = new Date()
         el.updatedAt = new Date()
         return el
      })
      await sequelize.queryInterface.bulkInsert('Projects', project, {})
    } catch (error) {
        console.log(error);
    }
    })

//CREATE(POST)

    describe("POST /projects", () => {
        describe("POST /projects - succeed", () => {
            test.only('should return an object contain new project', async () => {
                const body = {
                    title : "nasi padang",
                    description : "nasgor", 
                    imageUrl : "hahahahaha",
                    categoryId : 1,
                    userId : 1
                }
                let response = await request(app).post('/projects').set('Authorization', `Bearer ${access_token}`).send(body)
                expect(response.status).toBe(201)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty(
                    'name', expect.any(String) 
                )
            })
       })

       describe("POST /projects - error", () => {
        test('not logged in, should return an object with error message', async () => {
            const body = {
                name : "nasi padang",
                description : "nasgor", 
                price : 20000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).post('/projects').send(body)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'message', 'Please login first' 
            )
        })
   })

    describe("POST /projects - error", () => {
        test('wrong access token, should return an object with error message', async () => {
            const body = {
                name : "nasi padang",
                description : "nasgor", 
                price : 20000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).post('/projects').set('Authorization', `Bearer ${access_token}heiuwhri`).send(body)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'message', 'Unauthorized' 
            )
        })
    })

    describe("POST /projects - error", () => {
        test('name is empty, should return an object with error message', async () => {
            const body = {
                name : "",
                description : "nasgor", 
                price : 20000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).post('/projects').set('Authorization', `Bearer ${access_token}`).send(body)
            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty(
                'message', 'name cannot be empty' 
            )
        })
    })
})


//READ(GET)
    describe("GET /projects", () => {
        describe("GET /projects - succeed", () => {
            test('should return array of object contain all project', async () => {
            
                let response = await request(app).get('/projects').set('Authorization', `Bearer ${access_token}`)
                expect(response.status).toBe(200)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('project', expect.any(Object))
            })
        })
    })

    describe("GET /projects", () => {
        describe("GET /projects - error", () => {
            test('not logged in, should return an object with error message', async () => {
            
                let response = await request(app).get('/projects')
                expect(response.status).toBe(401)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('message', 'Please login first')
            })
        })
    })

    describe("GET /projects", () => {
        describe("GET /projects - error", () => {
            test('wrong access token, should return an object with error message', async () => {
            
                let response = await request(app).get('/projects').set('Authorization', `Bearer ${access_token}9u9ehwfuh`)
                expect(response.status).toBe(401)
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('message', 'Unauthorized')
            })
        })
    })


//=================================== READ DETAIL ===================================================\\
describe("GET /projects/:id", () => {
    describe("GET /projects/:id - succeed", () => {
        test('should return object contain project with matching params id', async () => {
            let id = 1
            let response = await request(app).get(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`)
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('name', expect.any(String))
        })
    })

    describe("GET /projects/:id - error", () => {
        test('not logged in, should return an object with error message', async () => {
            let id = 1
            let response = await request(app).get(`/projects/${id}`)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Please login first')
        })
    })

    describe("GET /projects/:id - error", () => {
        test('wrong access token, should return an object with error message', async () => {
            let id = 1
            let response = await request(app).get(`/projects/${id}`).set('Authorization', `Bearer ${access_token}iejwfjijo`)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Unauthorized')
        })
    })

    describe("GET /projects/:id - error", () => {
        test('params id not registered, should return an object with error message', async () => {
            let id = 10
            let response = await request(app).get(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`)
            expect(response.status).toBe(404)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'error not found')
        })
    })
})

//=================================== UPDATE PUT ===================================================\\
    
describe("PUT /projects/:id", () => {
    describe("PUT /projects/:id - succeed", () => {
        test('should return object contain req.body property', async () => {
            let id = 1
            const body = {
                name : "bakso",
                description : "bakso komplit", 
                price : 20000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).put(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`).send(body)
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('name', expect.any(String))
        })
    })

    describe("PUT /projects/:id - error", () => {
        test('not logged in, should return an object with error message', async () => {
            let id = 1
            const body = {
                name : "bakso",
                description : "bakso komplit", 
                price : 20000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).put(`/projects/${id}`).send(body)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Please login first')
        })
    })

    describe("PUT /projects/:id - error", () => {
        test('wrong access token, should return an object with error message', async () => {
            let id = 1
            const body = {
                name : "bakso",
                description : "bakso komplit", 
                price : 20000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).put(`/projects/${id}`).set('Authorization', `Bearer ${access_token}igiugiug`).send(body)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Unauthorized')
        })
    })

    describe("PUT /projects/:id - error", () => {
        test('params id not registered, should return an object with error message', async () => {
            let id = 10
            const body = {
                name : "bakso",
                description : "bakso komplit", 
                price : 20000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).put(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`).send(body)
            expect(response.status).toBe(404)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Not found')
        })
    })

    describe("PUT /projects/:id - error", () => {
        test('params id not match authorId with role = Staff, should return an object with error message', async () => {
            let id = 1
            const body = {
                name : "bakso",
                description : "bakso komplit", 
                price : 200000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).put(`/projects/${id}`).set('Authorization', `Bearer ${access_token_staff}`).send(body)
            expect(response.status).toBe(403)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'You have no access')
        })
    })

    describe("PUT /projects/:id - error", () => {
        test('name is empty, should return an object with error message', async () => {
            let id = 1
            const body = {
                name : "",
                description : "bakso komplit", 
                price : 200000,
                imgUrl : "hahahahaha",
                categoryId : 1,
                authorId : 1
            }
            let response = await request(app).put(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`).send(body)
            expect(response.status).toBe(400)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'name cannot be empty')
        })
    })
})


//========================================= UPDATE (PATCH) ===================================================

// describe("PATCH /projects/:id", () => {
//     describe("PATCH /projects/:id - succeed", () => {
//         test('should return object with message', async () => {
//             let id = 1
//             let response = await request(app).patch(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`).attach("file", imageBuffer, 'meme.png')
//             expect(response.status).toBe(200)
//             expect(response.body).toBeInstanceOf(Object)
//             expect(response.body).toHaveProperty('message', expect.any(String))
//         })
//     })

//     describe("PATCH /projects/:id - error", () => {
//         test('not logged in, should return object with error message', async () => {
//             let id = 1
//             let response = await request(app).patch(`/projects/${id}`).attach("file", imageBuffer, 'meme.png')
//             expect(response.status).toBe(401)
//             expect(response.body).toBeInstanceOf(Object)
//             expect(response.body).toHaveProperty('message', "Please login first")
//         })
//     })

//     describe("PATCH /projects/:id - error", () => {
//         test('wrong access token, should return object with error message', async () => {
//             let id = 1
//             let response = await request(app).patch(`/projects/${id}`).set('Authorization', `Bearer ${access_token}jsankdsa`).attach("file", imageBuffer, 'meme.png')
//             expect(response.status).toBe(401)
//             expect(response.body).toBeInstanceOf(Object)
//             expect(response.body).toHaveProperty('message', "Unauthorized")
//         })
//     })

//     describe("PATCH /projects/:id - error", () => {
//         test('params id not registered, should return object with error message', async () => {
//             let id = 10
//             let response = await request(app).patch(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`).attach("file", imageBuffer, 'meme.png')
//             expect(response.status).toBe(404)
//             expect(response.body).toBeInstanceOf(Object)
//             expect(response.body).toHaveProperty('message', "Not found")
//         })
//     })

//     describe("PATCH /projects/:id - error", () => {
//         test('params id not match authorId with role = Staff, should return object with error message', async () => {
//             let id = 1
//             let response = await request(app).patch(`/projects/${id}`).set('Authorization', `Bearer ${access_token_staff}`).attach("file", imageBuffer, 'meme.png')
//             expect(response.status).toBe(403)
//             expect(response.body).toBeInstanceOf(Object)
//             expect(response.body).toHaveProperty('message', "You have no access")
//         })
//     })



  
//     describe("PATCH /projects/:id - error", () => {
//         test('invalid data type, should return object with error message', async () => {
//             let id = 1
//             let response = await request(app).patch(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`).attach("file", imageBuffer, true)
//             expect(response.status).toBe(400)
//             expect(response.body).toBeInstanceOf(Object)
//             expect(response.body).toHaveProperty('message', "Invalid data type")
//         })
//     })
// })

//======================================= DELETE ========================================

describe("DELETE /projects/:id", () => {
    describe("DELETE /projects/:id - succeed", () => {
        test('should return object with message', async () => {
            let id = 1
            let response = await request(app).delete(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`)
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })

    describe("DELETE /projects/:id - error", () => {
        test('not logged in, should return an object with error message', async () => {
            let id = 1
            let response = await request(app).delete(`/projects/${id}`)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Please login first')
        })
    })

    describe("DELETE /projects/:id - error", () => {
        test('wrong access token, should return an object with error message', async () => {
            let id = 1
            let response = await request(app).delete(`/projects/${id}`).set('Authorization', `Bearer ${access_token}sndlsnan`)
            expect(response.status).toBe(401)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Unauthorized')
        })
    })

    describe("DELETE /projects/:id - error", () => {
        test('params id not registered, should return an object with error message', async () => {
            let id = 10
            let response = await request(app).delete(`/projects/${id}`).set('Authorization', `Bearer ${access_token}`)
            expect(response.status).toBe(404)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Not found')
        })
    })

    // describe("DELETE /projects/:id - error", () => {
    //     test('params id not match authorId with role = Staff, should return an object with error message', async () => {
    //         let id = 2
    //         let response = await request(app).delete(`/projects/${id}`).set('Authorization', `Bearer ${access_token_staff}`)
    //         expect(response.status).toBe(403)
    //         expect(response.body).toBeInstanceOf(Object)
    //         expect(response.body).toHaveProperty('message', 'You have no access')
    //     })
    // })
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

        await sequelize.queryInterface.bulkDelete('Projects', null, {
            cascade:true,
            truncate: true,
            restartIdentity: true
        })
    })