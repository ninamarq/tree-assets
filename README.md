# Tree Assets 🌲

Welcome to the Tree Assets! 🚀

## Description ✏️

This repository explores techniques for developing and rendering an expensive amount of data, approaching the best performance using memoization and cache techniques. The application was built using TypeScript, Next.js (leveraging app routes), React Query (Tanstack) and Axios.

## Development and technologies 🧠

For this project, the technologies used were:

- [React query (Tanstack query)](https://tanstack.com/query/v3/):
  - React query was employed to cache the fake API results, optimizing performance by preventing unnecessary rerenders or refetching, ensuring clean asynchronous data management.
- [Next.js](https://nextjs.org/)
  - Next.js was chosen for its superior route performance, utilizing the [App route](https://nextjs.org/docs/app/building-your-application/routing) architecture. The directory structure inside /app represents each page/route in the project, providing efficient page routing, pushing, and parameter management.
- [Axios](https://axios-http.com/docs/intro)
  - Axios was utilized for enhanced asynchronous method handling, primarily for mocking requests using its [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) package. It was configured to simulate requests and introduce a 1500ms delay, enhancing the simulation of real user experiences.

## What would I do different? 🤔

- Testing with Cypress
  - Implementing comprehensive testing covering at least 80% of the project files and functionalities would ensure a safer user experience with Cypress. It is a great test runner to scale the project.
- Zustand or Valtio
  - Considering the utilization of either Zustand or Valtio for better state and data management to enhance scalability and performance. These libraries would facilitate secure and efficient development of Tree Assets, benefiting both users and developers in terms of data control and faster feature design or maintenance.
- Another approach for handling large amounts of data
  - Implementing pagination for trees with over 100 parent nodes to prevent processing more than 1,000 elements simultaneously, thus avoiding potential issues with code and data interpretation.

## Demonstration 🎬

Here we have the results obtained.

### Tree without filter and/or asset's selection
![image](https://github.com/ninamarq/tree-assets/assets/73175981/2c42b567-5058-4581-8b86-8d7459b43e95)

### Tree with input filter
![image](https://github.com/ninamarq/tree-assets/assets/73175981/1b8b2aeb-5a69-46eb-a191-574ef6270cb0)

### Tree with energy sensor type selected filter
![image](https://github.com/ninamarq/tree-assets/assets/73175981/73297d96-419a-4278-be77-b6bd938d02f1)

### Tree with alert status selected filter
![image](https://github.com/ninamarq/tree-assets/assets/73175981/559f2e27-ddea-47e5-9fd3-08a7a7b3748f)

### Display of asset selected
![image](https://github.com/ninamarq/tree-assets/assets/73175981/547a98f4-b2c3-44dc-8592-7bd58d39e70d)

### Responsive layout when using in mobile
<img src="https://github.com/ninamarq/tree-assets/assets/73175981/d11819cd-0241-4b86-9e91-7e6eeb1b8f4b" height="400px" />


## Instructions 📑

To run the app, follow these steps:

- First, clone the repository

```bash
git clone git@github.com:ninamarq/tree-assets.git
```

- After clonning the project, open it on VSCode or another code editor. Then, open the project and install dependencies

```bash
npm install
```

- Run the project

```bash
npm run dev
```

- Now, access the link on you terminal, or just try accessing `http://localhost:3000`.

That's it

### Thank you for being here!

## Created by me [@ninamarq](https://linktr.ee/ninamarq) 🚀✨
