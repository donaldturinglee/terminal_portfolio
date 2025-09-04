<a id="readme-top"></a>


<br />
<div align="center">
  <a href="https://github.com/donaldturinglee/terminal_portfolio">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=terminal&theme=dark" alt="Terminal Logo" width="80" height="80">
  </a>

<h3 align="center">Terminal Portfolio</h3>

  <p align="center">
    An interactive terminal-style portfolio website built with React and TypeScript
    <br />
    <a href="https://github.com/donaldturinglee/terminal_portfolio"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://donaldturinglee.com">View Demo</a>
    ·
    <a href="https://github.com/donaldturinglee/terminal_portfolio/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/donaldturinglee/terminal_portfolio/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#customization">Customization</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Terminal Portfolio is an innovative, interactive web-based portfolio that replicates the experience of a Unix/Linux
terminal environment. This project combines nostalgia for command-line interfaces with modern web technologies to create
a unique and engaging user experience for showcasing personal and professional information.

The portfolio features a fully functional terminal emulator with customizable themes, command history, tab completion,
and a comprehensive set of commands for navigating through different sections. Built with performance and accessibility
in mind, it provides both keyboard and mouse interactions while maintaining the authentic feel of a real terminal
session.

This project is perfect for developers, system administrators, and tech enthusiasts who want to showcase their skills in
a creative and interactive way that stands out from traditional portfolio websites.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

This project leverages modern web development technologies and tools:

