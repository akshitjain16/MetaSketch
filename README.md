<p align="center">
  <a href="" rel="noopener">
    <img width=960px height=645px src="https://media.licdn.com/dms/image/v2/C4D12AQEAHwh_pta8DQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1645616741443?e=2147483647&v=beta&t=6dz5JYIxacszKLO0fYEZovKXedeTBk7EgLXG7a4RGHI" alt="Metaverse Logo">
  </a>
</p>

<h3 align="center">MetaSketch</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">The MetaSketch is a platform designed to bring people together in virtual, immersive environments. This project enables users to connect, interact, and explore various experiences in the metaverse through a seamless and dynamic interface.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Project Structure](#project_structure)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

The Workspace aims to create a seamless digital environment where users can socialize, collaborate, and experience virtual worlds. Built with a robust backend and intuitive frontend, this project is designed to support dynamic interactions, real-time communications, and multimedia sharing within the metaverse.

## 🏗 Project Structure <a name = "project_structure"></a>

This Turborepo includes the following packages/apps:

### Apps
- `http`: REST API server
- `web`: Next.js frontend application

### Packages
- `db`: Database schema and migrations using Prisma
- `eslint-config`: Shared ESLint configurations
- `typescript-config`: Shared TypeScript configurations
- `ui`: Shared React component library

## 🏁 Getting Started <a name = "getting_started"></a>

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run the project locally, make sure you have these installed:

- [Node.js](https://nodejs.org/) - v18 or higher
- [Docker](https://www.docker.com/) - For containerized environments
- [Kubernetes](https://kubernetes.io/) - For managing deployments
- [Cert-Manager](https://cert-manager.io/docs/) - For SSL certificates
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/) - For GitOps and CI/CD

### Installing

Clone the repository:

```bash
git clone https://github.com/akshitjain16/MetaSketch.git
cd community
```

Install dependencies:

```bash
pnpm install
```

Set up environment variables:

```bash
cp .env.example .env
```

### Running the Application Locally

To run the application locally:

```bash
pnpm dev
```

To start with Docker:

```bash
docker-compose up
```

## 🔧 Running the Tests <a name = "tests"></a>

We use Jest for testing the application. Run the following command to execute tests:

```bash
npm test
```

### Break down into end-to-end tests

End-to-end tests cover user scenarios within the platform, like authentication and interactive functionalities.

```bash
npm run test:e2e
```

### Code Style Tests

To maintain code quality and style, run:

```bash
npm run lint
```

## 🎈 Usage <a name="usage"></a>

Once deployed, users can sign up, sign in, and explore the metaverse through their personalized profiles. Interactive features include messaging, customizable avatars, and access to virtual spaces.

## 🚀 Deployment <a name = "deployment"></a>

To deploy the MetaSketch to a live environment, follow these steps:

1. **Dockerize the Application**:
    ```bash
    docker build -t akshitjain16/metaSketch .
    docker push akshitjain16/metaSketch
    ```

2. **Deploy to Kubernetes**:
   - Set up a Kubernetes cluster and configure the manifests.
   - Deploy with ArgoCD:
     ```bash
     kubectl apply -f deployment.yaml
     ```

3. **GitOps with ArgoCD**:
   - Initialize a GitOps repository.
   - Set up ArgoCD to automatically synchronize and deploy new changes.

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [React](https://reactjs.org/) - Web Framework
- [Node.js](https://nodejs.org/) - Server Environment
- [Docker](https://www.docker.com/) - Containerization
- [Kubernetes](https://kubernetes.io/) - Deployment Management
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/) - GitOps

## ✍️ Authors <a name = "authors"></a>

- [@akshitjain16](https://github.com/akshitjain16) - Project Owner & Lead Developer

See also the list of [contributors](https://github.com/akshutjain16/MetaSketch/contributors) who participated in this project.

## 🎉 Acknowledgments <a name = "acknowledgement"></a>

- Thanks to the open-source community
- Inspired by advancements in virtual technology and online communities