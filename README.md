# Open Weather Web APP in Angular

## [Live Demo - Web APP](https://web-kev-weather-ae66.azurewebsites.net)

Be free to play with the web app

## Project Structure

```
dist/                        compiled version
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- api/                   api service
|  |- services/              infrastructure service
|  |- city-weather/          city weather component (for weather report's description)
|  |- weather/               weather query component (for city & country inputs)
|  |- nav/                   navigation component
|  |- material/              material module 
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- interface.d            strong typed intefaces to various API responses
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- index.html                html entry point
|- styles.scss               global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
```

## Tech Stack
- [Angular 12](https://angular.io)
- [Angular Material UI](https://material.angular.io/)
- Azure Web App (Live Demo Host)

## Build & Run 
 - Clone or donwload project
 - Open folder kev-openweather by Visual Studio Code
 - In the terminal run below commands
   - `npm install`  - Install all depedencies
   - `npm run build` - Build app in `dist/` folder
   - `npm run build-prod` - Build app for production in `dist/` folder
   - `npm run start` - Start a dev server and opens browser with running app on http://localhost:4202


## Testing
- Using [Demo App Link](https://web-kev-weather-ae66.azurewebsites.net)

## Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).

