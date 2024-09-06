import axios from "axios";
import { MerchandisingGridPayload } from "../../../../../VectorFlow/types/BPR";

export namespace MerchandisingGrid {
  export const getRemovalData = async (
    body: MerchandisingGridPayload = {
        fulfillment:"incomplete",
        itr:"high"
    }
  ) => {
    return await axios.post(
      process.env.REACT_APP_VF_MOCK_API_HOST +
        `/api/ist/supply-chain-intelligence-hub/grid-details`,
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };
}
