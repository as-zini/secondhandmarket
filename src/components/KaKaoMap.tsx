import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export interface KaKaoMapProps{
  latitude: number;
  longitude: number;
  setCustomValue?: (id: string, value: number) => void;
  detailPage?: boolean;
}

const KaKaoMap = ({
  latitude,
  longitude,
  setCustomValue,
  detailPage = false
}: KaKaoMapProps) => {
  const handleClick = (mouseEvent:kakao.maps.event.MouseEvent) => {
    if (detailPage) return;
    console.log(latitude, longitude)
    setCustomValue!('latitude', mouseEvent.latLng.getLat())
    setCustomValue!('longitude', mouseEvent.latLng.getLng())
  }

  return (
    
        <Map
          center={{ lat: latitude, lng: longitude }}
          style={{ width: "100%", height: "360px" }}
          onClick={(_, mouseEvent) => handleClick(mouseEvent)}
        >
          <MapMarker position={{ lat: latitude, lng: longitude }}>
            
          </MapMarker>
        </Map>
      
    
  )
}



export default KaKaoMap