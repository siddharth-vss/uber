<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Prisma

This project uses Prisma as the ORM (Object-Relational Mapping) tool. Prisma helps in managing the database schema and performing database operations.

### Prisma Schema

The Prisma schema is defined in the `prisma/schema.prisma` file. It includes the data models and their relations.

### Migrations

Database migrations are managed using Prisma Migrate. The migration files are located in the `prisma/migrations` directory.

To create a new migration, run:
```bash
$ npx prisma migrate dev --name <migration_name>
```

To apply pending migrations, run:
```bash
$ npx prisma migrate deploy
```

### Prisma Client

The Prisma Client is generated based on the schema and is used to interact with the database. It is generated in the `node_modules/.prisma/client` directory.

To generate the Prisma Client, run:
```bash
$ npx prisma generate
```

### Environment Variables

The database connection URL and other environment variables are defined in the `.env` file.

#### Example `.env` file

```properties
DATABASE_URL='postgresql://username:password@host:port/database?sslmode=require'
```

## Database Tables and Models

The database schema is defined using Prisma models in the `prisma/schema.prisma` file. Below are the main models and their corresponding tables:

### User Model

The `User` model represents the users of the application. It is mapped to the `User` table in the database.

```prisma
model User {
  id             String       @id @default(uuid())
  fullname       Json         // JSON field to store { firstname, lastname }
  email          String       @unique
  password_hash  String
  source         String
  socketId       String
  rides          Ride[]
}
```

### Captain Model

The `Captain` model represents the captains (drivers) of the application. It is mapped to the `Captain` table in the database.

```prisma
model Captain {
  id             String       @id @default(uuid())
  fullname       Json         // JSON field to store { firstname, lastname }
  email          String       @unique
  password_hash  String
  source         String
  socketId       String
  status         Status       @default(inactive)
  vehicle        Json
  location       Json
  rides          Ride[]
}
```

### BlacklistToken Model

The `BlacklistToken` model represents tokens that have been blacklisted. It is mapped to the `BlacklistToken` table in the database.

```prisma
model BlacklistToken {
  id          String       @id @default(uuid())
  token       String       @unique
  createdAt   DateTime     @default(now())
}
```

### Ride Model

The `Ride` model represents the rides in the application. It is mapped to the `Ride` table in the database.

```prisma
model Ride {
  id             String       @id @default(uuid())
  user           User         @relation(fields: [userId], references: [id])
  userId         String
  captain        Captain      @relation(fields: [captainId], references: [id])
  captainId      String
  pickup         String
  destination    String
  fare           Int
  status         RideStatus   @default(pending)
  duration       Int
  distance       Int
  paymentId      String
  orderId        String
  signature      String
  createdAt      DateTime     @default(now())
  otp            String
}
```

### Enums

The schema also defines several enums used in the models.

#### Status Enum

Represents the status of a captain.

```prisma
enum Status {
  active
  inactive
}
```

#### RideStatus Enum

Represents the status of a ride.

```prisma
enum RideStatus {
  pending
  accepted
  ongoing
  completed
  cancelled
}
```

#### VehicleType Enum

Represents the type of vehicle.

```prisma
enum VehicleType {
  car
  bike
  auto
}
```

## UserService

The `UserService` is responsible for handling operations related to users. It uses the Prisma Client to interact with the database.

### Methods

#### `user`

Fetches a single user by a unique identifier.

```typescript
async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>
```

- **Parameters**: `userWhereUniqueInput` - An object containing the unique identifier of the user.
- **Returns**: A `User` object if found, otherwise `null`.

#### `users`

Fetches multiple users based on the provided parameters.

```typescript
async users(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}): Promise<User[]>
```

- **Parameters**:
  - `skip` (optional): Number of records to skip.
  - `take` (optional): Number of records to fetch.
  - `cursor` (optional): Cursor for pagination.
  - `where` (optional): Filter conditions.
  - `orderBy` (optional): Sorting order.
- **Returns**: An array of `User` objects.

#### `createUser`

Creates a new user.

```typescript
async createUser(data: Prisma.UserCreateInput): Promise<User>
```

- **Parameters**: `data` - An object containing the user data.
- **Returns**: The created `User` object.

#### `updateUser`

Updates an existing user.

```typescript
async updateUser(params: {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}): Promise<User>
```

- **Parameters**:
  - `where`: An object containing the unique identifier of the user to be updated.
  - `data`: An object containing the updated user data.
- **Returns**: The updated `User` object.

#### `deleteUser`

Deletes a user.

```typescript
async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>
```

- **Parameters**: `where` - An object containing the unique identifier of the user to be deleted.
- **Returns**: The deleted `User` object.

### Example Usage

Here is an example of how to use the `UserService` in a controller:

```typescript
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './services/user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.user({ id });
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.users({});
  }

  @Post()
  async createUser(@Body() userData: { name: string; email: string; password_hash: string; source: string; socketId: string }): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userData: { name?: string; email?: string; password_hash?: string; source?: string; socketId?: string }): Promise<User> {
    return this.userService.updateUser({ where: { id }, data: userData });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id });
  }
}
```

## Users Route

The `UserController` handles the routes related to users. Below are the available routes and their descriptions:

### GET /users

Fetches all users.

```typescript
@Get()
getUsers(): string {
  return 'Get all users';
}
```

### GET /users/profile

Fetches the profile of the currently logged-in user.

```typescript
@Get('/profile')
getUser() {
  return `Get user with id: `;
}
```

### GET /users/logout

Logs out the currently logged-in user.

```typescript
@Get('/logout')
logoutUser() {
  return `Get user with id: `;
}
```

### POST /users/login

Logs in a user with the provided email and password.

```typescript
@Post('/login')
loginUser() {
  return `Login user with email: `;
}
```

### POST /users/register

Registers a new user with the provided email and password.

```typescript
@Post('/register')
registerUser() {
  return `Register user with email: `;
}
```

### Example Usage

Here is an example of how to use the `UserController` in a client:

```typescript
import axios from 'axios';

const baseUrl = 'http://localhost:3000/users';

// Fetch all users
axios.get(baseUrl).then(response => {
  console.log(response.data);
});

// Fetch user profile
axios.get(`${baseUrl}/profile`).then(response => {
  console.log(response.data);
});

// Logout user
axios.get(`${baseUrl}/logout`).then(response => {
  console.log(response.data);
});

// Login user
axios.post(`${baseUrl}/login`, {
  email: 'user@example.com',
  password: 'password123'
}).then(response => {
  console.log(response.data);
});

// Register user
axios.post(`${baseUrl}/register`, {
  email: 'newuser@example.com',
  password: 'password123'
}).then(response => {
  console.log(response.data);
});
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
