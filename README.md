# Adrenaline

# React Native Project Directory Structure

When setting up a React Native project, it's important to think about the directory structure and how to organize the files and folders in a way that is reusable, clear, and efficient. Here are some common directory names and what kinds of files or components they might contain:

## `components`

The `components` directory is typically used for reusable UI components that can be used across the application. These might include buttons, inputs, cards, and other visual elements that are used in multiple screens or sections of the app.

## `screens`

The `screens` directory is typically used for the top-level screens or views of the application. These might include the home screen, profile screen, settings screen, and so on. Each screen might contain multiple components and might be composed of other screens or sub-screens.

## `utils`

The `utils` directory is typically used for utility functions or helper functions that are used throughout the application. These functions might be used for things like formatting data, validating input, or manipulating strings and arrays.

## `assets`

The `assets` directory is typically used for static assets that are used in the application, such as images, icons, fonts, and other media files.

## Note about the `Button` folder

The `Button` directory does not contain any HTML or CSS files because in a React Native application, the styling is typically done using JavaScript and the React Native styling API. The `Button` directory might contain a component file that defines the behavior and appearance of the button, along with any associated images or other assets.

## Note about the `api.js` file

The `api.js` file is a common way to connect a React Native front-end application to a back-end API or server. The `api.js` module encapsulates the logic for making HTTP requests to the back-end API and handling the responses, so that other parts of the application can use the API without having to worry about the implementation details. By using a module like `api.js`, you can keep the API code organized and modular, and make it easier to switch between different back-end APIs or servers if needed.

