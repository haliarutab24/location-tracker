"use client";

import { useEffect, useState } from "react";
import Map from "./components/Map";

interface IPDataResponse {
  city: string;
  region: string;
  country_name: string;
  ip: string;
  latitude: number;
  longitude: number;
  asn: {
    name: string;
  };
  time_zone: {
    name: string;
  };
}

export default function Home() {
  const [info, setInfo] = useState<IPDataResponse | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_IPDATA_KEY;

   fetch(`https://api.ipdata.co?api-key=${key}&fields=city,region,country_name,latitude,longitude,ip,asn,time_zone`)

      .then((res) => res.json())
      .then((data) =>
        setInfo({
          ip: data.ip,
          city: data.city,
          region: data.region,
          country_name: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
          asn: data.asn,
          time_zone: data.time_zone,
        })
      )
      .catch((err) => {
        console.error(err);
        setInfo(null);
      });
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>IPData Location Checker</h1>

      {!info && <p>Loading your location...</p>}

      {info && (
        <>
          <div>
            <p><strong>Your IP:</strong> {info.ip}</p>
            <p><strong>City:</strong> {info.city}</p>
            <p><strong>Region:</strong> {info.region}</p>
            <p><strong>Country:</strong> {info.country_name}</p>
            <p><strong>Latitude:</strong> {info.latitude}</p>
            <p><strong>Longitude:</strong> {info.longitude}</p>
            <p><strong>ISP:</strong> {info.asn?.name}</p>
            <p><strong>Time Zone:</strong> {info.time_zone?.name}</p>
          </div>

          {/* Map Component */}
          <Map lat={info.latitude} lon={info.longitude} />
        </>
      )}
    </main>
  );
}
