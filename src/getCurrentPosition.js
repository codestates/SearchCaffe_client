import { dbService } from './firebase/mainbase';
const { default: MapContainer } = require('./MapContainer');

/* global kakao */
var geocoder = new kakao.maps.services.Geocoder();
var coords;
var address;
let testCollection = dbService.collection('test');
// const getCafeInfo = async () => {
//   let cafe = await dbService.collection('test').get();
//   cafe.forEach((doc) => {
//     testCollection.doc(doc.id).update({ ...doc.data(), addressname: '' });
//   });
// };
// getCafeInfo();
const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    coords = new kakao.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );

    // geocoder.coord2RegionCode(
    //   coords.getLng(),
    //   coords.getLat(),
    //   (result, status) => {
    //     if (status === kakao.maps.services.Status.OK) {
    //       console.log(result);
    //     }
    //   }
    // );
    /*region_type	String	H(행정동) 또는 B(법정동)
address_name	String	전체 지역 명칭
region_1depth_name	String	지역 1Depth, 시도 단위(바다 영역은 존재하지 않음)
region_2depth_name	String	지역 2Depth, 구 단위(바다 영역은 존재하지 않음)
region_3depth_name	String	지역 3Depth, 동 단위(바다 영역은 존재하지 않음)
region_4depth_name	String	지역 4Depth, region_type이 법정동이며, 리 영역인 경우만 존재
code	String	region 코드
x	Double	X 좌표값 혹은 longitude
y	Double	Y 좌표값 혹은 latitude */

    geocoder.coord2Address(
      coords.getLng(),
      coords.getLat(),
      async (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          address = result[0].address['address_name'];
          console.log(address);
          address = address.split(' ');
          let cafe = await dbService
            .collection('test')
            .where('region_1depth', '==', address[0])
            .where('region_2depth', '==', address[1])
            .where('region_3depth', '==', address[2])
            .get();
          cafe.docs.map((doc) => console.log(doc.data()));
        }
      }
    );

    /*
Name	Type	Description
address_name	String	전체 지번 주소
region_1depth_name	String	지역 1Depth명 - 시도 단위
region_2depth_name	String	지역 2Depth명 - 구 단위
region_3depth_name	String	지역 3Depth명 - 동 단위
mountain_yn	String	산 여부, "Y" 또는 "N"
main_address_no	String	지번 주 번지
sub_address_no	String	지번 부 번지, 없을 경우 ""
zip_code	String	Deprecated 우편번호(6자리) */
  });
  //   geocoder.coord2RegionCode(coord.getLng(), coord.getLat(), (result, status) => {
  //     console.log(status);
  //   });
};
export default getCurrentPosition;
// 37.566781370938024, 126.97890128059893;
