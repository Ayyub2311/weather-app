import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function CurrentSkeleton() {
  return (
    <Card
      className="md:pb-11" 
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6 2xl:justify-between"
    >
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="w-30 h-15" />
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="w-36 h-7" />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl text-center text-muted-foreground">Local Time:</p>
        <Skeleton className="w-36 h-10" />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground">Feels like</p>
          <Skeleton className="w-16 h-6" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground">Humidity</p>
          <Skeleton className="w-16 h-6" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground">Wind</p>
          <Skeleton className="w-16 h-6" />
        </div>
      </div>
    </Card>
  );
}
