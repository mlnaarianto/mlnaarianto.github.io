import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './BlogDetail.module.css'
import { FaArrowLeft, FaCalendarAlt, FaTag } from 'react-icons/fa'

type BlogPost = {
  id: number
  title: string
  slug: string
  content: string
  date: string
  category: string
  image: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Native PHP for Beginners',
    slug: 'getting-started-native-php',
    content: `
## Introduction

PHP is one of the most widely used backend programming languages for building dynamic websites.  
In this article, I share my first experience learning **Native PHP** and understanding its core fundamentals.

---

## Basic PHP Syntax

PHP files usually use the \`.php\` extension and are written inside special tags:

\`\`\`php
<?php
echo "Hello World!";
?>
\`\`\`

The **echo** command is used to display text or output to the browser.

---

## Variables in PHP

\`\`\`php
<?php
$name = "Naila";
echo "Hello, " . $name;
?>
\`\`\`

Variables in PHP start with a dollar sign \`$\` and can store different types of data such as strings, numbers, or arrays.

---

## Understanding CRUD Concept

During my first project, I learned the basic **CRUD** operations:

- **Create** – inserting new data  
- **Read** – displaying stored data  
- **Update** – editing existing data  
- **Delete** – removing data  

PHP is commonly combined with **MySQL** to manage and store this data.

---

## Conclusion

Learning Native PHP helps build a strong backend foundation before moving to frameworks like **Laravel**.  
It improves understanding of server logic, data processing, and database interaction.
`,
    date: '2026-02-10',
    category: 'Backend',
    image: 'https://www.php.net/images/logos/new-php-logo.svg',
    readTime: '4 min read'
  },
  {
    id: 2,
    title: 'Building a REST API with Laravel Sanctum & RBAC',
    slug: 'building-rest-api-laravel-sanctum',
    content: `
## Introduction

**Laravel Sanctum** provides a simple, token-based authentication system for SPAs, mobile apps, and simple token-based APIs. In this project, I used Sanctum to secure a REST API and added a custom **RBAC (Role-Based Access Control)** middleware to restrict endpoints based on user roles.

Unlike Passport, Sanctum doesn't require OAuth2 complexity, making it a lightweight choice for internal or first-party APIs.

---

## Why Sanctum?

- Lightweight, no OAuth2 server needed
- Simple personal access tokens
- Works great for SPA and mobile API auth
- Easy to combine with custom middleware like RBAC

---

## Installing Sanctum

\`\`\`bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
php artisan migrate
\`\`\`

Then add the \`HasApiTokens\` trait to the \`User\` model:

\`\`\`php
use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
\`\`\`

---

## Defining Routes in api.php

All API routes live in \`routes/api.php\` and are automatically prefixed with \`/api\`:

\`\`\`php
use App\\Http\\Controllers\\AuthController;
use App\\Http\\Controllers\\UserController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('role:admin')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
    });
});
\`\`\`

---

## Login & Token Generation

\`\`\`php
public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token,
    ]);
}
\`\`\`

---

## Custom RBAC Middleware

To restrict routes by role, I created a simple middleware:

\`\`\`php
class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role)
    {
        if ($request->user()->role !== $role) {
            return response()->json(['message' => 'Access denied'], 403);
        }

        return $next($request);
    }
}
\`\`\`

Then register it as an alias in \`bootstrap/app.php\` (or \`Kernel.php\` for older versions):

\`\`\`php
$middleware->alias([
    'role' => \\App\\Http\\Middleware\\RoleMiddleware::class,
]);
\`\`\`

---

## Protecting a Route by Role

\`\`\`php
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'index']);
});
\`\`\`

If the authenticated user's role doesn't match, the request is rejected with a **403 Forbidden** response before it ever reaches the controller.

---

## Conclusion

Combining **Laravel Sanctum** with a custom **RBAC middleware** gave me a clean, lightweight way to secure API endpoints without the overhead of full OAuth2. It's a solid pattern for internal tools, admin panels, or any first-party API where you control both the frontend and backend.
`,
    date: '2026-02-10',
    category: 'Laravel',
    image: 'https://raw.githubusercontent.com/laravel/art/master/laravel-logo.svg',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Building a REST API Backend with Go and Gin Framework',
    slug: 'building-rest-api-go-gin',
    content: `
## Introduction

**Gin** is a lightweight and high-performance HTTP web framework written in **Go (Golang)**.  
In this project, I used Gin to build a structured backend service with **role-based access control (RBAC)**, clean architecture, and a clear separation of concerns.

Compared to native \`net/http\`, Gin makes routing, middleware handling, and JSON binding much faster and simpler to write.

---

## Why Choose Gin?

- Extremely fast routing performance
- Built-in middleware support
- Simple JSON binding and validation
- Clean, minimal API design
- Great fit for building REST APIs and microservices

---

## Project Structure

A typical Gin backend project can be organized like this:

\`\`\`
├── config/
├── controllers/
├── database/
├── db/migrations/
├── helpers/
├── middlewares/
├── models/
├── routes/
├── go.mod
├── go.sum
└── main.go
\`\`\`

- **config/** → environment and database configuration
- **controllers/** → request handling logic
- **middlewares/** → authentication and RBAC checks
- **models/** → database schema and struct definitions
- **routes/** → API endpoint definitions

---

## Setting Up the Router

\`\`\`go
package main

import (
  "github.com/gin-gonic/gin"
)

func main() {
  router := gin.Default()

  router.GET("/health", func(c *gin.Context) {
    c.JSON(200, gin.H{
      "status": "ok",
    })
  })

  router.Run(":8080")
}
\`\`\`

---

## Middleware for RBAC (Role-Based Access Control)

Middlewares are used to check whether a user has permission to access a certain route:

\`\`\`go
func RoleMiddleware(allowedRoles ...string) gin.HandlerFunc {
  return func(c *gin.Context) {
    userRole := c.GetString("role")

    for _, role := range allowedRoles {
      if role == userRole {
        c.Next()
        return
      }
    }

    c.AbortWithStatusJSON(403, gin.H{
      "message": "Access denied",
    })
  }
}
\`\`\`

This middleware can then be applied to specific routes that require certain roles, such as **admin** or **staff**.

---

## Example Controller

\`\`\`go
func GetUsers(c *gin.Context) {
  var users []Model.User

  if err := database.DB.Find(&users).Error; err != nil {
    c.JSON(500, gin.H{"error": err.Error()})
    return
  }

  c.JSON(200, gin.H{
    "data": users,
  })
}
\`\`\`

---

## Example Route Grouping

\`\`\`go
api := router.Group("/api")
{
  api.POST("/login", controllers.Login)

  admin := api.Group("/admin")
  admin.Use(middlewares.AuthMiddleware(), middlewares.RoleMiddleware("admin"))
  {
    admin.GET("/users", controllers.GetUsers)
  }
}
\`\`\`

---

## Conclusion

Building a backend with **Go and Gin** taught me a lot about clean project architecture, middleware design, and implementing **RBAC-based authorization**.  
Gin's speed and simplicity make it a great choice for building scalable REST APIs, especially for projects that require strict access control between different user roles.
`,
    date: '2026-02-10',
    category: 'Golang',
    image: 'https://raw.githubusercontent.com/gin-gonic/logo/master/color.png',
    readTime: '8 min read'
  },
  {
    id: 4,
    title: 'Implementing OAuth Social Login (Google, Meta, X, Discord)',
    slug: 'implementing-oauth-social-login',
    content: `
## Introduction

**OAuth (Open Authorization)** is a modern authentication method that allows users to log in using third-party services such as **Google, Meta (Facebook), X (Twitter), and Discord** without creating a new account manually.

It improves **user experience**, **security**, and **login speed**.

---

## How OAuth Works

1. User clicks "Login with Google"
2. Redirect to Google Authorization Page
3. User grants permission
4. Google sends an Access Token back to your app
5. Your app retrieves user data (name, email, avatar)

---

## Benefits of OAuth

- Faster login process
- No password storage needed
- Higher security
- Trusted identity providers
- Better user retention

---

## Example Flow (React Frontend)

\`\`\`tsx
function LoginButton() {
  const handleLogin = () => {
    window.location.href =
      "http://localhost:8000/auth/google/redirect";
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}
\`\`\`

---

## Example Backend (Laravel Socialite)

\`\`\`php
use Laravel\\Socialite\\Facades\\Socialite;

public function redirectToGoogle() {
  return Socialite::driver('google')->redirect();
}

public function handleGoogleCallback() {
  $user = Socialite::driver('google')->user();

  return $user->getEmail();
}
\`\`\`

---

## Supported Providers

- Google
- Meta (Facebook)
- X (Twitter)
- Discord
- GitHub
- Microsoft

---

## Conclusion

OAuth social login integration is an essential feature in modern applications.  
It provides a **secure**, **fast**, and **user-friendly authentication experience**, making it highly valuable for both developers and users.
`,
    date: '2026-02-10',
    category: 'Authentication',
    image: 'https://api.iconify.design/lucide:key-round.svg?color=%233b82f6',
    readTime: '9 min read'
  },
  {
    id: 5,
    title: 'Generating Anime Characters using DCGAN with TensorFlow & Keras',
    slug: 'anime-generator-dcgan-tensorflow-keras',
    content: `
## Introduction

In this project, I built an **Anime Character Generator** using **Deep Convolutional Generative Adversarial Network (DCGAN)** with **TensorFlow** and **Keras**.

The goal was to train a neural network to generate new anime faces from scratch based on a dataset.

---

## What is DCGAN?

**DCGAN (Deep Convolutional GAN)** is a type of neural network consisting of two models:

- **Generator** → Creates fake images
- **Discriminator** → Detects whether the image is real or fake

Both models compete until the generator produces realistic results.

---

## Tools & Technologies

- Python
- TensorFlow
- Keras
- NumPy
- Matplotlib
- Google Colab / GPU

---

## Dataset Preparation

The dataset contains thousands of anime face images.  
Images were resized and normalized before training.

---

## Generator Example

\`\`\`python
model = Sequential([
    Dense(256, input_dim=100),
    LeakyReLU(alpha=0.2),
    BatchNormalization(),
    Dense(512),
    LeakyReLU(alpha=0.2),
    Dense(784, activation='tanh'),
    Reshape((28,28,1))
])
\`\`\`

---

## Training Process

The training loop runs for several epochs:

- Generate fake images
- Compare with real images
- Update discriminator
- Update generator

Training may take hours depending on GPU power.

---

## Results

After training, the model can produce **unique anime faces** that never existed before.  
The longer the training, the better the quality.

---

## Challenges

- Long training time
- GPU memory limitation
- Mode collapse
- Dataset quality

---

## Conclusion

Building a DCGAN anime generator helped me understand **deep learning concepts**, **neural networks**, and **AI model training pipelines**.  
It was a challenging but rewarding experience that strengthened my skills in **Machine Learning and Python development**.
`,
    date: '2026-02-10',
    category: 'AI / Machine Learning',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    readTime: '12 min read'
  },
  {
    id: 6,
    title: 'Getting Started with CodeIgniter 4 for Web Development',
    slug: 'getting-started-codeigniter-4',
    content: `
## Introduction

**CodeIgniter 4** is a lightweight PHP framework designed for building dynamic web applications quickly and efficiently.  
It follows the **MVC (Model–View–Controller)** pattern, making the code structured and maintainable.

---

## Why CodeIgniter 4?

- Lightweight and fast
- Easy configuration
- Clear MVC structure
- Built-in security features
- Suitable for small to medium projects

---

## Project Structure

CodeIgniter 4 separates logic into:

- **Model** → Database interaction
- **View** → User interface (HTML)
- **Controller** → Handles requests & responses

---

## Simple Route Example

\`\`\`php
// app/Config/Routes.php
$routes->get('/users', 'UserController::index');
\`\`\`

---

## Controller Example

\`\`\`php
namespace App\\Controllers;

class UserController extends BaseController
{
    public function index()
    {
        return view('users/index');
    }
}
\`\`\`

---

## View Example

\`\`\`php
<!-- app/Views/users/index.php -->
<h1>User List</h1>
<p>Welcome to CodeIgniter 4 Application</p>
\`\`\`

---

## Basic CRUD Concept

In real projects, CodeIgniter is often used to create:

- User Management
- Inventory Systems
- Booking Systems
- REST API Services

---

## Conclusion

Learning **CodeIgniter 4** helped me understand PHP framework architecture, MVC patterns, and backend web development fundamentals.  
It is a great framework for developers who want speed, simplicity, and performance in PHP projects.
`,
    date: '2026-02-10',
    category: 'PHP',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg',
    readTime: '8 min read'
  },
  {
    id: 7,
    title: 'Understanding Ruby on Rails: Convention over Configuration',
    slug: 'getting-started-ruby-on-rails',
    content: `
## Introduction

**Ruby on Rails (RoR)** is a full-stack web application framework written in **Ruby**.  
It is built around two fundamental philosophies: **Convention over Configuration (CoC)** and **Don't Repeat Yourself (DRY)**, which allow developers to write clean, maintainable code with minimal setup overhead.

---

## Core Principles of Rails

1. **Convention over Configuration (CoC)**  
    Rails assumes sensible defaults so you don't have to write endless config files. If you name a model \`User\`, Rails automatically assumes the database table is named \`users\`.

2. **Don't Repeat Yourself (DRY)**  
    Every piece of code or logic should have a single, unambiguous representation within the system, avoiding redundant code across controllers and models.

---

## Project Structure & MVC Architecture

A standard Rails application organizes files cleanly:

- **app/models/** → Data models & business logic powered by Active Record
- **app/views/** → UI templates rendered via ERB (Embedded Ruby)
- **app/controllers/** → Handles incoming HTTP requests and responses
- **config/routes.rb** → Defines application routing rules

---

## RESTful Routing Example

In Rails, defining RESTful resources takes just one line in \`config/routes.rb\`:

\`\`\`ruby
# config/routes.rb
Rails.application.routes.draw do
  resources :users
end
\`\`\`

This automatically generates 7 standard RESTful routes (\`index\`, \`show\`, \`new\`, \`create\`, \`edit\`, \`update\`, \`destroy\`).

---

## Model & Active Record ORM

Active Record makes database queries intuitive without writing raw SQL:

\`\`\`ruby
# app/models/user.rb
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
\`\`\`

Querying the database is simple:

\`\`\`ruby
# Fetch active users
users = User.where(active: true)

# Create a new user record
user = User.create(name: "Maulana", email: "maulana@example.com")
\`\`\`

---

## Controller Example

\`\`\`ruby
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end
end
\`\`\`

---

## View Example (ERB)

\`\`\`erb
<!-- app/views/users/index.html.erb -->
<h1>User List</h1>

<ul>
  <% @users.each do |user| %>
    <li><%= user.name %> - <%= user.email %></li>
  <% end %>
</ul>
\`\`\`

---

## Rapid Development with Scaffolding

Rails provides CLI generators that boost productivity. Generating a full CRUD resource requires a single command:

\`\`\`bash
bin/rails generate scaffold Post title:string body:text
bin/rails db:migrate
\`\`\`

This command automatically generates the model, migration file, controller, views, routes, and test suite.

---

## Conclusion

Exploring **Ruby on Rails** offers a refreshing perspective on backend development. Its strong conventions reduce decision fatigue, while Active Record makes complex database operations effortless. It remains a powerful framework for rapidly turning ideas into production-ready web applications.
`,
    date: '2026-02-10',
    category: 'Ruby on Rails',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg',
    readTime: '7 min read'
  }
]

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Article not found</h2>
        <button onClick={() => navigate(-1)} className={styles.backLink} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <FaArrowLeft /> Back
        </button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <section className={styles.detailSection}>
      <div className={styles.container}>
        <button
          onClick={() => navigate(-1)}
          className={styles.backLink}
          style={{
            border: 'none',
            background: 'none',
            padding: '8px 16px',
            fontFamily: 'inherit',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span>
            <FaTag /> {post.category}
          </span>
          <span>
            <FaCalendarAlt /> {formatDate(post.date)}
          </span>
          <span>{post.readTime}</span>
        </div>

        <img
          src={post.image}
          alt={post.title}
          className={styles.heroImage}
        />

        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  )
}