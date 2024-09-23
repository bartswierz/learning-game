import { Skeleton } from "../shadcn/skeleton";

const containerStyle = "flex flex-wrap justify-center max-w-[1110px] gap-4 mb-6";

const AlphabeticalOrderSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-6 my-[56px]">
      <Skeleton className="max-w-[576px] w-full h-[32px]" />
      <div className="mt-4">
        {/* DROPPABLE BOXES */}
        <div className={containerStyle}>
          {Array.from({ length: 26 }).map((_, index) => (
            <Skeleton key={index} className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px]"></Skeleton>
          ))}
        </div>

        {/* DRAGGABLE BOXES */}
        <div className={containerStyle}>
          {Array.from({ length: 26 }).map((_, index) => (
            <Skeleton key={index} className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px]"></Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlphabeticalOrderSkeleton;
