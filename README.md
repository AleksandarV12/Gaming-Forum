# Gorum - The Gaming Forum

---

## 1. Application Purpose

The goal of the application is to provide a platform for gamers to connect and discuss their favorite games. Users can browse themed discussion boards, read and create posts, and engage with the gaming community. The application supports guest browsing and full authenticated user functionality including creating, editing, and deleting content.

---

## 2. User Roles

### Guest (Not Authenticated User)
- Can view the Home page
- Can browse the Themes catalog
- Can view Theme details
- Can browse the Posts catalog
- Can view Post details
- Can view the About and Contact pages
- Can register a new account
- Can log in to an existing account

### Authenticated User
- Can do everything a Guest can (except access Login/Register pages)
- Can create new Themes
- Can create new Posts (with theme selection from dropdown)
- Can edit their own Posts
- Can delete their own Posts
- Can view their personal Dashboard with stats
- Can view their Profile page
- Can log out

## 3. Public Features

- **Home page** — Hero banner with recent posts displayed as cards
- **Themes catalog** (`/themes`) — Grid of all available discussion themes
- **Theme details** (`/themes/:id`) — Details of a specific theme including its posts
- **Posts catalog** (`/posts`) — List of all posts with date and preview
- **Post details** (`/posts/:id`) — Full post content with date
- **About page** (`/about`) — Information about Gorum and its mission
- **Contact page** (`/contact`) — Contact form with validation
- **Login page** (`/login`) — Login with email and password
- **Register page** (`/register`) — Register with username, email, and password

## 4. Authenticated User Features

- **Create Theme** (`/create-theme`) — Create a new discussion theme with name and description
- **Create Post** (`/create-post`) — Create a new post by selecting a theme from a dropdown
- **Edit Post** — Edit the title and content of own posts from the Post details page
- **Delete Post** — Delete own posts from the Post details page with confirmation
- **Dashboard** (`/dashboard`) — View personal stats (theme count, post count) and own themes
- **Profile** (`/profile`) — View username and email

## 5. Main Application Flow

1. User opens the **Home page** and sees the hero banner and recent posts
2. User navigates to the **Themes catalog** to browse discussion topics
3. User selects a theme and opens the **Theme details** page to see posts in that theme
4. User navigates to **Register** and creates an account (or logs in)
5. Authenticated user goes to **Create Theme** and creates a new discussion theme
6. Authenticated user goes to **Create Post**, selects a theme from the dropdown, and submits a post
7. The new post appears in the **Posts catalog** and on the **Home page**
8. User can click their own post and use the **Edit** or **Delete** buttons
9. User can visit their **Dashboard** to see their activity stats and themes
10. User logs out from the navigation bar

## 6. Data Structure

### Post Object
- `_id` — MongoDB ObjectId
- `title` — String (required)
- `text` — String (required)
- `themeId` — ObjectId reference to Theme (required)
- `userId` — ObjectId reference to User (required)
- `createdAt` — Date
- `updatedAt` — Date

### Theme Object
- `_id` — MongoDB ObjectId
- `themeName` — String (required)
- `description` — String (required)
- `userId` — String (owner)
- `posts` — Array of post references
- `createdAt` — Date

### User Object
- `_id` — MongoDB ObjectId
- `username` — String (required, unique)
- `email` — String (required, unique)
- `password` — String (hashed with bcrypt)
- `createdAt` — Date

## 7. Project Architecture
    src/app/
├── auth/
│   ├── login/              # Login component
│   ├── register/           # Register component
│   └── auth-response.model.ts
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts   # Blocks guests from private pages
│   │   └── guest.guard.ts  # Blocks logged-in users from login/register
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── posts.service.ts
│   │   └── theme.service.ts
│   ├── header/             # Navigation bar with dropdowns
│   └── footer/             # Footer component
├── features/
│   ├── posts/
│   │   ├── post-list/      # Posts catalog
│   │   ├── post-details/   # Post details with edit/delete
│   │   └── create-post/    # Create post form
│   ├── themes/
│   │   ├── theme-list/     # Themes catalog
│   │   ├── theme-details/  # Theme details with posts
│   │   └── create-theme/   # Create theme form
│   ├── dashboard/          # User dashboard with stats
│   ├── profile/            # User profile
│   └── contact/            # Contact form
├── models/
│   ├── post.model.ts
│   ├── theme.model.ts
│   └── user.model.ts
├── about/                  # About page
└── home/                   # Home page

## 8. Technologies Used

| Angular
| RxJS
| Node.js
| Express.js
| MongoDB
| Mongoose
| JWT
| bcrypt
| CSS

## 9. How to Run the Project

### Prerequisites
- Node.js installed
- MongoDB running locally
- Angular CLI installed (`npm install -g @angular/cli`)

### Backend
```bash
cd Rest-api
npm install
node app.js

```
Backend runs on `http://localhost:3000`

### Frontend
```bash
cd Gaming-forum
npm install
ng serve

```
Navigate to `http://localhost:4200`

### Clone the repository
```bash
git clone https://github.com/AleksandarV12/Gaming-Forum.git
```