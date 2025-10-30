import { Suspense, lazy, useEffect, useState } from "react";
import { SectionWrapper, ChartWrapper, Loader } from "./styles.css";

const MyChart = lazy(() => import("./MyChart")); // still code-split

const ResourceViewChart = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className={SectionWrapper}>
      <div className={ChartWrapper}>
        {ready ? (
          <Suspense fallback={<div className={Loader}>Loading chart...</div>}>
            <MyChart />
          </Suspense>
        ) : (
          <div className={Loader}>Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default ResourceViewChart;
