import { useCallback } from "react";



const useViewPort = ()=>{


     const size = {
        mobileS: 320,
        mobileM: 375,
        mobileL: 425,
        tablet: 768,
        laptop: 1024,
        laptopL: 1440,
        desktop: 1688,
      };
    const {innerHeight:screenHeight,innerWidth:screenWidth} = window

    const location = window.location

    const urlDisableZoomScaling = ['/supply-chain-intelligence-hub/planning','/insights-and-trends/research-insights','/insights-and-trends/buffer-trends'];

    const getScreenZoomValue = useCallback(():number=>{
        if(screenWidth >size.laptop && screenWidth<size.desktop && !urlDisableZoomScaling.includes(location.pathname)){
            return 0.75
        }
        if(screenWidth >size.desktop ){
            return 1
        }
        return 1
    },[screenWidth])

    const getGridZoom = useCallback(():number=>{

        if(screenWidth >size.laptop && screenWidth<size.desktop ){
            return 0.75
        }
        if(screenWidth >size.desktop ){
            return 1
        }
        return 1
    },[screenWidth])

    return {
        screenWidth,
        screenHeight,
        getScreenZoomValue,
        getGridZoom
    }
}

export default useViewPort