import { Skeleton } from "../shadcn/skeleton";

const AnalogClockSkeleton = () => {
  return (
    <div className="pt-[4vh] pb-[8vh]">
      {/* HEADING */}
      <div className="flex justify-center">
        <Skeleton className="w-[266px] h-8" />
      </div>

      {/* CLOCK & DIFFICULTY TIERS  */}
      <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-[30px]">
        {/* CLOCK */}
        <Skeleton className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full" />

        <div className="flex flex-col justify-center items-center min-w-[280px]">
          {/* DIFFICULTY TEXT */}
          <div className="pt-6">
            <Skeleton className="w-[260px] h-6" />
          </div>

          {/* TIER CHOICES */}
          <div className="flex flex-col gap-6 my-4 w-full max-w-[75%]">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalogClockSkeleton;
