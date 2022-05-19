function padding(value) {
  return `00${value}`.slice(-2);
}

function parseJwt(token) {
  try {
    return JSON.parse(window.atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function debounce(callback, wait = 1000) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, wait);
  };
}

function throttle(callback, wait = 1000) {
  let timer;

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        callback();
      }, wait);
    }
  };
}

function addressSearch(address) {
  return new Promise((resolve, reject) => {
    window.kakao.maps.load(function () {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const region = {
            lat: result[0].y,
            lng: result[0].x,
            address,
            sido: result[0].road_address.region_1depth_name,
          };
          resolve(region);
        } else {
          reject(status);
        }
      });
    });
  });
}

function createPostCode() {
  return new Promise((resolve, reject) => {
    new window.daum.Postcode({
      async oncomplete(data) {
        const region = await addressSearch(data.address);
        resolve(region);
      },
      onclose(state) {
        if (state === 'FORCE_CLOSE') {
          reject(state);
        }
      },
    }).open();
  });
}

function createMap($container, region) {
  window.kakao.maps.load(function () {
    const coords = new window.kakao.maps.LatLng(region[0], region[1]);

    const mapOption = {
      center: coords,
      draggable: false,
      level: 3,
    };
    // add map
    const map = new window.kakao.maps.Map($container, mapOption);

    // add marker
    new window.kakao.maps.Marker({
      map,
      position: coords,
    });
  });
}

export {
  padding,
  parseJwt,
  debounce,
  throttle,
  createPostCode,
  addressSearch,
  createMap,
};

/* <div style="margin-top:100px;">
<input type="button" class='postcode-search' value="우편번호 찾기"><br>
<div id="map" style="height: 300px;width:300px"></div>
</div> */

// const postcodeSearch = this.$dom.querySelector('.postcode-search');
// const mapContainer = document.getElementById('map');

// postcodeSearch.addEventListener('click', async () => {
//   try {
//     const region = await createPostCode();
//     createMap(mapContainer, region);
//   } catch (e) {
//     console.log(e);
//   }
// });
