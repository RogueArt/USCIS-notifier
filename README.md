# About

USCIS notifier is a web app and daemon that notifies you via email and a desktop notification if your USCIS status has changed. USCIS notifier is built using HTML/CSS/JS on the frontend and vanilla JS on the backend.

# Usage

You can use the web interface to modify the options for USCIS notifier:

Options include:
- Providing and labeling IDs through the web interface.
- Disabling/enabling email, text, and/or desktop notifications.
- Changing frequency of status checks (by default it checks every hour).

# Installation

1. Clone this repository by running `REPLACE-THIS-LATER` through console.
2. Navigate to this repository through the terminal, run `npm i` to install packages.
3. Use `npm config` to configure and add IDs to the process.
4. Use `npm start` to start the background service (daemon) and watch for status updates.