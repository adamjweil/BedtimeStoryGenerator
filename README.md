# React StoryGenerator (OpenAI) App

This is a React-based web application that uses OpenAI's API to generate stories. Users can register, log in, and access their account page to view their generated stories, update their profile information, and manage their account.

## Getting Started

To run this app locally, you will need to have Node.js and npm installed on your computer. You can download them from the official Node.js website.

Once you have Node.js and npm installed, follow these steps:

1. Clone this repository to your local machine
2. Install dependencies by running `npm install` in the root directory of the project
3. Create a `.env` file in the root directory of the project and add your OpenAI API key as follows:

REACT_APP_OPENAI_API_KEY=your_api_key_here


4. Start the app by running `npm start`

The app should now be running on `localhost:3000`.

## Features

### User Authentication

This app allows users to register and log in to their account using a username and password. Once logged in, the user's authentication token is stored in local storage and used for future API requests.

### Generate Story Page

On the Generate Story page, users can input a prompt and use OpenAI's GPT-3 API to generate a story based on that prompt. The generated story is displayed on the page for the user to read.

### My Account Page

On the My Account page, users can view and edit their profile information, including their name, location, and description. Users can also upload a profile picture and view their generated stories.

#### Profile Picture

Users can upload a profile picture by selecting a file from their device and submitting the form. The uploaded picture will be displayed on the page.

#### Name

Users can view their name and edit it by clicking the "Edit" button. They can then type in a new name and save their changes by clicking the "Save" button. Users can cancel their changes by clicking the "Cancel" button.

#### Location

Users can view their location and edit it by clicking the "Edit" button. They can then type in a new location and save their changes by clicking the "Save" button. Users can cancel their changes by clicking the "Cancel" button.

#### Description

Users can view their description and edit it by clicking the "Edit" button. They can then type in a new description and save their changes by clicking the "Save" button. Users can cancel their changes by clicking the "Cancel" button.

### Logout

Users can log out of their account by clicking the "Logout" button in the navigation bar.

## Technologies Used

- React
- React Router
- React Bootstrap
- OpenAI API
- jwt-decode
- axios

## Contributing

If you would like to contribute to this project, please open a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

If you have any questions or comments about this project, please feel free to contact the author at [email address].


### Need to ask GPT a question about this app? Here is a detailed summary for easy copy & pasting

The React OpenAI App is a web application that allows users to generate stories using OpenAI's API. The app is built using the React framework and uses several other technologies, including React Router, React Bootstrap, jwt-decode, and axios.

The app features user authentication, which allows users to register and log in to their account using a username and password. Once logged in, the user's authentication token is stored in local storage and used for future API requests.

On the Generate Story page, users can input a prompt and use OpenAI's GPT-3 API to generate a story based on that prompt. The generated story is displayed on the page for the user to read.

The My Account page allows users to view and edit their profile information, including their name, location, and description. Users can also upload a profile picture and view their generated stories.

Users can upload a profile picture by selecting a file from their device and submitting the form. The uploaded picture will be displayed on the page.

Users can view their name and edit it by clicking the "Edit" button. They can then type in a new name and save their changes by clicking the "Save" button. Users can cancel their changes by clicking the "Cancel" button.

Users can view their location and edit it by clicking the "Edit" button. They can then type in a new location and save their changes by clicking the "Save" button. Users can cancel their changes by clicking the "Cancel" button.

Users can view their description and edit it by clicking the "Edit" button. They can then type in a new description and save their changes by clicking the "Save" button. Users can cancel their changes by clicking the "Cancel" button.

Users can log out of their account by clicking the "Logout" button in the navigation bar.

To run the app locally, users will need to have Node.js and npm installed on their computer. They can then clone the repository to their local machine, install dependencies by running npm install in the root directory of the project, create a .env file in the root directory of the project and add their OpenAI API key, and start the app by running npm start.

The app is licensed under the MIT License and contributions are welcome via pull requests. If you have any questions or comments about the project, you can contact the author at [email address].