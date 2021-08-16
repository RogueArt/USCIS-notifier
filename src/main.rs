// For delaying and for current time
use std::thread;

// For saving and reading from a file
mod json;
use json::CaseStatus;

// For sending notifications
mod notify;

// Get utility functions
mod lib;
use lib::{
    get_current_status_from_id, get_current_time, is_valid_id, FILE_PATH, REQUEST_DELAY, ONE_HOUR
};

fn main() {
    loop {
        main_loop();
        thread::sleep(ONE_HOUR);
    }
}

// Main loop that gets executed every time we check for case status updates
fn main_loop() {
    // Get case statuses from file
    let mut case_statuses = json::read_info_from_file(FILE_PATH);

    // Return immediately if no case statuses
    if case_statuses.is_empty() {
        return println!(
            "No case statuses were found in file {}. Please check your formatting.",
            FILE_PATH
        );
    }

    // Print the current day
    println!("Here are your case statuses for: {}\n", get_current_time());

    // Go through each ID in case status, make an HTTP request
    for case_status in case_statuses.iter_mut() {
        let CaseStatus {
            id,
            name,
            previous_status,
            last_checked,
        } = case_status;

        // Validate ID, skip if it isn't valid
        if !is_valid_id(&id) {
            println!("Skipping {}, is not a valid case ID number.", id);
            continue;
        }

        // Get case status from ID
        let current_status = get_current_status_from_id(&id);

        // Check if status has changed
        let status_changed = current_status != *previous_status && !previous_status.is_empty();

        // Print the case information
        println!("ID: {}", id);
        println!(
            "  Status changed: {}",
            if status_changed { "Yes" } else { "No" }
        );
        println!("  Name: {}", name);
        println!("  Current Status: {}", current_status);

        // If status changed, show what previous status was and send notification
        if status_changed {
            println!("  Previous Status: {}", previous_status);
        }

        // Show when last checked
        println!(
            "  Last Checked: {}\n",
            if last_checked.is_empty() {
                "Never"
            } else {
                last_checked
            }
        );

        // Send notification about change
        if status_changed {
            notify::send_notification(case_status, &current_status);
        }

        // Update each case status with new info
        case_status.previous_status = current_status.clone();
        case_status.last_checked = get_current_time();

        // Delay each request to avoid getting flagged as a DDoS
        thread::sleep(REQUEST_DELAY);
    }

    // Save case status to file
    json::save_info_to_file(FILE_PATH, case_statuses);

    // Concluding message for each check
    println!("Finished checking case statuses for {}\n. Checking again in 1 hour.", get_current_time());
}