#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .on_page_load(|window, _| {
      let window_ = window.clone();

      // When the page loads, listen for something from JS
      // Send the data back from Rust
      window.listen("js-event", move |event| {
        println!("Got js-event with message {:?}", event.payload());
        let reply = Reply {
          data: "something_else".to_string(),
        };
        window_.emit("rust-event", Some(reply)).expect("Failed to emit");
      });
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}