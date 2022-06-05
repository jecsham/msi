// #![windows_subsystem = "windows"]
mod commands;
use commands::system_data::system_data_command;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![system_data_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
