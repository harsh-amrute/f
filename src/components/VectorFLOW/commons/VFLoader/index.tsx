import { useUserData } from "../../../../context";
import { SCLoaderContainer } from "../../layouts/SelectMaster/styles.css";
import SafeLottie from "../../../../components/commons/SafeLottie";

const VFLoader = ({ styles }: any) => {
  // return(
  //     <SCLoaderContainer>
  //         <img src="/assets/img/VectorFLOW/loaderBig.svg" data-testid="loader"/>
  //     </SCLoaderContainer>
  // )

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui || "";
  return (
    <div className={SCLoaderContainer} data-testid="loader">
      {/* <Lottie
        animationData={
          themeUi === "REGALBLAZE"
            ? "/assets/img/VectorFLOW/BPR/Grid LoaderRoyalBlue.json"
            : "/assets/img/VectorFLOW/BPR/Grid Loader.json"
        }
        loop
        autoplay
        style={styles ? { ...styles } : { height: "200px", width: "200px" }}
      /> */}

      <SafeLottie
        src={
          themeUi === "REGALBLAZE"
            ? "/assets/img/VectorFLOW/BPR/Grid LoaderRoyalBlue.json"
            : "/assets/img/VectorFLOW/BPR/Grid Loader.json"
        }
        loop
        autoplay
        style={styles ? { ...styles } : { height: "200px", width: "200px" }}
      />
    </div>
  );
};

export default VFLoader;
