import React, { useEffect } from 'react';

const { kakao } = window;
let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
let lat, lng;
navigator.geolocation.getCurrentPosition((position) => {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
});
const MapContainer = ({ searchPlace }) => {
  console.log(searchPlace);
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          if (data[i].category_group_code === 'CE7') {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
        }
        map.setBounds(bounds);
      }
    }
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
    }
  }, [searchPlace]);

  return (
    <div
      id="myMap"
      style={{
        width: '500px',
        height: '500px',
      }}
    ></div>
  );
};

export default MapContainer;
