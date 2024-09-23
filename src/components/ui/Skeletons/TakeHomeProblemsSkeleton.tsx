import { Skeleton } from "../shadcn/skeleton";

const TakeHomeProblemsSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-start mt-8">
      {/* HEADING */}
      <Skeleton className="max-w-[431px] w-full h-8" />

      {/* PROBLEMS FORM - INCLUDES GENERATE WORKSHEET BTN */}
      <div className="mb-5">
        <div className="flex flex-col gap-y-4">
          {/* NUMBER ONE RANGES - MIN/MAX */}
          <div className="mt-3">
            <Skeleton className="w-[225px] h-[182px]" />
          </div>

          {/* NUMBER TWO RANGES - MIN/MAX */}
          <Skeleton className="w-[225px] h-[182px]" />

          {/* PROBLEMS LABEL & SELECT FIELD */}
          <Skeleton className="w-[160px] h-[63px]" />

          {/* GENERATE WORKSHEET BTN */}
          <Skeleton className="w-[225px] h-[48px]" />

          {/* VIEW PDF BTN */}
          <div className="flex justify-center">
            <Skeleton className="w-[94px] h-[48px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeHomeProblemsSkeleton;
