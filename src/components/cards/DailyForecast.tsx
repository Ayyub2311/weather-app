import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";
import { useTranslation } from "react-i18next";


type Props = {
  coords: Coords
}

export default function DailyForecast({coords}: Props) {
  const { t, i18n } = useTranslation();

  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card title={t("dailyForecast")} childrenClassName="flex flex-col gap-4 2xl:justify-between">
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between"> 
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(i18n.language, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p>{Math.round(day.temp.day)}°C</p>
          <p className="text-muted-foreground">{Math.round(day.temp.min)}°C</p>
          <p className="text-muted-foreground">{Math.round(day.temp.max)}°C</p>
        </div>
      ))}
    </Card>
  );
}
