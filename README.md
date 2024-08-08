## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher) or Yarn
- PostgreSQL
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/my-crud-app.git
   cd my-crud-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your database connection string:

   ```plaintext
   DATABASE_URL="postgresql://your-username:your-password@localhost:5432/your-database"
   PORT=3000
   ```

   You can use `.env.example` as a template.

4. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

5. Start the server:
   ```bash

   npm start
   ```
create file.env
DATABASE_URL="postgresql://postgres:123456@localhost:<your_password>/crud"
PORT=3000
The app should now be running on `http://localhost:3000`.
#Struktur folder 
![image](https://github.com/user-attachments/assets/b1bb99d3-89d7-4de4-a087-76d9395e519d)
# tampilan aplikasinya
![Cuplikan layar 2024-08-08 200417](https://github.com/user-attachments/assets/72449807-a5cd-4553-82ca-a987fb862532)

