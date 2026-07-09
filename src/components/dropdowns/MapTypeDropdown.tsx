import type { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslation } from "react-i18next";

type Props = {
    mapType: string
    setMapType: Dispatch<SetStateAction<string>>
};

export default function MapTypeDropdown({mapType, setMapType}: Props) {
  const { t } = useTranslation();
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full xs:w-[180px] bg-secondary text-secondary-foreground border-border">
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent className="z-[1001] bg-popover text-popover-foreground border-border">
          {types.map((type) => (
            <SelectItem key={type} value={type} className="capitalize"> 
            {t(`mapTypes.${type}`)} 
            </SelectItem>
           ))}
      </SelectContent>
    </Select>
  )
}
 
const types = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
]