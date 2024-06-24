<h1 align="center" style="text-align: center;">
  Courses Microservices
</h1>

<br>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<h2 id="project">📁 Project</h2>

A fullstack application allows users to browse a comprehensive list of available courses and seamlessly enroll in their preferred course. It is built using microservices architecture and GraphQL for efficient data fetching and mutation operations.

<h2 id="project">Key Features</h2>

- Course Listing: Provides users with a clear overview of available courses.
- Enrollment: Enables users to easily enroll in courses of interest.
- Microservices Architecture: Built with a modular architecture to ensure scalability and flexibility.
- GraphQL Integration: Utilizes GraphQL for efficient and declarative data fetching and mutations.
- Auth0 Authentication: Provides an easy way to integrate authentication and authorization for web, mobile, and legacy applications.

![Screenshot_2](https://github.com/luc-ribeiro/courses-fullstack/assets/69688077/260ddef7-b147-480b-befd-7034be834d95)

![Screenshot_3](https://github.com/luc-ribeiro/courses-fullstack/assets/69688077/69e95c8b-f52c-40e4-8918-999c30ea22a1)

![Screenshot_4](https://github.com/luc-ribeiro/courses-fullstack/assets/69688077/9ede930b-faed-4291-915c-e1d5cf315cd6)


<h2 id="technologies">💻 Techs</h2>

- Next.js 14
- NestJS
- Microservices
- KafkaJS
- Apollo
- GraphQL
- Auth0
- TailwindCSS

<h2 id="usage">💡 How to run</h2>

To run the application on your local machine, make sure you have `Node.js`, `npm` and `Docker` installed before proceeding with the steps below:

1. Clone the project:

```
$ git clone https://github.com/luc-ribeiro/courses-fullstack
```

2. Run docker compose:

```
$ docker compose up -d
```

Make sure all services are running!

3. Navigate to each folder of the project:

```
$ cd purchases
$ cd classroom
$ cd gateway
$ cd web
```

4. Install the dependencies on each folder:

```
$ npm install
```

5. Start each server:

```
$ npm run start:dev
```

6. Start the Next.js app on web folder:

```
$ npm run dev
```

⚠️ Important: To access the GraphQL playground:

```http://localhost:3333/graphql```: Purchases microservice

```http://localhost:3334/graphql```: Classroom microservice

```http://localhost:3332/graphql```: Gateway

```http://localhost:8080```: Kafka UI

<h2 id="license">📝 License</h2>

This project is licensed under the MIT license.
