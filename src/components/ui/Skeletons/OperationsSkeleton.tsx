import { Skeleton } from "../shadcn/skeleton";

const OperationsSkeleton = () => {
  return (
    <div className="flex items-center flex-col justify-center mt-[56px]">
      {/* HEADING, QUESTION NUMBER, SCORE, ATTEMPTS LEFT */}
      <div className="flex flex-col items-center justify-centerx gap-4 mb-4">
        <Skeleton className="w-[178px] h-[196px]" />
      </div>

      {/* INPUT DISPLAY, CHECK ANSWER BUTTON, NUMBER PAD */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <Skeleton className="w-[300px] h-[48px]" />
        <Skeleton className="w-[300px] h-[48px]" />
        <Skeleton className="w-[300px] h-[288px]" />
      </div>
    </div>
  );
};

export default OperationsSkeleton;
