# Disney Plus Clone

### React + Redux Toolkit + React Query + Redux Observable (Rxjs) + Typescript

## Motivation

In our professional lives, we are seldom given carte blanche to use the latest tech or libraries in our app. In reality, those decisions are made by upper management or we work on an existing app with already defined tech.
<br /><br />
Therefore, I took the challenge of creating a Disney Plus clone to sharpen my skill sets, practice reverse engineering, showcase the latest ReactJS tech, and to “flex” a little and have some fun.

### Learnings

- The user interface design of Disney Plus is well thought out. The user interface designer really did their homework and put thought into designing elements that can be composed into more advanced elements.

  - In ReactJS terms, this meant I was able to create base components that would be reused as the starting point for a more advanced component. In ReactJS, this is known as component composition.

  - For example, I created the ProgressCard component by compositing the Card component. Source for the [Card](https://github.com/patricktran/disney-plus-clone/tree/main/src/components/card) component

- Customizing the [Shaka Video Player](https://github.com/shaka-project/shaka-player) to “look and feel” like the Disney Plus Player was a project of its own and took a lot of effort. We live in a world where virtually every website has a video player. However, not all video players are built the same. The Disney Plus Player is one of the best out there.

  - Creating custom Overlays to work with Shaka Player required some clever problem solving. Enter **React.Portal** 😄

  - I ended up creating custom player controls for volume slider, rewind, and fast-forward.

    - Check out my [shaka-player-ui-controls](https://www.npmjs.com/package/shaka-player-ui-controls) NPM package

- [Redux Toolkit](https://redux-toolkit.js.org/) really cuts down the usual Redux boilerplate code. [ReactQuery](https://tanstack.com/query/v4/docs/overview) is the best way to go when you need to fetch data without sharing it globally. I also integrated ReduxToolkit (RTK) Query and Redux Observable (RxJS) for use cases where it would make sense to store the response in Redux.

- You can boost rendering performance by using the [Interaction Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to perform lazy loading and lazy rendering. Nifty stuff.

- [Styled Components](https://styled-components.com/) (CSS-in-JS) are awesome! Although there seems to be a shift towards TailWindCSS?

## Demo

Data comes from Mockit endpoints: https://mockit.netlify.app/  
See: [dplus-mockit-server/configuration/routes.json](https://github.com/patricktran/disney-plus-clone/blob/main/dplus-mockit-server/configuration/routes.json)

### How to run

> Requires [Docker](https://www.docker.com/products/docker-desktop/) to run Mockit server.

```console
cd dplus-mockit-server
docker-compose up --build -d

cd ... //go back to root (React App)
npm install
npm run dev
```

### Features

React  
Styled Components  
Redux Toolkit  
Lazy Loading Images/Elements  
Redux Observable (RxJS/Epics)  
RTK Query  
React Query
