# Library Booking Web Portal App

Application hosted on: https://frontend-library-booking-portal.onrender.com

## Running the application locally via Docker-compose

Under root directory:

```
docker-compose up
```

## Or running backend/frontend separately via local environment

Under [backend](/backend/) directory:

```
mv .env.example .env
```

```
npm run dev
```

Access API at http://localhost:3001/ _{endpoint}_

- HTTP POST endpoint: _booking_
- HTTP GET endpoint: _booking/:booking_id_

Under [frontend](/frontend/) directory:

```
npm run start
```

Access frontend at http://localhost:3000

## Testing backend services

Under [backend](/backend/) directory:

```
npm run test
```
