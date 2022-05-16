import { saveAsTxt } from "../libs/txt";

function SaveAsTxtButton() {
  const save = () => {
    saveAsTxt();
  };
  return (
    <button
      id="btnSaveTxt"
      className="uk-button uk-button-default uk-button-small"
      onClick={() => {
        save();
      }}
    >
      Save as text
    </button>
  );
}

export default SaveAsTxtButton;
