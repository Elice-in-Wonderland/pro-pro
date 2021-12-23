function sdkPostCode() {
  const scriptId = 'daum_postcode';
  const isScriptExist = !!document.getElementById(scriptId);
  const postcodeURL =
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

  if (!isScriptExist) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = postcodeURL;
    document.body.appendChild(script);

    script.onload = () => {
      try {
        // console.log('postcode load done');
      } catch (err) {
        console.log(err);
      }
    };
    script.onerror = err => console.log(err);
  }
}

export { sdkPostCode };
