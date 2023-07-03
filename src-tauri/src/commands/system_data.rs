#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
use serde::{Deserialize, Serialize};
use serde_json::json;
use wmi::variant::Variant;
use wmi::{COMLibrary, WMIConnection};

fn get_system_data() -> Result<String, Box<dyn std::error::Error>> {
    let initialized_com = unsafe { COMLibrary::assume_initialized() };
    let wmi_con = WMIConnection::with_namespace_path("ROOT\\CIMV2", initialized_com)?;

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
        Speed: Variant,
        Manufacturer: String,
        ConfiguredClockSpeed: Variant,
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

fn error_response(e: String) -> String {
    let empty_vec: Vec<String> = vec![];
    json!({
        "os": empty_vec,
        "cpu": empty_vec,
        "gpu": empty_vec,
        "disk": empty_vec,
        "ram": empty_vec,
        "motherboard": empty_vec,
        "error": vec![e],
    })
    .to_string()
}

#[tauri::command]
pub fn system_data_command() -> String {
    match get_system_data() {
        Ok(result) => result,
        Err(e) => error_response(e.to_string()),
    }
}
