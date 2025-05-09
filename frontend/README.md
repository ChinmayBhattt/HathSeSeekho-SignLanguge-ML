# GestureAcademy Frontend

This is the frontend for GestureAcademy, a platform to learn American Sign Language practically.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the React components for login:

```bash
npm run build:react
```

3. Start the development server:

```bash
npm run dev
```

This will:
- Build the React login component
- Start the Eleventy development server

## Login Flow

The site now includes a login flow that requires users to authenticate before accessing content.

For demo purposes, use:
- Email: demo@example.com
- Password: password

## Development

- `npm run build:react` - Build React components
- `npm run start` - Start the Eleventy development server
- `npm run dev` - Build React components and start the server
- `npm run build` - Build the site for production
- `npm run css` - Build CSS with Tailwind (watch mode)

## Project Structure

- `/react-login` - React login component
- `/app` - Application pages
- `/assets` - Static assets
- `/_includes` - Reusable templates and components

```bash
cd frontend

**If dependency not installed**
npm i

**if installed**
npm start

**create a new terminal**
npm run css


** to create a build for hosting the application**
npm run build

```

both npm start and css is needed to run the frontend and watch for any changes.
