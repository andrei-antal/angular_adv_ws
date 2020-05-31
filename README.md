# Advanced Angular Workshop

### with Andrei Antal (contact me at: [antal.a.andrei@gmail.com](mailto:antal.a.andrei@gmail.com))

The starter project we’re going to use was created using the [Angular CLI](https://cli.angular.io/). This tool allows us to quickly scaffold an Angular project that’s ready to build upon. The sample project uses `Angular 9`.

## Initial setup

## 1. Environment

Make sure you have Node installed on your machine (Node version >= 12 and NPM >= 6).
If not, install node and follow the instructions from [their homepage](https://nodejs.org/en/download/) and make sure you choose the version corresponding to you machine.

## 2. Installing the Angular CLI

Open your terminal/command prompt application and install the Angular CLI globally because it will allow us to access the `ng` command from anywhere.

- Run the following command:

```
npm install -g @angular/cli
```

To check if the tool installed correctly, type in the following command to output the version:

```
ng --version
```

## 3. Get the code and install the dependencies

Navigate to your work folder and clone the git repository.

- Run the following command

```
git clone https://github.com/andrei-antal/angular_adv_ws.git
```

- Navigate to the project folder

```
cd angular_adv_ws
```

- After you've navigated to the project folder, install project dependencies using the following command:

```
npm install
```

- If the installation terminated without errors, you can now start the application by running the following command:

```
ng serve
```

This will start a local development server with live reload options (Every time you change the code and save a file, the app will automatically restart). Open the browser and navigate to the following address: [http://localhost:4200](http://localhost:4200). If the app started correctly, congratulations, you’re all set!
