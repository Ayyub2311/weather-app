import { getAirPollution } from "@/api";
import type { Coords } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";

type Props = {
  coords: Coords;
};

export default function SidePanel(props: Props) {
  return (
    <div className="fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-1001 py-8 px-4">
      <Suspense>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coords],
    queryFn: () => getAirPollution(coords),
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold ">Air Pollution</h1>
      <h1 className="text-5xl font-semibold ">{data.list[0].main.aqi}</h1>
      <h1 className="text-2xl font-semibold ">AQI</h1>

      {Object.entries(data.list[0].components).map(([key, value]) => {
        // const pollutant = airQualityIndex
        return (
          <Card key={key}
          childrenClassName="flex flex-col gap-3"
           className="hover:scale-105 transition-transform duration:300 from-sidebar-accent to-sidebar-accent/60 gap-0!">
            <div className="flex justify-between">
              <span className="text-lg font-bold capitalize">{key}</span>
            <span className="text-lg font-semibold">{value}</span>  
            </div>
            <Slider min={0} value={[value]} disabled/>
          </Card>
        );
      })}
    </div>
  );
}



//  const airQualityIndex = [
//   {
//     name: "Good",
//     index: 1,
//     pollutants: {
//       SO2: { min: 0, max: 20 },
//       NO2: { min: 0, max: 40 },
//       PM10: { min: 0, max: 20 },
//       PM25: { min: 0, max: 10 },
//       O3: { min: 0, max: 60 },
//       CO: { min: 0, max: 4400 },
//     },
//   },
//   {
//     name: "Fair",
//     index: 2,
//     pollutants: {
//       SO2: { min: 20, max: 80 },
//       NO2: { min: 40, max: 70 },
//       PM10: { min: 20, max: 50 },
//       PM25: { min: 10, max: 25 },
//       O3: { min: 60, max: 100 },
//       CO: { min: 4400, max: 9400 },
//     },
//   },
//   {
//     name: "Moderate",
//     index: 3,
//     pollutants: {
//       SO2: { min: 80, max: 250 },
//       NO2: { min: 70, max: 150 },
//       PM10: { min: 50, max: 100 },
//       PM25: { min: 25, max: 50 },
//       O3: { min: 100, max: 140 },
//       CO: { min: 9400, max: 12400 },
//     },
//   },
//   {
//     name: "Poor",
//     index: 4,
//     pollutants: {
//       SO2: { min: 250, max: 350 },
//       NO2: { min: 150, max: 200 },
//       PM10: { min: 100, max: 200 },
//       PM25: { min: 50, max: 75 },
//       O3: { min: 140, max: 180 },
//       CO: { min: 12400, max: 15400 },
//     },
//   },
//   {
//     name: "Very Poor",
//     index: 5,
//     pollutants: {
//       SO2: { min: 350, max: Infinity },
//       NO2: { min: 200, max: Infinity },
//       PM10: { min: 200, max: Infinity },
//       PM25: { min: 75, max: Infinity },
//       O3: { min: 180, max: Infinity },
//       CO: { min: 15400, max: Infinity },
//     },
//   },
// ];