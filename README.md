# Disney Plus Clone

> Tech Showcase

### React + Redux Toolkit + React Query + Redux Observable (Rxjs) + Typescript

## Motivation

In our professional lives, we are seldom given carte blanche to use the latest tech or libraries in our app. In reality, those decisions are made by upper management or we maintain an existing app with predefined tech.
<br /><br />
Therefore, I took the challenge of creating a Disney Plus clone to sharpen my skill sets, practice reverse engineering, showcase the latest ReactJS tech, and to “flex” a little and have some fun.
<br /><br />

[![](/disney-plus-clone-youtube.png)](https://youtu.be/fmLhI8G993Y)
[Disney Plus Clone Demo - Youtube](https://youtu.be/fmLhI8G993Y)
<br /><br />

### Learnings

- The user interface (UI) design of Disney Plus is well thought out. The UI designer really did their homework into designing elements that can be composed into more advanced elements.

  - In ReactJS terms, this meant I was able to create base components that would be reused as the starting point for a more advanced component. In ReactJS, this is known as component composition.

  - For example, I created the ProgressCard component by compositing the Card component. [Source code](https://github.com/patricktran/disney-plus-clone/tree/main/src/components/card)

- Customizing the [Shaka Video Player](https://github.com/shaka-project/shaka-player) to “look and feel” like the Disney Plus Player was a project of its own and took a lot of effort. We live in a world where virtually every website has a video player. However, not all video players are built the same. The Disney Plus Player is one of the best out there.

  - Creating custom Overlays to work with Shaka Player required some clever problem solving. Enter [React.Portal](https://reactjs.org/docs/portals.html) 😄

  - I ended up creating custom player controls for volume slider, rewind, and fast-forward.

    - Check out my [shaka-player-ui-controls](https://www.npmjs.com/package/shaka-player-ui-controls) NPM package

- [Redux Toolkit](https://redux-toolkit.js.org/) really cuts down the usual Redux boilerplate code. [ReactQuery](https://react-query-v3.tanstack.com/overview) is the best way to go when you need to fetch data without sharing it globally. I also integrated ReduxToolkit (RTK) Query and Redux Observable (RxJS) for use cases where it made sense to store the response in Redux.

  - Redux Toolkit and ReactQuery have built-in data caching and query retries.

- You can boost rendering performance by using the [Interaction Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to perform lazy loading and lazy rendering. Nifty stuff.

- I really enjoyed using [Styled Components](https://styled-components.com/) (CSS-in-JS) it prevented having to hunt across different files! Although there seems to be a shift towards TailWindCSS?

## Disney Plus Clone App

Data comes from Mockit endpoints: https://mockit.netlify.app/  
See: [dplus-mockit-server/configuration/routes.json](https://github.com/patricktran/disney-plus-clone/blob/main/dplus-mockit-server/configuration/routes.json)

> The video player will always play [Big Buck Bunny.](https://en.wikipedia.org/wiki/Big_Buck_Bunny) <br/> The Episodes tab will always show thumbnails for The Simpsons.

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

### Next Steps

- Upgrade to React 18
- Migrate to NextJS
  - This would allow me to remove the MockIt Docker Container dependency from this project since NextJS supports API routes

## Screens

> Yes, these are actual screenshots from my Display Plus clone app!

![screenshot](/disney-plus-clone-main.png?raw=true)

<br />

![screenshot](/disney-plus-clone-detail.png?raw=true)

<br />

![screenshot](/disney-plus-clone-intro.png?raw=true)

<br />

![screenshot](/disney-plus-clone-video-player.png?raw=true)

<br />

![screenshot](/disney-plus-clone-video-player-overlay.png?raw=true)
