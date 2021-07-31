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

const FILE_NAME: &str = r"data.txt";
const STATUS_LINK: &str = "https://egov.uscis.gov/casestatus/mycasestatus.do";
const REQUEST_DELAY: Duration = Duration::from_millis(250);

/*
TO-DO:
- Add error checking for request failing
- Add error checking for not finding any of the DOM nodes
*/
fn main() {
    // Grab IDs from file
    let ids = get_ids_from_file(FILE_NAME);

    // Return immediately if there are no IDs
    if ids.is_empty() {
        return println!(
            "No valid IDs were found in file {}. Please check your formatting.",
            FILE_NAME
        );
    }

    // Print the current day
    let current_time = Local::now();
    println!("Here are your case statuses for: {}", current_time.date());

    // Go through each ID, make an HTTP request
    for id in ids.iter() {
        // Get case status from ID
        let case_status = get_case_status_from_id(&id);

        // Print the id and case status
        println!("{}: {}", id, case_status);

        // Delay each request to avoid getting flagged as a DDoS
        thread::sleep(REQUEST_DELAY);
    }

    // Prevent command line from closing
    pause();
}

// Makes an HTTP request to parse case status for a given ID
fn get_case_status_from_id(id: &str) -> String {
    // Otherwise, make a GET request for each case status
    let res = blocking::get(format!("{}?appReceiptNum={}", STATUS_LINK, id)).unwrap();

    // Convert response into HTML document
    let document = Document::from_read(res).unwrap();

    // Find the h1 tag, get its children, get the text from its children
    let case_status = document
        .find(Name("h1"))
        .next()
        .unwrap()
        .children()
        .next()
        .unwrap()
        .as_text()
        .unwrap();

    // Return case status
    case_status.to_owned()
}

// Checks if a status ID is properly formatted using a RegEx
fn is_valid_id(id: &str) -> bool {
    // Compile the RegEx exactly once when evaluating
    lazy_static! {
        static ref ID_REGEX: Regex = Regex::new(r"^MSC2190\d{6}$").unwrap();
    }
    ID_REGEX.is_match(&id)
}

// Reads the IDs as separated by newlines from a file
fn get_ids_from_file(filename: &str) -> Vec<String> {
    // Get the file contents, checking file exists
    let file_contents = fs::read_to_string(filename)
        .unwrap_or_else(|_| panic!("Could not find file {} in the folder", FILE_NAME));

    // Format this into a vector, filtering any invalid IDs
    let ids: Vec<String> = file_contents
        .lines()
        .filter(|id| is_valid_id(*id))
        .map(|x| x.to_owned())
        .collect();
    ids
}

fn pause() {
    let mut stdout = stdout();
    stdout.write_all(b"\nPress Enter to exit...").unwrap();
    stdout.flush().unwrap();
    stdin().read_exact(&mut [0]).unwrap();
}
