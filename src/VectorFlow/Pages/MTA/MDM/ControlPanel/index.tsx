
  import { useNavigate } from "react-router-dom"
  const ControlPanel = () => {
    const navigate = useNavigate();
  
    return (
      <>
        <button onClick={()=>navigate('/master-data-management/view-modify')}>Control Panel</button>
      </>
    )
  }
  
  export default ControlPanel
  