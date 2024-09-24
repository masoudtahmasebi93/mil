Certainly! Below is a comprehensive `README.md` file for your application, including instructions on how to set up, run, and test the application.

---

# **Armani Nail Salon Booking Application**

This application is a web-based booking system for Armani Nail Salon, built with Angular v18 and Angular Material. It includes both customer-facing and admin interfaces, allowing customers to book appointments and admins to manage appointments, services, and catalogs.

---

## **Table of Contents**

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running the JSON Server (Mock Backend)](#running-the-json-server-mock-backend)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Important Notes](#important-notes)
- [Contributing](#contributing)
- [License](#license)

---

## **Features**

- **Customer Interface:**
  - Browse services and catalogs.
  - Book appointments with preferred date and time.
  - Receive appointment confirmations.

- **Admin Interface:**
  - Secure login for admins (username: `admin`, password: `admin`).
  - Manage catalogs (categories and services).
  - View, edit, and delete appointments.
  - Update appointment statuses.

---

## **Prerequisites**

Before you begin, ensure you have met the following requirements:

- **Node.js and npm:** Install the latest LTS version of Node.js from [nodejs.org](https://nodejs.org/).
  ```bash
  node -v
  npm -v
  ```

- **Angular CLI:** Install Angular CLI globally.
  ```bash
  npm install -g @angular/cli@18
  ```

- **JSON Server:** Install JSON Server globally to simulate a backend.
  ```bash
  npm install -g json-server
  ```

---

## **Installation**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/armani-nail-salon.git
   cd armani-nail-salon
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up JSON Server Data**

   Create a `db.json` file in the project root with the following initial data:

   ```json
   {
     "categories": [],
     "services": [],
     "appointments": []
   }
   ```

---

## **Running the Application**

### **1. Run the JSON Server (Mock Backend)**

Start the JSON Server to serve the mock API endpoints.

```bash
json-server --watch db.json --port 3000
```

- The JSON Server will run at `http://localhost:3000`.
- Available endpoints:
  - `GET /categories`
  - `POST /categories`
  - `GET /services`
  - `POST /services`
  - `GET /appointments`
  - `POST /appointments`

### **2. Run the Angular Application**

In a new terminal window, start the Angular development server.

```bash
ng serve
```

- The application will run at `http://localhost:4200`.

### **3. Access the Application**

- **Customer Interface:** `http://localhost:4200/`
- **Admin Interface:** `http://localhost:4200/admin/login`

---

## **Building for Production**

To build the application for production, run:

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

---

## **Project Structure**

```
armani-nail-salon/
├── db.json                        # JSON Server database file
├── package.json                   # npm package configuration
├── angular.json                   # Angular CLI configuration
├── tsconfig.json                  # TypeScript configuration
├── src/
│   ├── main.ts                    # Entry point of the application
│   ├── index.html                 # Main HTML file
│   ├── styles.scss                # Global styles
│   ├── app/
│   │   ├── app.component.ts       # Root component
│   │   ├── app.routing.module.ts  # Application routing
│   │   ├── customer/              # Customer-facing components and modules
│   │   ├── admin/                 # Admin components and modules
│   │   ├── shared/                # Shared services and models
│   │   └── ...
└── ...
```

---

## **Important Notes**

- **Admin Login Credentials:**
  - Username: `admin`
  - Password: `admin`

- **JSON Server Data Persistence:**
  - Any changes made via the application will update the `db.json` file.
  - Ensure the JSON Server is running whenever you use the application.

- **Image Uploads:**
  - Images are stored as Base64 strings in `db.json`.
  - For production use, consider implementing a proper backend to handle file uploads and storage.

- **Angular Version:**
  - The application is built using Angular v18. Ensure compatibility with your environment.

- **Angular Material:**
  - Angular Material components are used throughout the application for UI consistency.

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page.

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m 'Add some feature'
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request**

   Submit your pull request for review.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Support**

If you have any questions or need assistance, please open an issue in the repository or contact the maintainer.

---

## **Additional Information**

### **Angular CLI Commands**

- **Generate a New Component**

  ```bash
  ng generate component component-name --standalone
  ```

- **Generate a New Service**

  ```bash
  ng generate service service-name
  ```

### **Running Tests**

- **Unit Tests**

  ```bash
  ng test
  ```

- **End-to-End Tests**

  ```bash
  ng e2e
  ```

---

## **Application Routes**

### **Customer Routes**

- `/` - Appointment Booking
- `/book` - Service Catalog
- `/confirmation` - Appointment Confirmation

### **Admin Routes**

- `/admin/login` - Admin Login
- `/admin/appointments` - Appointment List
- `/admin/appointments/:id` - Appointment Details
- `/admin/catalog` - Catalog Management (Categories and Services)

---

## **Quick Start Guide**

1. **Clone and Install**

   ```bash
   git clone https://github.com/your-username/armani-nail-salon.git
   cd armani-nail-salon
   npm install
   ```

2. **Set Up JSON Server**

  - Create `db.json` with initial data.
  - Run `json-server --watch db.json --port 3000`.

3. **Start the Angular Application**

   ```bash
   ng serve
   ```

4. **Access the Application**

  - Customer Interface: `http://localhost:4200/`
  - Admin Interface: `http://localhost:4200/admin/login`

---

## **Common Issues**

- **JSON Server Not Running**

  - Ensure you have started the JSON Server as per the instructions.
  - Verify that `db.json` exists and is correctly formatted.

- **Port Conflicts**

  - If port `4200` or `3000` is in use, you can specify alternative ports:
    - For Angular: `ng serve --port 4300`
    - For JSON Server: `json-server --watch db.json --port 3100`
  - Update the `apiUrl` in services if you change the JSON Server port.

- **Node Module Errors**

  - Delete `node_modules` directory and run `npm install` again.

---

## **Updating Dependencies**

To update Angular and other dependencies to their latest versions:

```bash
ng update @angular/core @angular/cli
```

---

## **Environment Variables**

For security reasons, sensitive data like API keys should not be hard-coded. For this development application, we're using JSON Server without authentication. In a production environment, consider using environment files to store sensitive information.

---

## **Feedback and Suggestions**

Your feedback is valuable! If you have suggestions to improve the application or documentation, please open an issue or submit a pull request.

---

Thank you for using the Armani Nail Salon Booking Application!
