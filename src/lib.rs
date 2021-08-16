// For IO
use std::io::{stdin, stdout, Read, Write};

// For ID validation
use lazy_static::lazy_static;
use regex::Regex;

// For scraping data from the web
use reqwest::blocking;
use select::document::Document;
use select::predicate::Name;

// For formatting current time
use std::time::Duration;
use chrono::offset::Local;

// Global constants
const STATUS_LINK: &str = "https://egov.uscis.gov/casestatus/mycasestatus.do";
pub const REQUEST_DELAY: Duration = Duration::from_millis(100);
pub const ONE_HOUR: Duration = Duration::from_secs(3600);
pub const FILE_PATH: &str = "data.json";

/*
TO-DO:
- Add error checking for request failing
- Add error checking for not finding any of the DOM nodes
*/

// Makes an HTTP request to parse current case status for a given ID
pub fn get_current_status_from_id(id: &str) -> String {
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
pub fn is_valid_id(id: &str) -> bool {
    // Compile the RegEx exactly once when evaluating
    lazy_static! {
        static ref ID_REGEX: Regex = Regex::new(r"^MSC2190\d{6}$").unwrap();
    }
    ID_REGEX.is_match(&id)
}

// Pauses the terminal to prevent exiting
pub fn pause() {
    let mut stdout = stdout();
    stdout.write_all(b"Press Enter to exit...").unwrap();
    stdout.flush().unwrap();
    stdin().read_exact(&mut [0]).unwrap();
}

// Helper function get current time
pub fn get_current_time() -> String {
  Local::now().to_rfc2822()
}
