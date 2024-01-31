import useSettingsStore from "@/store/store";

const ZustandCounter = () => {
  const { count, increment } = useSettingsStore();

  return (
    <div>
      <div>
        {/* <button aria-label="Increment value" onClick={increment} data-testid="increment"> */}
        <button aria-label="Increment value" onClick={increment} data-testid="increment">
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
