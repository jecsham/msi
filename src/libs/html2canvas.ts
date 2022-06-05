import html2canvas from "html2canvas";
import { dialog, fs } from "@tauri-apps/api";
var Buffer = require("buffer/").Buffer;

const _decodeBase64Image = (dataString: string) => {
  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (matches?.length !== 3) throw "Invalid input";

  return {
    type: matches[1],
    data: Buffer.from(matches[2], "base64"),
  };
};

const saveAsImage = async () => {
  const renderPortion = document.getElementById("render-portion");
  const html2canvasOptions = {
    dpi: 384,
    scale: 2,
  };
  if (!renderPortion) return;
  try {
    // btnSaveImage.setAttribute('disabled', true);
    window.scrollTo(0, 0);
    // textWebsite.textContent = 'msi.jecsham.com';
    let canvasHeightOption = { height: renderPortion.clientHeight };
    let canvas = await html2canvas(renderPortion, {
      ...html2canvasOptions,
      ...canvasHeightOption,
    });
    // textWebsite.textContent = "";
    let imgBuffer = _decodeBase64Image(canvas.toDataURL("image/png"));
    let saveDir: any = await dialog.save({
      defaultPath: `MY_SYSTEM_INFORMATION_${Date.now()}`,
      filters: [
        {
          name: "Image",
          extensions: ["png"],
        },
      ],
    });
    if (!saveDir) throw "Unable to get path";
    console.log(saveDir);
    fs.writeBinaryFile({ path: saveDir, contents: imgBuffer?.data });
  } catch (error) {
    console.log(error);
  }
};

export { saveAsImage };
