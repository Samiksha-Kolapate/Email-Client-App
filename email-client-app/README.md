A simple email client built with React Native that allows users to view email drafts, create or edit drafts, and send emails. This app is built using TypeScript, Redux Toolkit for state management, React Navigation for screen transitions, and json-server for mocking the API.

# Features
1.Home Screen:
- View a list of email drafts.
- Display subject, recipient(s), and status of each draft (Draft or Sent).
- Option to create a new draft.

2.Email Editor Screen:
- Create or edit an email draft.
- Save the draft locally and send it using the "Send Email" button.
- Fields for email recipient(s), subject, and body.

3.Email Sending:
- Uses json-server as a mock backend.
- On successful sending:
- Marks the draft as "Sent."
- Displays a confirmation modal or toast message.

4.Logout:
- Allows users to logout and clears their data (simulating user authentication).

# Requirements
React Native: The latest stable version.
TypeScript: For strong typing and better code quality.
Redux Toolkit or React Context API: For state management.
React Navigation: For handling screen transitions.
json-server: For mocking a backend API.
Setup & Installation
1. Clone the Repository
Clone the repository to your local machine: git clone https://github.com/Samiksha-Kolapate/Email-Client-App/tree/master/email-client-app

2. Install Dependencies
npm install

3. Start the JSON Server
json-server --watch db.json --port 5000

4. Run the App
npx expo start

# Assumptions & Challenges
Assumptions:
-The app assumes the user is already authenticated for the email client.

Challenges:
-Ensuring proper state management with Redux Toolkit.

Bonus Features
-Toast Notifications: For successful email sending and error handling.