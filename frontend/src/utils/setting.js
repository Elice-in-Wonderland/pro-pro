function createScript(src, options, errCb) {
  const firstScript = document.getElementsByTagName('script')[0];
  const newScriptTag = document.createElement('script');

  if (options.id) newScriptTag.id = options.id;
  if (options.async) newScriptTag.async = true;
  if (options.defer) newScriptTag.defer = true;

  newScriptTag.src = src;

  newScriptTag.onerror = function () {
    this.onload = null;
    this.onerror = null;
    errCb(new Error(`Failed to load ${this.src}`));
  };

  if (firstScript) {
    return firstScript.parentNode?.insertBefore(newScriptTag, firstScript);
  }
  document.head.appendChild(newScriptTag);
}

function sdkPostCode() {
  const scriptId = 'daum_postcode';
  const isScriptExist = !!document.getElementById(scriptId);

  if (!isScriptExist) {
    createScript(
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
      { id: scriptId, async: true },
      err => {
        console.log(err);
      },
    );
  }
}

export { createScript, sdkPostCode };
