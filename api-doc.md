
# OPE API Documentation

## Models :

_User_
- Id: primary
- email: string (validation: required, unique, email format)
- password: string (validation: required, length min 5) wajib di-hash


_Category_
- id: primary
- name: string (validation: required)

_Product_
- id: primary
- title: string (validation: required)
- description: string (validation: required)
- imageUrl: string (validation: required)
- createdAt: date
- updatedAt: date
- categoryld: integer (validation: required)
- userld: integer (validation: required)

## List of available endpoints:
​
- `POST /login`
- `POST /register`
- `POST /google-login`

- `GET /projects`
- `GET /projects/:id`
- `GET /projects-user`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`
- `PATCH /projects/:id`

- `POST /categories`
- `GET /categories`


&nbsp;

## 1. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found"
}
```

&nbsp;

## 2. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
}
```


_Response (201 - Created)_

```json
{
    "email": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": " email cannot be empty"
}
OR
{
  "message": "email cannot be null"
}
OR
{
  "message": "wrong format email"
}
OR
{
  "message": "Email already exists"
}
OR
{
  "message": "password cannot be empty"
}
OR
{
  "message": "password cannot be null"
}
OR
{
  "message": "The password length should be minimum 5 characters "
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
OR
{
  "message": "Unauthorized"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You have no access"
}
```

&nbsp;

## 3. GET /projects

Description: Get all projects from database

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "projects": {
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "categoryId": 1,
    "auserId": 1
  }
  ...
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
OR
{
  "message": "Unauthorized"
}
```

&nbsp;

## 4. GET /projects/:id

Description: Get one project by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "project": {
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "categoryId": 1,
    "authorId": 1
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
OR
{
  "message": "Unauthorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

&nbsp;

## 5. POST /projects/:id

Description: Edit properties of one project by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "title": "string",
  "description": "string",
  "imageUrl": "integer",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "project": {
    "title": "string",
    "description": "string",
    "imageUrl": "integer",
    "categoryId": "integer",
    "authorId": "integer"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name cannot be empty"
}
OR
{
  "message": "Name cannot be null"
}
OR
{
  "message": "Description cannot be empty"
}
OR
{
  "message": "Description cannot be null"
}
OR
{
  "message": "Price cannot be empty"
}
OR
{
  "message": "Price cannot be null"
}
OR
{
  "message": "Minimal price is 2000!"
}
OR
{
  "message": "Image Url cannot be empty"
}
{
  "message": "Image Url cannot be null"
}
OR
{
  "message": "Invalid Data Type"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"

}
OR
{
  "message": "Unauthorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```
&nbsp;

## 6. PUT /projects/:id

Description: Edit properties of one project by id

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "imageUrl": "integer",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "project": {
    "title": "string",
    "description": "string",
    "imageUrl": "integer",
    "categoryId": "integer",
    "authorId": "integer"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name cannot be empty"
}
OR
{
  "message": "Name cannot be null"
}
OR
{
  "message": "Description cannot be empty"
}
OR
{
  "message": "Description cannot be null"
}
OR
{
  "message": "Price cannot be empty"
}
OR
{
  "message": "Price cannot be null"
}
OR
{
  "message": "Minimal price is 2000!"
}
OR
{
  "message": "Image Url cannot be empty"
}
{
  "message": "Image Url cannot be null"
}
OR
{
  "message": "Invalid Data Type"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"

}
OR
{
  "message": "Unauthorized"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not Found"
}
```

&nbsp;

## 7. DELETE /projects/:id

Description: Delete one project from database

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```
- params:
```json
{
  "id": "integer"
}
```
_Response (200 - OK)_
```json
{
  "message": "<project name> success to delete!"
}
```

Response (401 - Unauthorized)
```json
{
  "message": "Please login first"
}
```
OR
```json
{
  "message": "Unauthorized"
}
```

Response (403 - Forbidden)
```json
{
  "message": "You don't have access"
}
```


Response (404 - Not Found)
```json
{
  "message": "Not Found"
}
```

## 9. POST /categories

Request:

- body:

```json
{
  "name": "string"
}
```

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name cannot be empty"
}
OR
{
  "message": "name cannot be null"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
OR
{
  "message": "Unauthorized"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You have no access"
}
```

&nbsp;

## 10. GET /categories

Description:
- Get all categories from database

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - Ok)_

```json
[
    {
        "id" : 1,
        "name" : "string"
    },
  ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
OR
{
  "message": "Unauthorized"
}
```
&nbsp;

## 11. PUT /categories

Request:

- body:

```json
{
  "name": "string"
}
```

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name cannot be empty"
}
OR
{
  "message": "name cannot be null"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please login first"
}
OR
{
  "message": "Unauthorized"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You have no access"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Not found"
}
```

&nbsp;



&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```