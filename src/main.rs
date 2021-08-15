// For IO
use std::fs;
use std::io::{stdin, stdout, Read, Write};

// For delaying and for current time
use std::thread;
use std::time::Duration;

// For formatting current time
use chrono::offset::Local;

// For ID validation
use lazy_static::lazy_static;
use regex::Regex;

// For scraping data from the web
use reqwest::blocking;
use select::document::Document;
use select::predicate::Name;

// For saving and reading from a file
mod json;
mod lib;
use json::CaseStatus;

const STATUS_LINK: &str = "https://egov.uscis.gov/casestatus/mycasestatus.do";
const REQUEST_DELAY: Duration = Duration::from_millis(100);
const FILE_PATH: &str = "data.json";

/*
TO-DO:
- Add error checking for request failing
- Add error checking for not finding any of the DOM nodes
*/
fn main() {
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
    let current_time = Local::now().to_rfc2822();
    println!("Here are your case statuses for: {}\n", current_time);

    // Go through each ID in case status, make an HTTP request
    for case_status in case_statuses.iter_mut() {
        let CaseStatus {
            id,
            name,
            previous_status,
            last_checked,
        } = case_status;

        // Validate ID, skip if it isn't valid
        if !is_valid_id(id) {
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

        // If status changed, show what previous status was
        if status_changed {
            println!("  Previous Status: {}", previous_status);
        }
        
        // Show when last checked
        println!("  Last Checked: {}\n", if last_checked.is_empty() { "Never"} else { last_checked });

        // Update each case status with new info
        case_status.previous_status = current_status;
        case_status.last_checked = current_time.clone();
    
        // Delay each request to avoid getting flagged as a DDoS
        thread::sleep(REQUEST_DELAY);
    }

    // Save case status to file
    json::save_info_to_file(FILE_PATH, case_statuses);
    
    // Prevent command line from closing
    pause();
}

// Makes an HTTP request to parse current case status for a given ID
fn get_current_status_from_id(id: &str) -> String {
    // Otherwise, make a GET request for each case status
    let res = blocking::get(format!("{}?appReceiptNum={}", STATUS_LINK, id)).unwrap();

    // Convert response into HTML document
    let document = Document::from_read(res).unwrap();

    // Find the h1 tag, get its children, get the text from its children
    let current_status = document
        .find(Name("h1"))
        .next()
        .unwrap()
        .children()
        .next()
        .unwrap()
        .as_text()
        .unwrap();

    // Return current case status
    current_status.to_owned()
}

// Checks if a status ID is properly formatted using a RegEx
fn is_valid_id(id: &str) -> bool {
    // Compile the RegEx exactly once when evaluating
    lazy_static! {
        static ref ID_REGEX: Regex = Regex::new(r"^MSC2190\d{6}$").unwrap();
    }
    ID_REGEX.is_match(&id)
}

fn pause() {
    let mut stdout = stdout();
    stdout.write_all(b"\nPress Enter to exit...").unwrap();
    stdout.flush().unwrap();
    stdin().read_exact(&mut [0]).unwrap();
}
