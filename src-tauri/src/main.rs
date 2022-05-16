#![windows_subsystem = "windows"]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
use serde::{Deserialize, Serialize};
use serde_json::json;
use wmi::WMIConnection;

fn get_system_data() -> Result<String, Box<dyn std::error::Error>> {
    // let com_con = COMLibrary::new().expect("Failed to load COM library");
    // let wmi_con = WMIConnection::new(com_con.into()).expect("Failed to create WMI connection");
    let wmi_con = unsafe { WMIConnection::with_initialized_com(Some("ROOT\\CIMV2"))? };

    #[derive(Serialize, Deserialize, Debug)]
    struct Win32_OperatingSystem {
        Caption: String,
    }
    let result_os: Vec<Win32_OperatingSystem> = wmi_con.query()?;

    #[derive(Serialize, Deserialize, Debug)]
    struct Win32_Processor {
        Name: String,
    }
    let result_cpu: Vec<Win32_Processor> = wmi_con.query()?;

    #[derive(Serialize, Deserialize, Debug)]
    struct Win32_VideoController {
        Name: String,
    }
    let result_gpu: Vec<Win32_VideoController> = wmi_con.query()?;

    #[derive(Serialize, Deserialize, Debug)]
    struct Win32_DiskDrive {
        Caption: String,
        Size: u64,
    }
    let result_disk: Vec<Win32_DiskDrive> = wmi_con.query()?;

    #[derive(Serialize, Deserialize, Debug)]
    struct Win32_PhysicalMemory {
        Capacity: u64,
        Speed: u32,
        Manufacturer: String,
        ConfiguredClockSpeed: u32,
    }
    let result_ram: Vec<Win32_PhysicalMemory> = wmi_con.query()?;

    #[derive(Serialize, Deserialize, Debug)]
    struct Win32_BaseBoard {
        Manufacturer: String,
        Product: String,
    }
    let result_motherboard: Vec<Win32_BaseBoard> = wmi_con.query()?;

    let json_response = json!({
        "os": result_os,
        "cpu": result_cpu,
        "gpu": result_gpu,
        "disk": result_disk,
        "ram": result_ram,
        "motherboard": result_motherboard,
    });

    Ok(json_response.to_string())
}

#[tauri::command]
fn get_system_data_command() -> String {
    match get_system_data() {
        Ok(result) => result,
        Err(e) => format!("{}", e),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_system_data_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
