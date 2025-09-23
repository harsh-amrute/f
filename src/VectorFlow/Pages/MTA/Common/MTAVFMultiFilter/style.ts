import styled from 'styled-components';

export const ModalContent = styled.div`
  padding: 0;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const FilterLayout = styled.div`
  display: flex;
  flex: 1;
  min-height: 400px;
  overflow: hidden;
`;

export const SidebarSection = styled.div`
  width: 200px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
`;

export const SidebarItem = styled.div<{ active: boolean }>`
  padding: 0.875rem 1.5rem;
  cursor: pointer;
  background: ${props => props.active ? '#fce4f0' : 'transparent'};
  color: ${props => props.active ? '#B93B7E' : '#495057'};
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '400'};
  margin-right: ${props => props.active ? '-1px' : '0'};

  &:hover {
    background: ${props => props.active ? '#fce4f0' : '#e9ecef'};
    color: #B93B7E;
  }
`;

export const ContentSection = styled.div`
  flex: 1;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow-y: auto;
`;

export const FooterSection = styled.div`
  background: #f8f9fa;
  padding: 0.4rem 2rem;
  border-top: 1px solid #e9ecef;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const FooterButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  align-items: center;
`;
