# About

USCIS notifier is a desktop app that notifies you via a desktop notification if your USCIS status has changed. USCIS notifier is built with React on the frontend and Rust on the backend.

Currently, this compiles to an executable that can be run from the command line. A GUI version is currently begin developed right now (see projects section of this repository).

![Screenshot 2021-07-17 155854](https://user-images.githubusercontent.com/57082175/126051114-db583cca-c63e-497a-8838-e699e029e2a8.png)

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
