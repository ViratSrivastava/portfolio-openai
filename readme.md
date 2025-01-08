# Portfolio Website Structure

```plaintext
.gitignore
package.json
public/
    assets/
        images/
        project/
        resume/
    css/
        profile.css
        project.css
        styles.css
    index.html
    js/
        app.js
        LiveStockChart.jsx
        script.js
    project1.html
    project2.html
    project3.html
    project4.html
    project5.html
    project6.html
    project7.html
    projects.html
    resume-skills.html
readme.md
server.js
tailwind.config.js
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