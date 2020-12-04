import React, { useState } from 'react';
import MapContainer from './MapContainer';

const Cafe = ({ place }) => {
  const [map, setMap] = useState(false);
  const onClick = () => {
    setMap(!map);
    console.log(map);
  };

  return (
    <div>
      <div style={{ width: '150px', height: '150px', backgroundColor: 'black', margin: '20px' }} onClick={onClick}></div>
      <div> {map ? <MapContainer className="map" searchPlace={place} /> : ''}</div>
    </div>
  );
};

export default Cafe;
