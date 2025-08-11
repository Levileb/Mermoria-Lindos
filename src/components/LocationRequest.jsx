import React, { useState } from 'react'

export default function LocationRequest(){
  const [location, setLocation] = useState(null)
  const askLocation = ()=>{
    if(!navigator.geolocation){ alert('Geolocation not supported') ; return }
    navigator.geolocation.getCurrentPosition((pos) => setLocation({ lat:pos.coords.latitude, lng:pos.coords.longitude }), ()=>alert('Permission denied'))
  }
  return (
    <div className="fixed right-6 bottom-6 z-40">
      <button onClick={askLocation} className="px-3 py-2 bg-white/90 rounded-lg shadow">Share location</button>
      {location && <div className="text-xs text-midGray mt-2 text-right">Lat: {location.lat.toFixed(4)}<br/>Lng: {location.lng.toFixed(4)}</div>}
    </div>
  )
}
