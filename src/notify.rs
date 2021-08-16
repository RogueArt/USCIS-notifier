use notify_rust::{Notification, Hint};

use crate::CaseStatus;

pub fn send_notification(case_status: &CaseStatus, current_status: &str) {
  let formatted_status = format_status(case_status, current_status);  
  Notification::new()
        .summary("Case Status Updates")
        .body(&formatted_status)
        .icon("thunderbird")
        .show()
        .expect("Could not send notification.");
}

fn format_status(case_status: &CaseStatus, current_status: &str) -> String {
    format!(
        "{}'s case status for {} changed from {} to {}.",
        case_status.name, case_status.id, case_status.previous_status, current_status
    )
}
