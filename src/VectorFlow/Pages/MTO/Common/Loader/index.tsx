import VFOverlay from "../../../../../components/VectorFLOW/commons/VFOverlay";
import { useUserData } from "../../../../../context";
import SafeLottie from "../../../../../components/commons/SafeLottie";
import GridLoaderRB from "../../../../../lottie/Grid LoaderRoyalBlue.json";
import GridLoader from "../../../../../lottie/Grid Loader.json";

interface Props {
  message?: string;
}
const OverlayLoader = ({ message }: Props) => {
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;

  return (
    <VFOverlay>
      {/* <h1 >{message ? message : 'Loading....'}</h1> */}
      <div
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Lottie
          animationData={
            themeUi === "REGALBLAZE"
              ? "/assets/img/VectorFLOW/BPR/Grid LoaderRoyalBlue.json"
              : "/assets/img/VectorFLOW/BPR/Grid Loader.json"
          }
          loop
          autoplay
          style={{ height: "200px", width: "200px" }}
        /> */}
        <SafeLottie
          src={
            themeUi === "REGALBLAZE"
              ? GridLoaderRB
              : GridLoader
          }
          loop
          autoplay
          style={{ height: "200px", width: "200px" }}
        />

        {message}
      </div>
    </VFOverlay>
  );
};

export default OverlayLoader;
