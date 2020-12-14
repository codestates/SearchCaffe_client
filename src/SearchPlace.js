/* global kakao */
import React, { useState } from 'react';
import { dbService } from './firebase/mainbase';
const places = new kakao.maps.services.Places();
var geocoder = new kakao.maps.services.Geocoder();

const SearchPlace = () => {
  const [cafe, setCafe] = useState([]);
  // useEffect(() => {
  //   dbService.collection('test').onSnapshot((snapshot) => {
  //     const cafeInfo = snapshot.docs.map((doc) => {
  //       let keyword = doc.data().cafeName;
  //       places.keywordSearch(keyword, callback);
  //     });
  //     setCafe(cafeInfo);
  //   });
  // }, []);
  const setCafeInfo = () => {
    dbService.collection('test').onSnapshot((snapshot) => {
      const cafeInfo = snapshot.docs.map((doc) => {
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
                      await dbService.doc(`test/${doc.id}`).update({
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
                      await dbService.doc(`test/${doc.id}`).update({
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
  // setCafeInfo();
  const getCafeInfo = async (callback) => {
    let cafe = await dbService.collection('test').get();
    cafe.forEach((doc) => {
      let keyword = doc.data();
      // let cafeId = keyword.cafeName;
      // console.log(keyword.cafeName);
      places.keywordSearch(keyword.cafeName, callback);
    });
    // places.keywordSearch('커피', callback);
    // console.log(cafe);
  };

  const callback = (result, status) => {
    console.log(result);
    // console.log(cafeId);
    if (status === kakao.maps.services.Status.OK) {
      if (result.length > 1) {
        console.log('결과 여러개');
        let filtered = [],
          cafeAddr;
        // let cafeAddr = cafeInfo.cafeAddress.split(' ');
        // console.log(cafeAddr);
        // for (let i = 0; i < cafeAddr.length; i++) {
        //   if (filtered.length === 1) {
        //     break;
        //   }
        //   filtered = result.filter((cafe) => {
        //     return cafe.road_address_name.includes(cafeAddr[i]);
        //   });
        // }
        // console.log(filtered);
        // renderMap(filtered);
        renderMap(result);
      } else {
        renderMap(result);
        console.log('결과 한개');
      }
      // const staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
      //   staticMapOption = {
      //     center: new kakao.maps.LatLng(result[0].y, result[0].x), // 이미지 지도의 중심좌표
      //     level: 2, // 이미지 지도의 확대 레벨
      //     marker: {
      //       position: new kakao.maps.LatLng(result[0].y, result[0].x),
      //       text: `${result[0].place_name}
      //        ${result[0].road_address_name}`,
      //     }
      //   };
      // const staticMap = new kakao.maps.StaticMap(
      //   staticMapContainer,
      //   staticMapOption
      // );
    }
  };
  const displayMarker = () => {};
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  let mapData;
  // getCafeInfo(callback);
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
  };

  const onClick = () => {
    places.keywordSearch(inputText, callback);
    console.log(mapData);
  };
  const renderMap = (result) => {
    const staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
      staticMapOption = {
        center: new kakao.maps.LatLng(result[0].y, result[0].x), // 이미지 지도의 중심좌표
        level: 2, // 이미지 지도의 확대 레벨
        marker: {
          position: new kakao.maps.LatLng(result[0].y, result[0].x),
          text: `${result[0].place_name}
             ${result[0].road_address_name}`,
        },
      };
    const staticMap = new kakao.maps.StaticMap(
      staticMapContainer,
      staticMapOption
    );
  };
  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit" onClick={onClick}>
          검색
        </button>
      </form>
      <div id="staticMap" style={{ width: '500px', height: '500px' }}></div>
      {/* <MapContainer searchPlace={place} /> */}
    </>
  );
};

export default SearchPlace;
