import { useEffect, useState } from "react";
import {
  VFErrorFallBackHeader,
  VFErrorFallBackWrapper,
  VFErrorFallBackContainer,
  VFErrorFallBackButtonGroup,
  VFErrorFallBackTextContent,
  VFErrorFallBackButton,
  VFErrorFallBackButtonGhost,
} from "./styles.css";
import SafeLottie from "../../../components/commons/SafeLottie";

const JSON_PATH = "/assets/img/VectorFLOW/BPR/CoffeeSpiling.json";

const VFErrorFallBack = () => {
  const [animationData, setAnimationData] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const base = process.env.PUBLIC_URL || ""; // important for CRA/public paths
        const res = await fetch(`${base}${JSON_PATH}`);
        if (!res.ok) throw new Error(`Failed to fetch Lottie (${res.status})`);
        const json = await res.json();
        if (!cancelled) setAnimationData(json);
      } catch (e) {
        console.error("Lottie load error:", e);
        if (!cancelled) setAnimationData(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleGoHome = () => (window.location.href = "/landing-page");
  const handleRefresh = () => window.location.reload();

  return (
    <div className={VFErrorFallBackWrapper}>
      <div className={VFErrorFallBackContainer}>
        {animationData ? (
          // <Lottie animationData={animationData} style={{ height: 280 }} loop autoplay />
          <SafeLottie
            src={animationData}
            loop
            autoplay
            style={{ height: 280 }}
          />
        ) : (
          <div style={{ height: 280 }} /> // optional placeholder
        )}

        <h1 className={VFErrorFallBackHeader}>Oops, Something Went Wrong!!!</h1>

        <div className={VFErrorFallBackTextContent}>
          We are working on this and it might take some time <br />
          You can <b>Refresh</b> or <b>Go Back to Home</b>.
        </div>

        <div className={VFErrorFallBackButtonGroup}>
          <button className={VFErrorFallBackButton} onClick={handleRefresh}>
            Refresh Now
          </button>
          <div style={{ height: 10 }} />
          <button className={VFErrorFallBackButtonGhost} onClick={handleGoHome}>
            Go back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VFErrorFallBack;
