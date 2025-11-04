// src/hooks/index.ts (or wherever your hook is)

import { useQuery } from "@tanstack/react-query"; // <-- 1. Import useQuery
import { LoginAuditReportService } from "./api";

export const useLoginAuditReport = () => {
    // 2. Use 'useQuery' instead of 'useMutation'
    return useQuery(
        ['loginAuditReport'], // A unique key for this query
        async () => {
            const response = await LoginAuditReportService.getLoginAuditReportData();
            return response.data; // 3. Return the data
        }
    );
}