// src/components/LastRunDateComponent.tsx
import React from 'react';
import { skeleton } from '../styled/index.css';
import { LastRunDate,LastRunDateHeader } from '../../../VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/BPR/styles.css';

interface LastRunDateComponentProps {
  lastRunDate: string;
}

const LastRunDateComponent: React.FC<LastRunDateComponentProps> = ({ lastRunDate }) => {
  return (
    <div className={LastRunDate}>
      {lastRunDate === "Loading" ? (
        <div className={skeleton} style={{ height: 30, width: 150 }} />
      ) : (
        <div className={LastRunDateHeader}>{lastRunDate}</div>
      )}
    </div>
  );
};

export default LastRunDateComponent;
