class WebRequestController {
  constructor() {
    this._abortController = new AbortController();
  }

  resetController() {
    this._abortController = new AbortController();
  }

  getController() {
    return this._abortController;
  }
}

export default new WebRequestController();
