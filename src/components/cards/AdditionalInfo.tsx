import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import Sunrise from "/src/assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Uv from "../../assets/uv.svg?react";
import Wind from "../../assets/wind.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import UpArrow from "../../assets/up-arrow.svg?react";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function AdditionalInfo({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
    >
      {rows.map(({ label, value, Icon }) => (
        <div
          className="flex items-center justify-between"
          key={value}
        >
          <div className="flex items-center gap-3">  
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-5" />
            </span>
            <span className="text-sm text-muted-foreground">{label}</span>
          
          </div>

          <span className="font-semibold text-card-foreground">
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}{" "}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });

  if (value === "wind_deg")
    return (
      <UpArrow
        className="size-6 text-primary"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );
  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
