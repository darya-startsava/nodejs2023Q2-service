## part_2 branch

# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Creating .env file

Create .env from .env.example

## Vulnerabilities scanning 

```
npm run docker:scan
```

## Running application

```
docker compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## REST service docs

## Endpoints:

### Users (/user route)

- `GET /user` - get all users
- `GET /user/:id` - get user by id
- `POST /user` - create new user with fields:

```
    {
      login: string;
      password: string;
    }
```

- `PUT /user/:id` - update user's password with fields:

```
    {
      oldPassword: string;
      newPassword: string;
    }
```

- `DELETE /user/:id` - delete user

### Tracks (/track route)

- `GET /track` - get all tracks
- `GET /track/:id` - get track by id
- `POST /track` - create new track with fields:

```
    {
      name: string;
      artistId?: string | null;
      albumId?: string | null;
      duration: number;
}
```

- `PUT /track/:id` - update track with fields:

```
    {
      name: string;
      artistId?: string | null;
      albumId?: string | null;
      duration: number;
}
```

- `DELETE /track/:id` - delete track

### Artists (/artist route)

- `GET /artist` - get all artists
- `GET /artist/:id` - get artist by id
- `POST /artist` - create new artist with fields:

```
    {
      name: string;
      grammy: boolean;
}
```

- `PUT /artist/:id` - update artist with fields:

```
    {
      name: string;
      grammy: boolean;
}
```

- `DELETE /artist/:id` - delete artist

### Albums (/album route)

- `GET /album` - get all albums
- `GET /album/:id` - get album by id
- `POST /album` - create new album with fields:

```
    {
      name: string;
      year: number;
      artistId?: string | null;
}
```

- `PUT /album/:id` - update album with fields:

```
    {
      name: string;
      year: number;
      artistId?: string | null;
}
```

- `DELETE /album/:id` - delete album

### Favorites (/favs route)

- `GET /favs` - get all favorites
- `POST /favs/track/:id` - add track to the favorites
- `DELETE /favs/track/:id` -delete track from favorites
- `POST /favs/album/:id` - add album to the favorites
- `DELETE /favs/album/:id` -delete album from favorites
- `POST /favs/artist/:id` - add artist to the favorites
- `DELETE /favs/artist/:id` -delete artist from favorites
