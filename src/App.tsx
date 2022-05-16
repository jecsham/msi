import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { forage } from "@tauri-apps/tauri-forage";
import Loading from "./components/Loading";
import HardwareTable from "./components/HardwareTable";
import SaveAsTxtButton from "./components/SaveAsTxtButton";
import { dataStandardFormat } from "./libs/std_format";
import SaveAsImgButton from "./components/SaveAsImgButton";

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
      console.log("loaded from local", val);
    }
  };

  const getSystemDataFromAPI = async () => {
    let val: any = await invoke("get_system_data_command");
    if (val) {
      try {
        let decodedJson = dataStandardFormat(JSON.parse(val));
        setData(decodedJson);
        console.log("loaded from api", decodedJson);
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

  // invoke the tauri api in useEffect
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <section className="uk-flex uk-flex-center">
        <div className="title-panel">
          <div className="uk-text-small uk-text-center p-n">
            <span id="text-title">
              <a
                className="uk-text-muted pointer"
                href="https://msi.jecsham.com"
                target="_blank"
              >
                msi.jecsham.com
              </a>{" "}
            </span>
          </div>
        </div>
      </section>
      <div className="uk-padding-large uk-padding-remove-vertical">
        <div id="render-portion">
          <p className="uk-text-center uk-margin-small uk-text-bold">
            My System Information
          </p>
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
          {data && <HardwareTable data={data} />}
        </div>
      </div>
    </div>
  );
}

export default App;
