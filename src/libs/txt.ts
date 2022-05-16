import { dialog, fs } from "@tauri-apps/api";
import { forage } from "@tauri-apps/tauri-forage";

const _getSystemDataFromForage = async () => {
  let val = await forage.getItem({
    key: "system_data",
    value: false,
  } as any)();
  return val;
};

const saveAsTxt = async () => {
  try {
    let text = "MY SYSTEM INFORMATION\n\n";
    let tableData = await _getSystemDataFromForage();
    if (!tableData) return;

    tableData.forEach((e:any) => {
      text += e.title + "\n";
      e.content.forEach((c:any) => {
        text += c + "\n";
      });
      text += "\n";
    });

    let saveDir = await dialog.save({
      defaultPath: `MY_SYSTEM_INFORMATION_${Date.now()}`,
      filters: [
        {
          name: "Text",
          extensions: ["txt"],
        },
      ],
    });
    if (!saveDir) throw "Unable to get path";
    fs.writeFile({path: saveDir, contents: text});
  } catch (error) {
    console.log(error);
  }
};
export { saveAsTxt };
