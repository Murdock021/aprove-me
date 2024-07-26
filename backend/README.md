![Logo](https://bankme.tech/hs-fs/hubfs/BANKME%20AZUL%20NOVO-4.png?width=120&height=67&name=BANKME%20AZUL%20NOVO-4.png)

# <div align="center">BANKME - BACKEND</div>

Welcome to the Receivables Functionality Implementation Project for Bankme

This project aims to build a robust API using the NestJS framework. For database interaction, we utilize Prisma as the ORM (Object-Relational Mapping), ensuring efficiency and ease in managing data in a SQLite database.

|         |                              |
| ------- | ---------------------------- |
| Email   | diogomachadocmb@gmail.com    |
| Phone   | +55 21 965629504             |
| Address | Rio de Janeiro, Brazil       |

# <div align="center">Summary</div>

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Get Started](#get-started)


# Introduction

#### Financial Dashboard

  A  **Bankme** client has requested the implementation of a new feature for receivables management.

This client processes a significant volume of receivables daily, and our operations team has been facing considerable challenges due to the need to manually enter all this data.

Receivables are digital representations of documents that simulate debts to be collected. For Bankme, it is essential to integrate this information into our commercial workflow with this client, aiming to optimize processes and ensure greater operational efficiency.


#### Technologies Used

Our backend is developed using modern languages and the best technologies on the market, ensuring performance, scalability, and security in all operations.

# Project Structure

```
backend/
│
├── prisma/
│ ├── migrations/
│   └── 20240724231208_/ 
├── src/
│ ├── assignor/
│ ├── auth/
│ ├── guards/
│ ├── payable/
│ ├── shareds/
│   └── decorators/
│   └── dto/
│   └── exeptions/
│   └── users/
├── test/
├── .env
├── .env.example
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── docker-compose.yaml
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.build.json
└── tsconfig.json
```

#  Technologies
<div align="rigth">
  <img align="center" alt="Ts" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img align="center" alt="Nest" src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
  <img align="center" alt="nodejs" src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img align="center" alt="Prisma" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white">
  <img align="center" alt="Wa-Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  <img align="center" alt="SQLite" src="https://img.shields.io/badge/SQLite-316192?style=for-the-badge&logo=sqlite&logoColor=white">
</div> 


# Get Started

To run this application, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/Murdock021/aprove-me.git
   ```

2. Install project dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:
   - Make a copy of the `.env.example` file and configure the environment variable for development as `.env`.

4. Generate and apply migrations to the project:

       npx prisma migrate dev

5. Start the application:

        npm run start:dev

# Initial Test:

Run the command below to check the tests:

    npm run test

### Docker

Commands to run:

1. Create a Docker image:

    docker build -t backend .

2. Start the services defined in the "docker-compose.yml" file in Docker containers.

    docker-compose up

---



### Acknowledgements


- [Repository](https://github.com/Murdock021/aprove-me/tree/main/backend)

---






