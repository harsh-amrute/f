import React from 'react';
import { Theme } from '../styles/global';
interface SvgRendererProps {
  theme: Theme
  alt?: string;
  view?:boolean

}

export const ExportExcelSVG: React.FC<SvgRendererProps> = ({ theme }) => {
  const fillColor = theme === 'REGALBLAZE' ? "#FCA311" : "#BC3D81";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.001" viewBox="0 0 24 23.001">
    <g id="_12d36a3d034577c8172e565b9d8c82eb" data-name="12d36a3d034577c8172e565b9d8c82eb" transform="translate(0 -0.5)">
      <path
        id="Path_11318"
        data-name="Path 11318"
        d="M13.5,23.5a.487.487,0,0,1-.076-.006l-13-2A.5.5,0,0,1,0,21V4a.5.5,0,0,1,.388-.487l13-3A.5.5,0,0,1,14,1V23a.5.5,0,0,1-.5.5ZM1,20.571l12,1.846V1.628L1,4.4Z"
        fill={fillColor}
      />
      <path
        id="Path_11319"
        data-name="Path 11319"
        d="M23.5,21.5h-10a.5.5,0,0,1,0-1H23V3.5H13.5a.5.5,0,0,1,0-1h10A.5.5,0,0,1,24,3V21A.5.5,0,0,1,23.5,21.5Zm-14-5a.5.5,0,0,1-.424-.235l-5-8a.5.5,0,1,1,.848-.53l5,8A.5.5,0,0,1,9.5,16.5Z"
        fill={fillColor}
      />
      <path
        id="Path_11320"
        data-name="Path 11320"
        d="M4.5,16.5a.5.5,0,0,1-.424-.765l5-8a.5.5,0,1,1,.848.53l-5,8A.5.5,0,0,1,4.5,16.5Zm13,5A.5.5,0,0,1,17,21V3a.5.5,0,0,1,1,0V21A.5.5,0,0,1,17.5,21.5Z"
        fill={fillColor}
      />
      <path
        id="Path_11321"
        data-name="Path 11321"
        d="M23.5,18.5h-10a.5.5,0,0,1,0-1h10a.5.5,0,0,1,0,1Zm0-3h-10a.5.5,0,0,1,0-1h10a.5.5,0,0,1,0,1Zm0-3h-10a.5.5,0,0,1,0-1h10a.5.5,0,0,1,0,1Zm0-3h-10a.5.5,0,0,1,0-1h10a.5.5,0,0,1,0,1Zm0-3h-10a.5.5,0,0,1,0-1h10a.5.5,0,0,1,0,1Z"
        fill={fillColor}
      />
    </g>
  </svg>
  );
};



export const SaveSVG: React.FC<SvgRendererProps> = ({theme }) => {

  const fillColor = theme === 'REGALBLAZE' ? "#FCA311" : "#BC3D81";

  return (
    <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="23.001" viewBox="0 0 28.633 28.633">
  <path id="diskette" d="M29.356,7,23.629,1.277A.954.954,0,0,0,22.952,1H3.863A2.863,2.863,0,0,0,1,3.863V26.77a2.863,2.863,0,0,0,2.863,2.863H26.77a2.863,2.863,0,0,0,2.863-2.863V7.681A.954.954,0,0,0,29.356,7ZM19.134,2.909V8.635H11.5V2.909ZM7.681,27.724V21.043a.954.954,0,0,1,.954-.954H22a.954.954,0,0,1,.954.954v6.681Zm20.043-.954a.954.954,0,0,1-.954.954H24.861V21.043A2.863,2.863,0,0,0,22,18.18H8.635a2.863,2.863,0,0,0-2.863,2.863v6.681H3.863a.954.954,0,0,1-.954-.954V3.863a.954.954,0,0,1,.954-.954H9.59V8.635A1.909,1.909,0,0,0,11.5,10.544h7.635a1.909,1.909,0,0,0,1.909-1.909V2.909H22.56l5.163,5.163Z" transform="translate(-1 -1)" fill={fillColor}/>
</svg>

  );
};


