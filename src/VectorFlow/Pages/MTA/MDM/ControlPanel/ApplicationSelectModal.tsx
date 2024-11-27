import React,{useState} from 'react'
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
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



const ActionSelectModal = ({url}:any) => {
  const navigate = useNavigate();

  return (
    <Container>
      {[
        { text: 'Make to Availability (MTA)', icon: '/assets/img/planning.svg', link: url},
        { text: 'Make to Order (MTO)', icon: "/assets/img/Prod-icon.svg", link: "/mto"+url},
        { text: 'Inter Store Transfer (IST)', icon: "/assets/img/IST 1.svg", link: url},
      ].map((option, index) => (
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




const ApplicationSelectModal = ({url}: any) => {
    
  return (
    <div>

    <VFModalCard openModal={true} closeModal={() => {null}} headerText={"Choose Application"} headerIcon={""} closeIcon={""} >
        <ActionSelectModal url={url}/>
    </VFModalCard>
    </div>
  )
}

export default ApplicationSelectModal