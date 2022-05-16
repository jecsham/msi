function Loading() {
  return (
    <div className="uk-margin-auto-right">
      <div
        id="loading-main"
        data-uk-spinner="ratio: 0.55"
        className="uk-margin-small-left"
      ></div>
      <span id="loading-main-text"> Fetching info...</span>
    </div>
  );
}

export default Loading;
