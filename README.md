# 🎓🧑‍🎓 Easylearny

#### Development of an Educational Platform for Online Learning

## Description

Easylearny: Your go-to educational platform! Offering diverse courses from top educators worldwide. Enjoy seamless
navigation, quality content, and flexible learning formats. Collaborate with peers, access affordability options, and
embark on a journey of knowledge and growth. Join Easylearny today!


## Installation

1. Clone the repository:

```bash
git clone https://github.com/IT21169908/se3020-lms-microservice-assignment.git
```

## Frontend App Setup

2. Navigate to the project directory:

```bash
cd se3020-lms-microservice-assignment/frontend
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables by creating a `.env` file and populating it with necessary values:

```plaintext
Follow the .env.example file and update with correct values.
```

5. Start the App:

```bash
npm run dev
```
6. To run build App (Not development mode):

```bash
npm build
```
Then:

```bash
npm start
```


## API Setup

1. Navigate to the API directory:

```bash
cd se3020-lms-microservice-assignment/backend
```

*** Navigate to services one by one
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables by creating a `.env` file and populating it with necessary values:

```plaintext
Follow the .env.docker.example file and update with correct values.
```

4. Connect MongoDB server.

```plaintext
Open MongoDb Compass -> Connect
```

5. Install server dependencies:

```plaintext
Install Docker
Install RabbitMQ
```

5. Run docker:

```bash
docker compose up
```


## Checking Logs API

From server dir

```bash
tail -f log\request.log
```

```bash
tail -f log\app.log
```

```bash
tail -f log\error.log
```

## Contribution



---

## License

This project is licensed under the [MIT License](LICENSE).
