# Portfolio Website Structure

```plaintext
portfolio-website/
├── public/
│   ├── index.html
│   ├── projects.html
│   ├── resume-skills.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── server.js
├── package.json
└── node_modules/
```

# Initialize the Project
Run the following command to initialize a new Node.js project:

```bash
npm init -y
```

This will create a package.json file with default settings.

# Install Dependencies

Install Core Dependencies:

Install a web server for development (e.g., express or a static file server):
```bash
npm install express
```

Install Development Tools:
For front-end development tools like live server and build tools:
```bash
npm install nodemon --save-dev
```

Optional (for CSS Frameworks):
using TailwindCSS:
```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
```

Run the server:
```bash
node server.js
```

run locally 
```
http://localhost:3000
```