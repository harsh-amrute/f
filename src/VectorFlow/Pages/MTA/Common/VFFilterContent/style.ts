import styled from 'styled-components';

export const FilterGroup = styled.div`
    height:80px;
    background-color:white;
    display:flex;
    align-items: flex-start;
    gap:20px;
    padding: 0;
    margin-top: -10px;
    margin-left: 5px;
    margin-right: 5px;
`

export const FilterColumn = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 300px;
`;


export const FilterTitle = styled.h3<{ subTitle?: boolean }>`
  margin: 0 0 0.5rem 0;
  color: ${props => props.subTitle ? '#666' : '#333'};
  font-weight: ${props => props.subTitle ? '400' : '500'};
  font-size: ${props => props.subTitle ? '13px' : '14px'};
  font-style: ${props => props.subTitle ? 'italic' : 'normal'};
  font-family: 'Roboto', sans-serif;
`;

export const DropDownWrapper = styled.div`
    height:50px;
`

export const TextWrapper = styled.div`
    display: flex;
    font-family:Roboto;
    font-weight:500;
    font-size:14px;
    line-height:24px;
    margin: 0 0 0.5rem 0;
    align-items:center;
`

export const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #B93B7E;
    box-shadow: 0 0 0 2px rgba(185, 59, 126, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #B93B7E;
    box-shadow: 0 0 0 2px rgba(185, 59, 126, 0.1);
  }
`;
