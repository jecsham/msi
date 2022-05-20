import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { forage } from "@tauri-apps/tauri-forage";
import Loading from "./components/Loading";
import HardwareTable from "./components/HardwareTable";
import SaveAsTxtButton from "./components/SaveAsTxtButton";
import { dataStandardFormat } from "./libs/std_format";
import SaveAsImgButton from "./components/SaveAsImgButton";
import { appWindow } from "@tauri-apps/api/window";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();

  const getSystemDataFromForage = async () => {
    let val = await forage.getItem({
      key: "system_data",
      value: false,
    } as any)();
    if (val) {
      setData(val);
      // console.log("loaded from local", val);
    }
  };

  const getSystemDataFromAPI = async () => {
    let val: any = await invoke("get_system_data_command");
    if (val) {
      try {
        let decodedJson = dataStandardFormat(JSON.parse(val));
        setData(decodedJson);
        // console.log("loaded from api", decodedJson);
        await forage.setItem({
          key: "system_data",
          value: decodedJson,
        } as any)();
      } catch (error) {}
    }
  };

  const loadData = async () => {
    await getSystemDataFromForage();
    await getSystemDataFromAPI();
    setLoading(false);
  };

  const closeWindow = () => {
    appWindow.close();
  };

  // invoke the tauri api in useEffect
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="content">
      <section className="uk-flex uk-flex-center">
        <div className="title-panel">
          <div
            data-tauri-drag-region
            className="uk-text-small uk-text-center p-n"
          >
            <span data-tauri-drag-region id="text-title">My System Information</span>
          </div>
        </div>
        <button
          onClick={closeWindow}
          id="btnCloser"
          className="uk-button uk-button-danger uk-button-small cursor-default"
        >
          x
        </button>
      </section>
      <div id="render-portion">
        <div className="uk-padding-large uk-padding-remove-vertical">
          <p
            id="text-website"
            className="uk-text-center uk-margin-small uk-text-muted uk-text-small uk-margin-remove-top"
          ></p>
          <div
            data-html2canvas-ignore
            className="uk-flex uk-flex-right uk-margin-small"
          >
            {loading && <Loading />}
            <SaveAsImgButton />
            <SaveAsTxtButton />
          </div>
        </div>
        <div className="table-content">
          <div className="uk-padding-large uk-padding-remove-vertical">
            {data && <HardwareTable data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
