import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";
import { useTranslation } from "react-i18next";


type Props = {
  coords: Coords
}

export default function HourlyForecast({coords}: Props) {
  const { t } = useTranslation();

  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card title={t("hourlyForecast")} childrenClassName="flex gap-6 overflow-x-auto">
      {data.hourly.map((hour) => (
        <div 
        key={hour.dt}
        className="flex flex-col 2xl:justify-between gap-2 items-center p-2 text-card-foreground">
          <p className="whitespace-nowrap 2xl:scale-110 text-muted-foreground">{new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit"
            })}</p>
          <WeatherIcon className="2xl:size-10" src={hour.weather[0].icon} />
          <p className="2xl:scale-110">{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
 