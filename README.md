# Blog API

## Overview

The Blog API is a RESTful API built with Node.js and Express for managing blog posts, categories, and comments. It includes features for user authentication, category management, and CRUD operations for blogs and comments. The API integrates with Cloudinary for image uploads and utilizes JWT for secure authentication.

## Features

- **User Authentication:** Sign up, login, and token-based authentication.
- **Category Management:** Create, update, delete, and retrieve categories.
- **Blog Management:** Create, update, delete, and retrieve blog posts.
- **Comment Management:** Add and retrieve comments for blog posts.
- **Image Upload:** Upload images to Cloudinary and link them to blog posts and categories.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account (for image upload)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Mahfuz-bot/Blog-API.git
   cd blog-api
   ```

   ## API Endpoints

   ### Authentication

   - POST /auth/signup: Register a new user.
   - POST /auth/login: Log in and receive a JWT.

   ### Categories

   - POST /categories: Create a new category.
   - GET /categories: Retrieve all categories.
   - GET /categories/:id: Retrieve a category by ID.
   - PUT /categories/:id: Update a category by ID.
   - DELETE /categories/:id: Delete a category by ID.

   ### Blogs

   - POST /blogs: Create a new blog post.
   - GET /blogs: Retrieve all blog posts.
   - GET /blogs/:id: Retrieve a blog post by ID.
   - PUT /blogs/:id: Update a blog post by ID.
   - DELETE /blogs/:id: Delete a blog post by ID.

   ### Comments

   - POST /comments: Add a new comment to a blog post.
   - GET /comments/:blogId: Retrieve all comments for a blog post.

   ### Error Handling

   The API uses custom error handling for different types of errors, including:

- 400 Bad Request: Invalid request data.
- 401 Unauthorized: Authentication errors.
- 403 Forbidden: Authorization errors.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: General server errors.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.
