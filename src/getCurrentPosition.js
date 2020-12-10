const { default: MapContainer } = require('./MapContainer');

/* global kakao */
var geocoder = new kakao.maps.services.Geocoder();
var coords;
var address;
const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    coords = new kakao.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    // geocoder.coord2RegionCode(coord, (result, status) => {
    //   if (status === kakao.maps.services.Status.OK) {
    //     console.log(result[0]);
    //   }
    // });
    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      (result, status) => {
        console.log(status);
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0]);
          address = result[0].address['address_name'];
        }
      }
    );
  });
  //   geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), (result, status) => {
  //     console.log(status);
  //   });
};
export default getCurrentPosition;
// 37.566781370938024, 126.97890128059893;
