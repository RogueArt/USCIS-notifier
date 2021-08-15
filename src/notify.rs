use notify_rust::Notification;

pub fn send_notification(statuses: Vec<CaseStatus>) {
  Notification::new()
    .summary("Case Status Updates")
    .body(statuses)
    .icon("thunderbird")
    .show()
    .expect("Could not send notification.");
}