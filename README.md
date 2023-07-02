[**HITEK INTERNSHIP EXAM | FRONT-END**](https://github.com/Hiu12902/nextjs-sourcebase-main)

---
Index
1. [Technical stack](#technical-stack)
2. [Implemented features](#implemented-features)
3. [How to run](#how-to-run)
4. [API docs](#api)
5. [Author](#author)
---

# Technical stack

NextJS | React-hook-form | Recoil | Ant-design | Vercel hosting

# Implemented features

1. **Authorization and Authentication**: There are two types of user, which can be normal user or master user.
   Normal user can view blogs and Master user can create/delete/update blogs.
2. **Blogs**: Blog page contains list of blogs, which can be paginated, normal user can view blog detail by clicking on it's title
3. **Blog details**: Blog details page contains detail information about blog, which includes title, description, content and a illustrated image about that blog.
4. **Dashboard**: Dashboard page contains list of blogs, which is similar to blogs page but this page belongs to master user. Mastar user can update blog details by clicking on blog's title. We can also create and delete blog.
5. **Responsive** (not completed yet, best experience when using screen size 1440px)
6. **JSON-server and JSON-server-auth**: This website uses JSON-server, which is a library allows front-end developers to create a quick back-end for prototyping and mocking. References:
   - [JSON-server](https://github.com/typicode/json-server)
   - [JSON-server-auth](github.com/jeremyben/json-server-auth)

# How to run

1. Clone this repository.
2. In order to generate fake database in **json** folder, we run:
```sh
cd json
npm install
```
and then we can use our fake JSON server at port 1209!

**Note**: Default username (password is the same with username) for normal user: normaluser@gmail.com and master user: masteruser@gmail.com

2.1. If you want to customized your own JSON server? No problem, create new folder and then:
```sh
npm init
npm install -D json-server json-server-auth
```
2.2. Create your own database inside ``` db.json ``` file. In ``` package.json ```, change the following line:
```sh
{
...
"start": "json-server db.json -m ./node_modules/json-server-auth --port 1209"
...
}
```
**Note**: You can change your server's port here!
2.3. After that, we can start our server using:
```sh
npm start
```

3. Finally, in the main repository, we run:
```sh
npm init
npm run dev 
```

# API 

By using JSON server we have a fake database that support:
### Register

Any of the following routes registers a new user :

- **`POST /register`**
- **`POST /signup`**
- **`POST /users`**

**`email`** and **`password`** are required in the request body :

```http
POST /register
{
  "email": "sampleUser@mail.com",
  "password": "samplePassword"
}
```

### Login

Any of the following routes logs an existing user in :

- **`POST /login`**
- **`POST /signin`**

**`email`** and **`password`** are required, of course :

```http
POST /login
{
  "email": "sampleUser@mail.com",
  "password": "samplePassword"
}
```

### Blog

The following routes allow us to create/update/delete blog:

- **`POST /blogs`**
- **`PUT /blogs/:id`**
- **`DELETE /blogs/:id`**

# Author

👤 Nguyễn Trí Hiếu
- [Github](https://github.com/Hiu12902/)