const { default: MapContainer } = require('./MapContainer');

/* global kakao */
var geocoder = new kakao.maps.services.Geocoder();
var coord;
var address;
const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    coord = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.coord2RegionCode(126.97890128059893, 37.566781370938024, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0]);
      }
    });
    geocoder.coord2Address(126.97890128059893, 37.566781370938024, (result, status) => {
      console.log(status);
      if (status === kakao.maps.services.Status.OK) {
        console.log(result[0]);
        address = result[0].address['address_name'];
      }
    });
  });
  //   geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), (result, status) => {
  //     console.log(status);
  //   });
};
export default getCurrentPosition;
// 37.566781370938024, 126.97890128059893;
