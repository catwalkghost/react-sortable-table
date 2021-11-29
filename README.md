# React/Redux Table with Search, Sorting, and Pagination

![ Screenshot ](https://github.com/catwalkghost/website-log-reader/raw/master/static/screenshot.png "Screenshot")

## Project Summary
This is sample React project, which loads data from an external JSON file and displays it in a table. The table supports filtering (case-insensitive search), sorting options per column (ascending/descending), and has options to changle the amount of entries per page.
The project uses Nivo library to visualise DOB data as a pie chart. The chart works with filtered data and supports display by day, month, and year. Visualisation functionality can be extended further.
The project uses modern Redux capabilities — Redux Toolkit, slices, async thunk, etc. These simplify the syntax and make the project more scalable.
While this project has been set up as a scalable app, some files can benefit from being broken down into several one. Overall structure can be improved.

## Project Set Up
The project doesn't use CRA or similar for bootstrapping. Instead, it is set up using own generic Webpack boilerplate.

The project aims for quality and readable code and uses ESLint and Prettier (AirBnB Rules).

While the project doesn't use TypeScript, it takes advantage of PropTypes library to perform type checking. Additional type checking is done with helper functions, when possible.

The project is styled using SCSS.

## Dependencies
The project uses the following libraries:

[Redux](https://redux.js.org/)

[Nivo](https://nivo.rocks/) — a data visualisation library built on top of D3.

[FPX](https://github.com/mitranim/fpx) — a perofrmance-optimised Loadah-like library

[Stylebox](https://aristovpro.github.io/stylebox/#about) — a small SCSS library with a collection of atomic classes

## Tests
Test suite has been set up, but tests have not been written due to the lack of time. They can be added upon request.

## Available Scripts

```npm i``` or ```yarn```
Available Scripts
In the project directory, you can run:

```npm start``` or ```yarn start```
Runs the app in the development mode.
Automatically opens http://localhost:3000 in your default browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

```npm build:dev``` or ```yarn build:dev```
Bundles the app in development mode and creates the development build of the app in the dist folder.

```npm build:prod``` or ```yarn build:prod```
Bundles the app in production mode and creates the production build of the app in the build folder.

```npm test``` or ```yarn test```
Runs all the tests for the app (using Jest & Enzyme) and outputs the results of the tests in the terminal.

