![thumbnail](/frontend/public/thumbnail.png)

<div align="center">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb">
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="expressjs">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="nodejs">
</div>

<h1 align="center">MERN Stack Note Taking App</h1>

### Features:

- Full-Stack App built with the MERN Stack (MongoDB, Express, React, Node)
- CRUD Notes with Title & Description
- Build and Test a Fully Functional REST API
- Rate Limiting with Upstash Redis - a Real-World Concept Explained Simply
- Completely Responsive UI
- Explore HTTP Methods, Status Codes & SQL vs NoSQL
- Deployment Guide Included

## Setup

Follow these step to install and set up the project.

### Clone the repository
```bash
git clone https://github.com/conbopk/ThinkBoard.git
cd ThinkBoard
```

### Backend (/backend)

```bash
# create file .env follow .env.example
MONGO_URI=<your_mongo_uri>

PORT=<your_port>

UPSTASH_REDIS_REST_URL=<your_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_redis_rest_token>

NODE_ENV=development
```

```bash
# Run the express backend
cd backend
npm install
npm run dev
```

### Frontend (/frontend)
```bash
cd frontend
npm install
npm run dev
```