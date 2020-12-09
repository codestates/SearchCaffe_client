/* global kakao */
import React, { useState } from 'react';
import MapContainer from './MapContainer';

const places = new kakao.maps.services.Places();

const SearchPlace = () => {
  const callback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      mapData = result;
      console.log(mapData);
      const staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
        staticMapOption = {
          center: new kakao.maps.LatLng(result[0].y, result[0].x), // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
        };
      var staticMap = new kakao.maps.StaticMap(
        staticMapContainer,
        staticMapOption
      );
    }
  };
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  let mapData;

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
