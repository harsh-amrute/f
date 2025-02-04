// src/components/LastRunDateComponent.tsx
import React from 'react';
import { Skeleton } from '../styled';
import { LastRunDate,LastRunDateHeader } from '../../../VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/BPR/styles';

interface LastRunDateComponentProps {
  lastRunDate: string;
}

const LastRunDateComponent: React.FC<LastRunDateComponentProps> = ({ lastRunDate }) => {
  return (
    <LastRunDate>
      {lastRunDate === "Loading" ? (
        <Skeleton style={{ height: 30, width: 150 }} />
      ) : (
        <LastRunDateHeader>{lastRunDate}</LastRunDateHeader>
      )}
    </LastRunDate>
  );
};

export default LastRunDateComponent;
