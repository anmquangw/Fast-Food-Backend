## The node.js Fast Foot app

![FastFoot](https://www.crushpixel.com/big-static19/preview4/fast-food-icon-3197849.jpg)

## Account {phone/pwd}:

```
Admin: {0000000000/admin}
User: {1111111111/user}
Lock-Account: {3333333333/lock}
```

## host: https://fast-food-dev.herokuapp.com/

## Postman: https://go.postman.co/workspace/Fast-Foot~8e214dbc-a845-44ca-9e16-d8a8f25b34e8/collection/15347075-196ad79f-4888-43ad-823c-5d0c4acddcb7?action=share&creator=15347075

## API endpoints:

- User:
  - GET: /api/user // get list of user [adminAuth]
  - POST: /api/user/signup (body -> All schema) // signup new user [noAuth]
  - POST: /api/user/signin (body -> {phone & password}) // signin for user [noAuth]
  - PUT: /api/user/status/:id (params -> id, body -> {status update}) // update status [admin, user, lock] for user [adminAuth]
  - PUT: /api/user/password // reset password [userAuth]
  - DELETE: /api/user/:id (params -> id) // lock an user [adminAuth]
- Statistic:
  - GET: /api/statistic (body -> All schema) // get statistic year, date, time [noAuth]
- Sales:
  - GET: /sales/code (query -> code) // check is the code [userAuth]
  - GET: /sales/ // get list [adminAuth]
  - GET: /sales/:id (params -> id) // get detail [adminAuth]
  - POST: /sales // create [adminAuth]
  - PUT: /sales/:id (params -> id) // update [adminAuth]
  - DELETE: /sales/:id (params -> id) // delete [adminAuth]
- Food:

  - GET: /api/food (query -> idFoodType) [noAuth]
    /\*\*

    - get list => [no param]
    - get list by food type => [idFoodType=idFoodType]
      \*\*/

  - GET: /api/food/orderRate // get list by order rate [noAuth]
  - GET: /api/food/:id // get detail [noAuth]
  - POST: /api/food (body -> All schema) create new // create [adminAuth]
  - PUT: /api/food/:id // update [adminAuth]
  - DELETE: /api/food/:id (params -> id) // delete [adminAuth]

- FoodType:
  - GET: /api/foodType [noAuth]
  - POST: /api/foodType (body -> All schema) create new [adminAuth]
  - PUT: /api/foodType/:id (params -> id) [adminAuth]
  - DELETE: /api/foodType/:id (params -> id) [adminAuth]
- Banner:
  - POST: /api/banner (body -> All schema) create new
  - GET: /api/banner
  - PUT: /api/banner/:id
  - DELETE: /api/banner/:id
- Order:
  - GET: /api/order // get list [userAuth]
  - GET: /api/order/:id // get order detail [userAuth]
  - POST: /api/order // create order [userAuth]
  - PUT: /api/order/:id // update status [adminAuth]
  - DELETE: /api/order/:id // delete order [userAuth]
- Cart:
  - GET: /api/cart // get list items [userAuth]
  - POST: /api/cart // add item [userAuth]
  - PUT: /api/cart/:id // update item [userAuth]
  - DELETE: /api/cart/:id // delete item [userAuth]

## Schema:

- User:
  - phone: string;
  - password: string;
  - role: string;
  - email: string;
  - first_name?: string;
  - last_name?: string;
  - address?: string;
  - avatar?: string;
  - birthOfDate?: Date;
  - sex?: boolean;
- Statistic:
  - from?: Date(yyyy-mm-dd);
  - to?: Date(yyyy-mm-dd);
- Sales:
  - code: string;
  - quantity: number;
  - description?: string;
  - img?: string;
- Food:
  - name: string;
  - idFoodType: Types.ObjectId;
  - price: number;
  - quantity: number;
  - description?: string;
  - img1?: string;
  - img2?: string;
  - img3?: string;
  - img4?: string;
  - img5?: string;
- FoodType:
  - name: string;
  - img?: string;
- Banner:
  - name: string;
  - image?: string;
- Order:
  - idUser: Types.ObjectId;
  - sum: number;
  - address: string;
  - name: string;
  - status: string;
  - idPayment?: Types.ObjectId;
  - note: string;
  - statusShip: string;
  - orderDetail:
    - `type: array`
    - `items: .OrderDetail`
- OrderDetail:
  - idOrder: Types.ObjectId;
  - idFood: Types.ObjectId;
  - quantity: number;

## Requirements

- Node 16.8.0
- yarn 1.22.10
- npm 7.21.1
- Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/***/Fast-Food-Backend.git
cd Fast-Food-Backend
```

```bash
npm install || npm i
or
yarn
```

## Steps for running server

Step 1: Setup enviroment

```bash
Development: Copy .env.example -> .env
Production: Config enviroment variale in setting host
```

Step 2: To start the backend server, run the following

````bash
``` production ```
npm start
or
yarn start

``` development ```
npm run dev
or
yarn dev
````

Step 3: For using API

```bash
Open [http://localhost:5000](http://localhost:5000) on brower or using postman to get API.
```
