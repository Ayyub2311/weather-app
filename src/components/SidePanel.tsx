import { getAirPollution } from "@/api";
import type { Coords } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./ui/tooltip";
import Information from "../assets/information.svg?react";
import Chevron from "../assets/chevron-left.svg?react";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";

type Props = {
  coords: Coords;
  isSidePanelOpen: boolean
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
};

export default function SidePanel(props: Props) {
  const {isSidePanelOpen, setIsSidePanelOpen} = props
  return (
    <div className={clsx("fixed top-0 right-0 h-screen w-(var(--sidebar-width)) shadow-xs bg-card z-1001 py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0!", isSidePanelOpen ? 'translate-x-0' : 'translate-x-full')}>
   
     <button onClick={() => setIsSidePanelOpen(false)}>
        <Chevron className="size-8  -ml-2 lg:hidden"/>
     </button>
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

function normalizePollutantKey(key: string): PollutantKey | null {
  const map: Record<string, PollutantKey> = {
    so2: "SO2",
    no2: "NO2",
    pm10: "PM10",
    pm2_5: "PM25",
    o3: "O3",
    co: "CO",
  };

  return map[key] ?? null;
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
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Information className="size-4 " />
            </TooltipTrigger>
            <TooltipContent className="z-2000">
              <p className="max-w-xs">
                {""}
                Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 =
                Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {Object.entries(data.list[0].components).map(([key, value]) => {
        const pollutantKey = normalizePollutantKey(key);

        if (!pollutantKey) {
          return null;
        }

        const pollutant = airQualityIndex[pollutantKey];
        const max = Math.max(pollutant["Very Poor"].min, value);
        const currentLevel = (() => {
          for (const [level, range] of Object.entries(pollutant)) {
            if (
              value >= range.min &&
              (range.max === null || value <= range.max)
            )
              return level;
          }
          return "Very Poor";
        })();

        const qualityColor = (() => {
          switch (currentLevel) {
            case "Good":
              return "bg-green-500";
            case "Fair":
              return "bg-yellow-500";
            case "Moderate":
              return "bg-orange-500";
            case "Poor":
              return "bg-red-500";
            case "Very Poor":
              return "bg-purple-500";
            default:
              return "bg-zinc-500";
          }
        })();

        return (
          <Card
            key={key}
            childrenClassName="flex flex-col gap-3"
            className="hover:scale-105 transition-transform duration-300 from-background to-background/60 gap-0!"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                 <span className="text-lg font-bold capitalize">
                {pollutantKey}
              </span>
              <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Information className="size-4 " />
            </TooltipTrigger>
            <TooltipContent className="z-2000">
              <p className="max-w-xs">
                Concentration of {pollutantNames[pollutantKey]}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
              </div>
             
              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Slider min={0} max={max} value={[value]} disabled />
            <div className="flex justify-between text-xs">
              <p>0</p>
              <p>{max}</p>
            </div>

            <div className="flex justify between">
              {Object.keys(pollutant).map((quality) => (
                <span
                  className={clsx(
                    "px-2 py-1 rounded-md text-xs font-medium",
                    quality === currentLevel
                      ? qualityColor
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {quality}
                </span>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

const airQualityIndex = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: Infinity },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: Infinity },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: Infinity },
  },
  PM25: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: Infinity },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: Infinity },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: Infinity },
  },
} as const;

const pollutantNames = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM25: "Fine particulate matter 2.5",
  O3: "Ozone",
  CO: "Carbon monoxide",
} as const;

type PollutantKey = keyof typeof airQualityIndex;
