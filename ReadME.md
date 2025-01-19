# Dockrized-UserHub

**Dockrized-UserHub** is a full-stack web application consisting of a React frontend, Node.js backend, and MongoDB database. The entire project is containerized using Docker and Docker Compose to ensure easy setup, deployment, and scaling. This repository contains Dockerfiles for both the frontend and backend, as well as a Docker Compose file for managing all the services together.

## Project Structure

The project consists of the following main components:

- **Frontend**: React.js application running in a Docker container.
- **Backend**: Node.js application that communicates with the MongoDB database.
- **Database**: MongoDB database running in a Docker container.
- **Docker Compose**: Manages all the services (frontend, backend, and database) and allows them to run together.

### Folder Structure

Dockrized-UserHub/
├── backend/ 
│   ├── Dockerfile
│   ├── package.json
│   ├── ... (backend code)
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── ... (frontend code)
├── database/ 
│   ├── docker-compose.yml 
├── docker-compose.yml 
├── README.md 
└── .gitignore 


## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Tarekkamal-B/Dockrized-UserHub.git
    cd Dockrized-UserHub
    ```

2. Build the Docker images for all the services:

    If you want to build the Docker images individually:

    - For the **backend**:
        ```bash
        cd backend
        docker build -t backend-image .
        ```
    
    - For the **frontend**:
        ```bash
        cd frontend
        docker build -t frontend-image .
        ```

3. Alternatively, you can use **Docker Compose** to build and run all the services in one command.

    From the root project folder, run the following command:
    ```bash
    docker-compose up 
    ```

    This command will:
    - Pull the images from my DockerHub repos.
    - Start the MongoDB container.
    - Start the Node.js backend container and connect it to the MongoDB database.
    - Start the React frontend container and link it with the backend.

## Running the Application

Once the application has been built and the containers are up, you can access it via:

- **Frontend (React)**: Open [http://localhost:3001](http://localhost:3000) in your browser.
- **Backend (Node.js)**: The backend will be accessible at [http://localhost:8001](http://localhost:8001).



## Stopping the Containers

To stop the Docker containers, run the following command:

```bash
docker-compose down
```

This will stop all running services and remove the containers.

## Project Details

- **Frontend**: A React.js application that communicates with the backend through API calls.
- **Backend**: A Node.js application built with Express.js that handles requests from the frontend and communicates with MongoDB.
- **MongoDB**: A NoSQL database used to store application data.

## Docker Compose Services

The `docker-compose.yml` file defines the following services:

1. **mongodb**: The MongoDB container used to store and manage application data.
2. **backend**: The Node.js backend container that communicates with MongoDB and serves API endpoints.
3. **frontend**: The React frontend container that displays data fetched from the backend.

## Notes

- The project uses environment variables for sensitive information (e.g., database URL, API keys). Ensure you have those set up in your environment, or modify the Docker Compose file to specify them.
- The default ports are set to:
  - **React Frontend**: `3001`
  - **Node.js Backend**: `8001`
  - **MongoDB**: `27017` (This is only accessible by other services, not directly from the host machine.)

## Troubleshooting

- **Build Errors**: If you encounter build errors, ensure that Docker and Docker Compose are installed correctly and that your Dockerfiles are set up as expected.
- **Port Conflicts**: If port `3001` or `8001` is already in use, change the ports in the `docker-compose.yml` file.
```

