# Cascade Content Verification Platform

Disclaimer: All contributions were made by Harry (me) - this project ported over from Gitlab, which includes merge requests approved by @Peter Crackenberg, my supervisor.

This project is a containerized `Vue.js` and `Node.js` full-stack web application that interacts with the Hannon Hill Cascade Content Management System (CMS) API to automate the verification of content accuracy and validity.

Given a list of URLS separated by new lines and a timeframe in date time format `01-01-1994`, the API will populate page information that only includes pages modified during the time frame specified. This streamlines the previous tedious and manual process of ensuring that the content in Cascade is up-to-date and correct.

## Project Structure

The project directory is structured as follows:

```
cascade-playground-platform/
├── public/
├── src/
│   ├── assets/
│   └── components/
docker-compose.yml
migrator/
├── config/
├── migrations/
├── models/
└── seeders/
server/
└── routes/
```

- `cascade-playground-platform/`: Contains the Vue frontend application.
  - `public/`: Holds the public assets for the frontend.
  - `src/`: Contains the source code for the Vue application.
    - `assets/`: Stores static assets such as images, fonts, etc.
    - `components/`: Contains reusable Vue components.
- `docker-compose.yml`: Docker Compose configuration file for running the application.
- `migrator/`: Contains the database migration and seeding scripts.
  - `config/`: Holds the database configuration files.
  - `migrations/`: Contains the database migration files.
  - `models/`: Defines the database models.
  - `seeders/`: Contains the database seeder files to populate the database with initial data, such as Cascade editor names.
- `server/`: Contains the Node.js backend server.
  - `routes/`: Defines the API routes for the server.

## Setup

To set up the project, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies for the frontend and backend:
   ```
   cd cascade-playground-platform
   npm install
   cd ../server
   npm install
   ```
4. Create a `.env` file in the `server` directory and provide your Cascade API key:
   ```
   USER_API_KEY=YOUR_API_KEY
   ```
   Replace `YOUR_API_KEY` with your actual Cascade API key.

5. Run the database migrations and seeders (if applicable):
   ```
   cd ../migrator
   npm run migrate
   ```
6. Start the development server:
   ```
   cd ../server
   npm run start
   ```
7. In a separate terminal, start the Vue frontend:
   ```
   cd ../cascade-playground-platform
   npm run serve
   ```
8. Access the application in your web browser at `http://localhost:8080`.

You can also feel free to use the `docker-compose.yml` and respective `Dockerfile` in each repo to containerize too. That is used for production use.

## Usage

- Use the application to verify the accuracy and freshness of the content in your Cascade CMS.
- The frontend provides an intuitive user interface to interact with the backend internal API and display the content metadata.
- The backend server handles HTTP requests and communicates with the external Cascade CMS API.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
