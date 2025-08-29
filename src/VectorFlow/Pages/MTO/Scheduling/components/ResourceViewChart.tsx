import React, { Suspense, lazy, useEffect, useState } from "react";
import styled from "styled-components";

const MyChart = lazy(() => import("./MyChart")); // still code-split

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0 16px 16px;
`;

const ChartWrapper = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
`;

const ResourceViewChart = () => {

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true)); 
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <SectionWrapper>
      <ChartWrapper>
        { 
        ready? 

          <Suspense fallback={<Loader>Loading chart...</Loader>}>
          <MyChart />
        </Suspense> 
        :
        <Loader>Loading chart...</Loader>
        }

      </ChartWrapper>
    </SectionWrapper>
  );
};

export default ResourceViewChart;