export const ResetSVG: React.FC<SvgRendererProps> = ({theme }) => {

  const fillColor = theme === 'REGALBLAZE' ? "#FCA311" : "#BC3D81";

  return (
    <svg id="refresh" xmlns="http://www.w3.org/2000/svg"  width="24" height="23.001" viewBox="0 0 22.546 25.123">
    <path id="Path_11029" data-name="Path 11029" d="M16.69,9.249a10.946,10.946,0,0,0-3.162.462.966.966,0,1,1-.555-1.851,12.878,12.878,0,0,1,3.718-.543A11.183,11.183,0,1,1,5.417,18.5a11.1,11.1,0,0,1,1.9-6.222.966.966,0,0,1,1.6,1.081A9.171,9.171,0,0,0,7.349,18.5a9.341,9.341,0,1,0,9.34-9.25Z" transform="translate(-5.417 -4.56)" fill={fillColor} fillRule="evenodd"/>
    <path id="Path_11030" data-name="Path 11030" d="M17.523,3.906a.966.966,0,0,1,.285,1.336L16.171,7.765,18.718,9.4a.966.966,0,0,1-1.046,1.625L14.31,8.865a.966.966,0,0,1-.288-1.338L16.187,4.19a.966.966,0,0,1,1.337-.285Z" transform="translate(-7.335 -3.75)" fill={fillColor} fillRule="evenodd"/>
  </svg>
  

  );
};

export const GridView: React.FC<SvgRendererProps> = ({theme,view }) => {

  const activeFillColor = theme === 'REGALBLAZE' ? "#FCA311" : "#BC3D81";
  const inactiveFillColor = "#a8a8a8";
  const fillColor = view ? activeFillColor : inactiveFillColor;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="22" viewBox="0 0 37 22">
      <g id="Group_4112" data-name="Group 4112" transform="translate(-0.348 0.002)">
        <rect id="Rectangle_11420" data-name="Rectangle 11420" width="37" height="5" rx="1" transform="translate(0.348 -0.002)" fill={fillColor} />
        <rect id="Rectangle_11421" data-name="Rectangle 11421" width="37" height="5" rx="1" transform="translate(0.348 7.998)" fill={fillColor} />
        <rect id="Rectangle_11422" data-name="Rectangle 11422" width="37" height="5" rx="1" transform="translate(0.348 16.998)" fill={fillColor} />
      </g>
    </svg>
  );
};




export const ChartView: React.FC<SvgRendererProps> = ({theme,view }) => {

  const activeFillColor = theme === 'REGALBLAZE' ? "#FCA311" : "#BC3D81";
  const inactiveFillColor = "#a8a8a8";
  const fillColor = view ? activeFillColor : inactiveFillColor;


  return (
    
    <svg xmlns="http://www.w3.org/2000/svg" width="26.2" height="26.792" viewBox="0 0 26.2 26.792">
  <g id="_8a4e174b3b44e8626dd24d036a35900f" data-name="8a4e174b3b44e8626dd24d036a35900f" transform="translate(0.244 0.223)">
    <path id="Path_11013" data-name="Path 11013" d="M22.042,9.771A10.715,10.715,0,0,0,11.775.778a.92.92,0,0,0-.956.885h0v.083L11.4,10.4a1.062,1.062,0,0,0,1.121.991l8.674-.578a.92.92,0,0,0,.85-.991Z" transform="translate(2.911)" fill='none' stroke={fillColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fillRule="evenodd"/>
    <path id="Path_11014" data-name="Path 11014" d="M8.679,4.776a1.18,1.18,0,0,1,1.345.673,1.062,1.062,0,0,1,.106.389c.118,1.676.366,5.346.507,7.328a1.345,1.345,0,0,0,1.44,1.251h0l7.281-.448a1.18,1.18,0,0,1,1.251,1.18h0a9.925,9.925,0,0,1-18.6,4.119,9.441,9.441,0,0,1-1.18-3.611,6.089,6.089,0,0,1-.071-1.18,9.936,9.936,0,0,1,7.907-9.7" transform="translate(0 1.148)" fill="none" stroke={fillColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fillRule="evenodd"/>
  </g>
</svg>
      
  );
};






