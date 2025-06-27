

To get started, take a look at src/app/page.tsx.

## Running the Project on Linux

There are two primary ways to run this project locally on a Linux system: using `npm` or using `Docker`.

### Method 1: Using `npm` (Node.js)

This method requires you to have Node.js, `npm`, and a running MySQL server installed on your system.

1.  **Install Dependencies:**
    Open your terminal and navigate to the project's root directory. Then, run the following command to install the necessary packages:
    ```bash
    npm install
    ```

2.  **Create Environment File:**
    Create a `.env` file in the root directory by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and update the variables with your local MySQL connection details. For `MYSQL_HOST`, you will likely use `127.0.0.1` or `localhost`.

3.  **Set up the Database:**
    You need to create the database schema and populate it with data.
    *   **Create Tables:** Connect to your MySQL server and run the SQL commands from the `db/schema.sql` file.
    *   **Seed Data:** Run the seed script:
        ```bash
        node db/seed.js
        ```

4.  **Run the Development Server:**
    Start the Next.js development server with:
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Method 2: Using Docker

This method requires Docker and `docker-compose` to be installed on your Linux system. This setup will start both the Next.js application and a MySQL database container.

1.  **Create Environment File:**
    Before you start, you must create a `.env` file in the project root by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and **verify the values**. For this Docker setup, `MYSQL_HOST` must be `mysql_db`, which is the name of the database service in the `docker-compose.yml` file. You can customize the other credentials if you wish.

2.  **Build and Run the Docker Containers:**
    Open your terminal, navigate to the project's root directory, and run the following command:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker image for your application, pull the MySQL image, and start both containers. The `--build` flag ensures the app image is rebuilt if you've made code changes.

3.  **Set up the Database (First-Time Only):**
    When you run the containers for the first time, the database will be empty. You need to create the tables and populate them with data.
    
    *   **Create Tables:** Open a **new terminal window** and run the following command to execute the schema file inside the running MySQL container.
        ```bash
        docker-compose exec mysql mysql -uuser -ppassword techmartdb < db/schema.sql
        ```
        (Replace `user`, `password`, and `techmartdb` if you changed them in your `.env` file).

    *   **Seed Data:** Now, run the seed script inside the web container to populate the tables.
         ```bash
        docker-compose exec web node db/seed.js
        ```

4.  **Access the Application:**
    Once the containers are running, the application will be accessible at [http://localhost:3000](http://localhost:3000).

5.  **Stopping the Containers:**
    To stop the application, press `Ctrl + C` in the terminal where `docker-compose` is running. To remove the containers and the network, you can run:
    ```bash
    docker-compose down
    ```
    To remove the persistent database volume as well (this will delete all your data), run:
    ```bash
    docker-compose down -v
    ```

That's it! Choose the method that best fits your workflow.
