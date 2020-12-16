/* global kakao */
import { dbService } from './firebase/mainbase';
const places = new kakao.maps.services.Places();
var geocoder = new kakao.maps.services.Geocoder();

const setCafeInfo = () => {
  dbService.collection('CafeInformation').onSnapshot((snapshot) => {
    const cafeInfo = snapshot.docs.map((doc) => {
      console.log(doc);
      if (!doc.data().addressname) {
        let keyword = doc.data().cafeName;
        let address = doc.data().cafeAddress;
        places.keywordSearch(keyword, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            if (result.length > 1) {
              let filtered = [],
                cafeAddr = address.split(' ');
              for (let i = 0; i < cafeAddr.length; i++) {
                if (filtered.length === 1) {
                  break;
                }
                filtered = result.filter((cafe) => {
                  return cafe.road_address_name.includes(cafeAddr[i]);
                });
              }
              // console.log(filtered);
              geocoder.coord2Address(
                filtered[0].x,
                filtered[0].y,
                async (result, status) => {
                  if (status === kakao.maps.services.Status.OK) {
                    // console.log(result[0]);
                    let address = result[0].address;
                    console.log(address);
                    console.log(doc.id);
                    await dbService.doc(`CafeInformation/${doc.id}`).update({
                      addressname: address.address_name,
                      region_1depth: address.region_1depth_name,
                      region_2depth: address.region_2depth_name,
                      region_3depth: address.region_3depth_name,
                    });
                  }
                }
              );
            } else {
              // console.log(result);
              geocoder.coord2Address(
                result[0].x,
                result[0].y,
                async (AddrResult, status) => {
                  if (status === kakao.maps.services.Status.OK) {
                    let address = AddrResult[0].address;
                    console.log(address);
                    await dbService.doc(`CafeInformation/${doc.id}`).update({
                      addressname: address.address_name,
                      region_1depth: address.region_1depth_name,
                      region_2depth: address.region_2depth_name,
                      region_3depth: address.region_3depth_name,
                    });
                  }
                }
              );
            }
          }
        });
      }
    });
  });
};

export default setCafeInfo;
