import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full xs:w-[180px] bg-secondary text-foreground border-border">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent className="z-[1001] bg-popover text-popover-foreground border-border">
        {location === "custom" && (
          <SelectItem value="custom">Custom</SelectItem>
        )}
        {locations.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const locations = [
  "Groningen",
  "Ryazan",
  "San Francisco",
  "Kyoto",
  "Sao Paulo",
  "Wroclaw",
  "Santander",
  "Mumbai",
  "Alexandria",
  "Phoenix",
  "Birmingham",
  "Singapore",
  "Upsala",
];
