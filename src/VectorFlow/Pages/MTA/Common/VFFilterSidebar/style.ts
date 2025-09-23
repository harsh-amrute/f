import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  height: 100%;
  padding: 1rem 0;
`;

export const SidebarHeader = styled.h3`
  padding: 0 1rem 1rem;
  margin: 0;
  border-bottom: 1px solid #dee2e6;
  color: #333;
`;

export const SidebarItem = styled.div<{ active: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: ${props => props.active ? '#e3f2fd' : 'transparent'};
  color: ${props => props.active ? '#1976d2' : '#333'};
  border-right: ${props => props.active ? '3px solid #1976d2' : 'none'};
  transition: all 0.2s ease;
  
  &:hover {
    background: #e3f2fd;
  }
`;

export const ModalContent = styled.div`
  padding: 1rem;
  
  .filter-layout {
    display: flex;
    min-height: 400px;
  }
  
  .sidebar {
    width: 250px;
    background: #f8f9fa;
    border-right: 1px solid #dee2e6;
    padding: 1rem 0;
  }
  
  .sidebar-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    
    &.active {
      background: #e3f2fd;
      color: #1976d2;
      border-right: 3px solid #1976d2;
    }
    
    &:hover {
      background: #e3f2fd;
    }
  }
  
  .filter-content {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

export const FilterTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: 500;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;