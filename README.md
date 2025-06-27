# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running the Project on Linux

There are two primary ways to run this project locally on a Linux system: using `npm` or using `Docker`.

### Method 1: Using `npm` (Node.js)

This method requires you to have Node.js and `npm` installed on your system.

1.  **Install Dependencies:**
    Open your terminal and navigate to the project's root directory. Then, run the following command to install the necessary packages:
    ```bash
    npm install
    ```

2.  **Create Environment File:**
    Create a `.env.local` file in the root directory. You can copy the contents of the `.env` file if it exists, or start with an empty file.
    ```bash
    touch .env.local
    ```

3.  **Run the Development Server:**
    Start the Next.js development server with:
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

### Method 2: Using Docker

This method requires Docker and `docker-compose` to be installed on your Linux system.

1.  **Build and Run the Docker Container:**
    Open your terminal, navigate to the project's root directory, and run the following command:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker image for your application (if it doesn't exist already) and start the container. The `--build` flag ensures the image is rebuilt if you've made any code changes.

2.  **Access the Application:**
    Once the container is running, the application will be accessible at [http://localhost:3000](http://localhost:3000).

3.  **Stopping the Container:**
    To stop the application, press `Ctrl + C` in the terminal where `docker-compose` is running. To remove the container, you can run:
    ```bash
    docker-compose down
    ```

That's it! Choose the method that best fits your workflow.
