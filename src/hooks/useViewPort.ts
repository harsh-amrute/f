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
    const {height:screenHeight,width:screenWidth} = screen

    const getScreenZoomValue = useCallback(():number=>{
        if(screenWidth >size.laptop && screenWidth<size.desktop ){
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