[![React][React]][React-url] &nbsp;
[![TypeScript][TypeScript]][TypeScript-url] &nbsp;
[![Webpack][Webpack]][Webpack-url] &nbsp;
[![Sass][Sass]][Sass-url] &nbsp;
[![TailwindCSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

* Node.js (version 16 or higher)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/donaldturinglee/terminal_portfolio.git
   ```
2. Navigate to the project directory
   ```sh
   cd terminal_portfolio
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create environment file for GitHub data (optional)
   ```sh
   cp .env.example .env
   # Add your GitHub token if you want to fetch real GitHub data
   ```
5. Fetch GitHub data (optional)
   ```sh
   npm run fetch-github
   ```
6. Start the development server
   ```sh
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

### Development

Start the development server with hot module replacement:

```sh
npm run dev
```

The application will be available at `http://localhost:3000` with automatic reloading when you make changes.

### Production Build

Create an optimized production build:

```sh
npm run build
```

The build artifacts will be stored in the `build/` directory, ready for deployment.

### GitHub Data Fetching

Fetch your latest GitHub repositories and profile data:

```sh
npm run fetch-github
```

This will update the `src/data/github.json` file with your latest GitHub information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

```
terminal_portfolio/
├── public/
│   ├── index.html              # HTML template
│   └── favicon.ico             # Site favicon
├── src/
│   ├── component/              # React components
│   │   ├── footer/             # Footer component
│   │   ├── header/             # Header component
│   │   ├── navigation/         # Navigation component
│   │   └── terminal/           # Terminal emulator components
│   │       ├── Terminal.tsx    # Main terminal component
│   │       ├── terminal.scss   # Terminal styles
│   │       └── TerminalWelcomeMessage.tsx
│   ├── config/                 # Configuration files
│   │   ├── file.ts            # File system configuration
│   │   ├── github.ts          # GitHub API configuration
│   │   ├── navigation.ts      # Navigation routes
│   │   ├── profile.ts         # Personal profile data
│   │   ├── service.ts         # Services configuration
│   │   ├── terminal.ts        # Terminal settings
│   │   └── theme.ts           # Theme configuration
│   ├── context/               # React contexts
│   │   └── theme.tsx          # Theme context provider
│   ├── data/                  # Static data files
│   │   └── github.json        # GitHub data cache
│   ├── page/                  # Page components
│   │   ├── 404.tsx           # 404 error page
│   │   ├── profile.tsx       # Profile page
│   │   ├── project.tsx       # Projects page
│   │   └── service.tsx       # Services page
│   ├── type/                  # TypeScript type definitions
│   │   └── resource.ts        # Resource type definitions
│   ├── asset/                 # Static assets
│   │   ├── image/            # Images
│   │   └── svg/              # SVG icons
│   ├── App.tsx               # Main App component
│   ├── index.tsx             # Application entry point
│   └── index.css             # Global styles
├── script/
│   └── get_github_data.js    # GitHub data fetching script
├── babel.config.json         # Babel configuration
├── webpack.dev.config.js     # Development Webpack config
├── webpack.prod.config.js    # Production Webpack config
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs       # PostCSS configuration
└── package.json             # Project dependencies and scripts
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Customization

### Personalizing Your Portfolio

1. **Update Profile Information**
   ```typescript
   // src/config/profile.ts
   export const profile: IProfile = {
     title: "Your Title",
     firstName: "Your Name",
     email: "your.email@example.com",
     // ... other profile data
   };
   ```

2. **Modify Terminal Configuration**
   ```typescript
   // src/config/terminal.ts
   export const terminal = {
     username: "yourname",
     hostname: "portfolio",
     theme: "your-preferred-theme",
     // ... other terminal settings
   };
   ```

3. **Add Custom Commands**
   ```typescript
   // src/config/terminal.ts
   customCommands: {
     "your-command": {
       description: "Your command description",
       output: ["Command output line 1", "Command output line 2"],
       action: "navigate", // or "external"
       target: "/your-route"
     }
   }
   ```

4. **Customize Themes**
   ```scss
   // src/component/terminal/terminal.scss
   .theme-your-theme {
     --theme-background: #your-bg-color;
     --theme-text: #your-text-color;
     // ... other theme variables
   }
   ```

   
## Deployment

This project uses automated deployment to GitHub Pages via GitHub Actions. The deployment workflow automatically builds and deploys your portfolio whenever you push changes to the main branch.

### Complete Deployment Example

Here's a step-by-step guide using the actual GitHub Actions workflow from this project:

#### 1. GitHub Actions Workflow Setup

Create `.github/workflows/deploy.yml` in your repository with the following content:

```yaml
name: Deploy portfolio to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20.x
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      # Replace with your custom domain (or remove this step if not using custom domain)
      - name: Create CNAME file
        run: echo "yourdomain.com" > build/CNAME

      # Update with your GitHub username and email
      - name: Configuration environment
        env:
          PORTFOLIO_DEPLOY_KEY: ${{ secrets.PORTFOLIO_DEPLOY_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "$PORTFOLIO_DEPLOY_KEY" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan github.com >> ~/.ssh/known_hosts
          git config --global user.name "yourusername"
          git config --global user.email "your-email@example.com"

      # Update with your GitHub Pages repository URL
      - name: Deploy to GitHub Pages
        run: |
          cd build
          git init
          git checkout -b main
          git remote add origin git@github.com:yourusername/yourusername.github.io.git
          git add .
          git commit -m "Auto modified at $(date -u +'%Y-%m-%d %H:%M:%S')"
          git push -f origin main
```

#### 2. Prerequisites Setup

**Create GitHub Pages Repository:**
```bash
# Create a repository named: yourusername.github.io
```

**Generate SSH Deploy Key:**
```bash
# Generate SSH key pair for deployment
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/deploy_key

# This creates two files:
# ~/.ssh/deploy_key (private key) - for GitHub Secrets
# ~/.ssh/deploy_key.pub (public key) - for Deploy Keys
```

#### 3. Repository Configuration

**Configure Secrets in Source Repository:**
1. Go to your portfolio repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `PORTFOLIO_DEPLOY_KEY`
4. Value: Content of your private key file (`~/.ssh/deploy_key`)

**Add Deploy Key to GitHub Pages Repository:**
1. Go to your `yourusername.github.io` repository → Settings → Deploy keys
2. Click "Add deploy key"
3. Title: "Portfolio Deploy Key"
4. Key: Content of your public key file (`~/.ssh/deploy_key.pub`)
5. Check "Allow write access"

#### 4. Custom Domain Setup (Optional)

**DNS Configuration:**
```dns
# A records for apex domain
Type: A, Name: @, Value: 185.199.108.153
Type: A, Name: @, Value: 185.199.109.153
Type: A, Name: @, Value: 185.199.110.153
Type: A, Name: @, Value: 185.199.111.153

# CNAME for www subdomain
Type: CNAME, Name: www, Value: yourusername.github.io
```

**GitHub Pages Custom Domain:**
1. Go to `yourusername.github.io` repository → Settings → Pages
2. Custom domain: Enter your domain (e.g., `yourdomain.com`)
3. Enable "Enforce HTTPS"

#### 5. Deployment Process

**Automatic Deployment:**
1. Push changes to the `main` branch
2. GitHub Actions automatically triggers
3. Builds the project with `npm run build`
4. Creates CNAME file for custom domain
5. Configures SSH authentication
6. Deploys to GitHub Pages repository
7. Your website updates automatically

**Manual Deployment (Alternative):**
```bash
# Build the project locally
npm run build

# deploy manually
cd build
git init
git add .
git commit -m "Deploy"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -f origin main
```

#### 6. Monitoring & Verification

**Check Deployment Status:**
- Monitor progress in repository → Actions tab
- View build logs for troubleshooting
- Verify deployment success in GitHub Pages repository

**Live Website:**
- Standard: `https://yourusername.github.io`
- Custom domain: `https://yourdomain.com`

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/donaldturinglee/terminal_portfolio/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=donaldturinglee/terminal_portfolio" alt="contrib.rocks image" />
</a>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Donald Turing Lee - [@donaldturinglee](https://github.com/donaldturinglee)

Project
Link: [https://github.com/donaldturinglee/terminal_portfolio](https://github.com/donaldturinglee/terminal_portfolio)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[React]: https://go-skill-icons.vercel.app/api/icons?i=react&theme=dark

[React-url]: https://react.dev/

[TypeScript]: https://go-skill-icons.vercel.app/api/icons?i=typescript&theme=dark

[TypeScript-url]: https://www.typescriptlang.org/

[Webpack]: https://go-skill-icons.vercel.app/api/icons?i=webpack&theme=dark

[Webpack-url]: https://webpack.js.org/

[Sass]: https://go-skill-icons.vercel.app/api/icons?i=sass&theme=dark

[Sass-url]: https://sass-lang.com/

[TailwindCSS]: https://go-skill-icons.vercel.app/api/icons?i=tailwindcss&theme=dark

[TailwindCSS-url]: https://tailwindcss.com/
