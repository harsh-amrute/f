import styled from 'styled-components';

export const FilterGroup = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const FilterColumn = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 300px;
`;

export const FilterTitle = styled.h4<{ subTitle?: boolean }>`
  margin: 0 0 0.5rem 0;
  color: ${props => props.subTitle ? '#666' : '#333'};
  font-weight: ${props => props.subTitle ? '400' : '500'};
  font-size: ${props => props.subTitle ? '13px' : '14px'};
  font-style: ${props => props.subTitle ? 'italic' : 'normal'};
`;

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