import { saveAsImage } from "../libs/html2canvas";
import { saveAsTxt } from "../libs/txt";

function OptionsButton() {
  const saveImage = () => {
    saveAsImage();
  };

  const saveText = () => {
    saveAsTxt();
  };

  const displayAbout = () => {
    window.alert(`My System Information
${process.env.REACT_APP_VERSION}

Jecsham Castillo (c) 2022
msi.jecsham.com`);
  };
  return (
    <>
      <div className="uk-inline">
        <button
          className="uk-button uk-button-default uk-button-small"
          type="button"
        >
          Options
        </button>
        <div uk-dropdown="mode: click">
          <ul className="uk-nav uk-dropdown-nav">
            <li>
              <button
                onClick={saveImage}
                className="uk-button uk-button-small uk-button-link"
              >
                Save as .png image
              </button>
            </li>
            <li>
              <button
                onClick={saveText}
                className="uk-button uk-button-small uk-button-link"
              >
                Save as .txt file
              </button>
            </li>
            <li className="uk-nav-divider"></li>
            <li>
              <button
                onClick={displayAbout}
                className="uk-button uk-button-small uk-button-link"
              >
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default OptionsButton;
