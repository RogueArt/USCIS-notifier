// Used for interacting with .JSON
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct CaseStatus {
  pub id: String,
  pub name: String,
  pub previous_status: String,
  pub last_checked: String,
}

use std::fs::{File, OpenOptions};
use std::path::Path;
use std::io::prelude::*;
use std::io::BufReader;

pub fn read_info_from_file(file_path: &str) -> Vec<CaseStatus> {
  // If the file doesn't exist
  if !Path::new(file_path).exists() {
    // Create a new file 
    let mut file = File::create(file_path).unwrap();

    // Initialize default case status
    let default_case_status: CaseStatus = CaseStatus {
      id: "AAA00000".to_owned(),
      name: "Your Name".to_owned(),
      last_checked: "Never".to_owned(),
      previous_status: "".to_owned(),
    };

    // Create a vector with one entry
    let statuses: Vec<CaseStatus> = vec![default_case_status];
    
    // Insert our default entry into the .json
    let statuses_as_string = serde_json::to_string_pretty(&statuses).unwrap();
    file.write_all(statuses_as_string.as_bytes()).expect("Couldn't write to file.");
  }

  // Open file and read the data
  let file = File::open(file_path).expect("Couldn't open file");
  let reader = BufReader::new(file);

  // If file exists, attempt to read it as JSON
  let case_statuses: Vec<CaseStatus> = serde_json::from_reader(reader).expect("Couldn't parse JSON");

  case_statuses
}

pub fn save_info_to_file(file_path: &str, statuses: Vec<CaseStatus>) {
  // If file doesn't exist
  if !Path::new(file_path).exists() {
    // Create a new file 
    File::create(file_path).unwrap();
  }

  // Open the file
  let mut file = OpenOptions::new().write(true).truncate(true).open(file_path).expect("Couldn't open file");

  // Save data to file
  let statuses_as_string = serde_json::to_string_pretty(&statuses).unwrap();
  file.write_all(statuses_as_string.as_bytes()).expect("Couldn't write to file.");
}
