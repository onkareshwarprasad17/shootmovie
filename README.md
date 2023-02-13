# SHOOTMovie

SHOOTMovie is a ReactJS project which lists movies, and show their respective details.

## Description

This project fetches a list of popular movies from TMDB API and shows it in the browser. It is built using ReactJS along with AntDesign UI. I have used Redux for the state management. And, for testing the components, I have used Jest and RTL.

As of now, for login and logout functionality, I have mocked the implementation by using a JSON file from the src/assets folder.

I plan to add more features and UI components to this project, in the near future.

## Built with

* HTML5
* CSS
* JavaScript
* ReactJS
* Redux
* AntDesign UI
* Jest and RTL

## Steps to run the project on local machine

1. Clone the repository on your local machine.
2. Run below commands in your terminal from the project folder.
    ```powershell
    npm install 
    npm start
    ```
3. Provide any username and respective password as per the json file(userDetails.json)

### Dependencies to install

* Install [NodeJS](https://nodejs.org/en/download/) package manager.
* Install [AntDesign](https://ant.design/docs/react/introduce#installation) UI Library.
* Install react-redux, by running below command:-
    ```powershell
    npm install react-redux
    ```
* Install Jest DOM by running below command:-
    ```powershell
    npm i @testing-library/jest-dom
    ```

### Important constants needed to get movie details

You would have to login and register at [TMDB API](https://www.themoviedb.org/) to get your own API Key.

* API_KEY = `https://api.themoviedb.org/3/movie/popular?api_key=your-own-key`
* API_IMG = `https://image.tmdb.org/t/p/w500/`
* MOVIE_URL = `https://api.themoviedb.org/3/movie/${movie-id}?api_key=your-own-key&language=en-US`

___
I appreciate your effort of checking-out this repository. Thanks!
___
