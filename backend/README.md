# FastAPI Backend

A clean, production-style FastAPI backend with PostgreSQL, SQLAlchemy, Alembic, and authentication.

## Features

- **FastAPI** with modern async support
- **PostgreSQL** database with SQLAlchemy 2.0 ORM
- **Alembic** for database migrations
- **JWT Authentication** with bcrypt password hashing
- **GitHub & Jira Integration** (mock implementations)
- **Webhook-ready architecture**
- **Pydantic** for data validation
- **Clean modular structure**

## Project Structure

```
backend/
├── app/
│   ├── core/           # Configuration, database, security
│   ├── models/         # SQLAlchemy models
│   ├── schemas/        # Pydantic schemas
│   ├── routers/        # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utilities
│   └── main.py         # FastAPI application
├── alembic/            # Database migrations
├── requirements.txt    # Python dependencies
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Data Models

The application implements these core models:

- **User** - Authentication and user management
- **Project** - Project tracking
- **JiraTask** - Jira integration
- **MergeRequest** - GitHub pull requests
- **Commit** - Git commits
- **ReviewComment** - Code review comments
- **Alert** - Project alerts

## Setup Instructions

### 1. Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE dbname;
CREATE USER user WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE dbname TO user;
```

### 4. Environment Configuration

Copy the environment template and configure:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SECRET_KEY=your-super-secret-key-here
```

### 5. Database Migrations

Run the initial migration:

```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

### 6. Run the Application

Start the development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user info

### GitHub Integration
- `POST /api/v1/github/sync/commits` - Sync commits from GitHub
- `POST /api/v1/github/sync/pull-requests` - Sync pull requests
- `GET /api/v1/github/branches` - Get repository branches

### Jira Integration
- `POST /api/v1/jira/sync/tasks` - Sync tasks from Jira
- `GET /api/v1/jira/sprints` - Get sprint data
- `POST /api/v1/jira/link` - Link merge request to Jira task

### Webhooks
- `POST /api/v1/webhooks/github/push` - GitHub push webhook
- `POST /api/v1/webhooks/github/pull-request` - GitHub PR webhook
- `POST /api/v1/webhooks/github/review-comment` - GitHub review comment webhook
- `POST /api/v1/webhooks/jira/issue-updated` - Jira issue webhook

## Usage Examples

### Register a User

```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "developer"
  }'
```

### Login

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### Get Current User

```bash
curl -X GET "http://localhost:8000/api/v1/auth/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Development

### Code Style

The project uses:
- **Black** for code formatting
- **isort** for import sorting
- **flake8** for linting

Run formatting:

```bash
black app/
isort app/
flake8 app/
```

### Adding New Models

1. Create model in `app/models/`
2. Add to `app/models/__init__.py`
3. Create schema in `app/schemas/`
4. Add to `app/schemas/__init__.py`
5. Generate migration: `alembic revision --autogenerate -m "Add new model"`
6. Apply migration: `alembic upgrade head`

### Adding New Routes

1. Create service in `app/services/`
2. Create router in `app/routers/`
3. Add router to `app/main.py`

## Security Notes

- Change the `SECRET_KEY` in production
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Validate all inputs (handled by Pydantic)
- Use proper database permissions

## External Integrations

The application includes mock implementations for GitHub and Jira integrations. To use real APIs:

1. Add API tokens to `.env`
2. Replace mock implementations in services with actual HTTP calls
3. Add proper error handling and rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
