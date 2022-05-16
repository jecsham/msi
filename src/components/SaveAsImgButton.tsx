import { saveAsImage } from "../libs/html2canvas";

function SaveAsImgButton() {
  const save = () => {
    saveAsImage();
  };
  return (
    <button
      id="btnSaveImage"
      className="uk-button uk-button-default uk-button-small uk-margin-small-right"
      onClick={() => {
        save();
      }}
    >
      Save as image
    </button>
  );
}

export default SaveAsImgButton;
