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
  const handleClick = (mouseEvent:any) => {
    console.log(mouseEvent)
  }

  return (
    function(){
      return (
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "360px" }}
          onClick={(_, mouseEvent) => handleClick(mouseEvent)}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
            <div style={{color:"#000"}}></div>
          </MapMarker>
        </Map>
      )
    }
  )
}



export default KaKaoMap