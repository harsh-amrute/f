import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Use 'react-router-dom'
import { useUserData } from "../../../../context";
import {
  container,
  optionCard,
  icon,
  text,
  hoverBgVar,
  iconBgVar,
  textColorVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import OverlayLoader from "../../MTO/Common/Loader";

const ActionSelectModal = ({ redirectUrl }: any) => {
  const navigate = useNavigate();
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const [isRedirecting, setIsRedirecting] = React.useState(false); // ✅ added

  const ref = useRef<{
    appData: Array<{ text: string; icon: string; link: string }>;
  }>({
    appData: [],
  });


    const urlPermissionStr = user?.url_permission??[];
    const urlPermissionArr = urlPermissionStr || [];

  const updateAppData = (theme: any) => {
    const allOptions = [
      {
        text: "Make to Availability (MTA)",
        icon:
          theme === "REGALBLAZE"
            ? "/assets/img/planning1.svg"
            : "/assets/img/planning.svg",
        link: "/mta" + redirectUrl,
      },
      {
        text: "Make to Order (MTO)",
        icon:
          theme === "REGALBLAZE"
            ? "/assets/img/Prod-icon1.svg"
            : "/assets/img/Prod-icon.svg",
        link: "/mto" + redirectUrl,
      },
      {
        text: "Inter Store Transfer (IST)",
        icon:
          theme === "REGALBLAZE"
            ? "/assets/img/IST 2.svg"
            : "/assets/img/IST 1.svg",
        link: "/ist" + redirectUrl,
      },
    ];

    ref.current.appData = allOptions.filter((option) =>
      urlPermissionArr.includes(option.link)
    );
    if (ref.current.appData.length === 0) {
      ref.current.appData.push(allOptions[0]);
    }
  };
  updateAppData(themeUi);

  useEffect(() => {
    updateAppData(themeUi);
    if (urlPermissionArr.length > 0) {
      const urlPermission = urlPermissionArr.find(
        (item: any) => item.url === redirectUrl
      );
      if (urlPermission?.permission === "read") {
        ref.current.appData = ref.current.appData.filter(
          (item: any) => item.text !== "Make to Order (MTO)"
        );
      }
    }

    // Auto-redirect if only one option remains
    if (ref.current.appData.length === 1) {
      setIsRedirecting(true); 
      navigate(ref.current.appData[0].link);
    }
  }, [urlPermissionArr, redirectUrl, navigate]);

  // Theme tokens for this component (same values as your styled-components)
  const themeVars = {
    [hoverBgVar]:
      themeUi === "REGALBLAZE" ? "rgb(250, 246, 240)" : "rgba(128, 0, 64, 0.3)",
    [iconBgVar]: themeUi === "REGALBLAZE" ? "#FFEED3" : "#ffe0f0",
    [textColorVar]: themeUi === "REGALBLAZE" ? "#C7810E" : "rgb(128, 0, 64)",
  };

   if (isRedirecting) {
    return <OverlayLoader />;
  }

  return (
    <div className={container}>
      <span
        style={{ fontSize: "16px", fontWeight: "bold", fontFamily: "Roboto" }}
      >
        Select Application
      </span>

      {ref.current.appData.length > 0 ? (
        ref.current.appData.map((option, index) => (
          <div
            key={index}
            className={optionCard}
            onClick={() => navigate(option.link)}
            style={assignInlineVars(themeVars)} // provides hover bg via CSS var
          >
            <div className={icon} style={assignInlineVars(themeVars)}>
              <img src={option.icon} alt={option.text} />
            </div>
            <div className={text} style={assignInlineVars(themeVars)}>
              {option.text}
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

const ApplicationSelectModal = ({ redirectUrl }: any) => {
  return (
    <div
      style={{
        paddingTop: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "40%", width: "52%" }}>
        <ActionSelectModal redirectUrl={redirectUrl} />
      </div>
    </div>
  );
};

export default ApplicationSelectModal;
