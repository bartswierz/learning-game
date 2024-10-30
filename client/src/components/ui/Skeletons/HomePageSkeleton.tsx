import { Skeleton } from "../shadcn/skeleton";

const HomePageSkeleton = () => {
  return (
    <div className="container pb-12 mt-[56px]">
      <div className="flex justify-center mb-6">
        <Skeleton className="max-w-[476px] w-full h-[43px]" />
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homepageLinkSkeletonList.map(({ id, className }) => (
          <li key={id}>
            <Skeleton className={`h-[20vh] md:h-[30vh] min-h-[100px] ${className}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePageSkeleton;

const homepageLinkSkeletonList = [
  {
    id: 1,
    className: "rounded-tl-[50px] rounded-br-[50px]",
  },
  {
    id: 2,
    className: "rounded-tr-[50px] rounded-bl-[50px]",
  },
  {
    id: 3,
    className: "rounded-bl-[50px] rounded-tr-[50px]",
  },
  {
    id: 4,
    className: "rounded-br-[50px] rounded-tl-[50px]",
  },
  {
    id: 5,
    className: "rounded-tl-[50px] rounded-br-[50px]",
  },
  {
    id: 6,
    className: "rounded-tr-[50px] rounded-bl-[50px]",
  },
];
