import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  fontFamily: roboto;
  background:white;
  padding: 40px 60px;
  border-radius: 16px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);

`;

const OptionCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 26px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    background: rgb(128, 0, 64, 0.3);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }
`;

const Icon = styled.div`
  width: 45px;
  height: 45px;
  background-color: #ffe0f0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    position: absolute;
    top: 20%;
    left: 30%;
    width: 40px;
    height: 40px;
  }
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgb(128, 0, 64);
`;



const ActionSelectModal = ({redirectUrl}:any) => {
  const navigate = useNavigate();

  const ref = React.useRef({
    appData: [
      { text: 'Make to Availability (MTA)', icon: '/assets/img/planning.svg', link: redirectUrl },
      { text: 'Make to Order (MTO)', icon: "/assets/img/Prod-icon.svg", link: "/mto" + redirectUrl },
      { text: 'Inter Store Transfer (IST)', icon: "/assets/img/IST 1.svg", link: redirectUrl },
    ]
  });

  return (
    <Container>
      <span style={{fontSize: '16px', fontWeight: 'bold', fontFamily: 'roboto', }}>Select Application</span>
      {ref?.current?.appData.map((option, index) => (
        <OptionCard key={index} onClick={() => {navigate(option.link);}}>
          <Icon>
            <img src={option.icon} alt={option.text} />
          </Icon>
          <Text>{option.text}</Text>
        </OptionCard>
      ))}
    </Container>
  );
};




const ApplicationSelectModal = ({redirectUrl}: any) => {
    
  return (
    <div style={{paddingTop:'40px', width: '100%', display: 'flex', alignItems: 'center', justifyContent:'center'}}>

    {/* <div  headerText={"Choose Application"} headerIcon={""} closeIcon={""} > */}
    <div style={{height: '40%', width: '50%',  zoom: 1.5}}>
        <ActionSelectModal redirectUrl={redirectUrl}/>
    </div>
    </div>
  )
}

export default ApplicationSelectModal