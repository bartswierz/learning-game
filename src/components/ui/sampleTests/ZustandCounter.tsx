import useSettingsStore from "@/store/store";

const ZustandCounter = () => {
  // const { count, increment } = useSettingsStore();
  const count = useSettingsStore((state) => state.count);
  const increment = useSettingsStore((state) => state.increment);
  // console.log("COUNT: ", count);

  return (
    <div>
      <div>
        {/* <button aria-label="Increment value" onClick={increment} data-testid="increment"> */}
        <button aria-label="Increment value" onClick={increment}>
          Increment
        </button>
        <span role="contentinfo" className="b text-xl">
          {count}
        </span>
      </div>
    </div>
  );
};

export default ZustandCounter;
