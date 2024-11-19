import React,{useState} from 'react'
import { useNavigate } from 'react-router';
import VFModalCard from '../../../../../components/VectorFLOW/commons/VFModalCard'


const ApplicationSelectModal = ({isModalOpen, setIsModalOpen}:any) => {
    
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value);
    };

    const navigate = useNavigate();
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if(selectedOption ==="MTA"){
        setIsModalOpen(false);
      }
      else{
        navigate("/master-data-management/mto-control-panel");
      }
    };
  return (
    <VFModalCard openModal={isModalOpen} closeModal={() => {null}} headerText={"Choose Application"} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"} >
        <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          zoom: 2,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fffcfc", // White form background
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{fontSize: '12px', color: "#d63384", marginBottom: "20px" }}>Choose an Option</h2>
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              color: "#d63384", // Pink text
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              value="MTA"
              checked={selectedOption === "MTA"}
              onChange={handleOptionChange}
              style={{ marginRight: "8px" }}
            />
            MTA
          </label>
          <label
            style={{
              color: "#d63384", // Pink text
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              value="MTO"
              checked={selectedOption === "MTO"}
              onChange={handleOptionChange}
              style={{ marginRight: "8px" }}
            />
            MTO
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#d63384", // Pink button background
            color: "#fff", // White button text
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "8px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#c21873") // Darker pink on hover
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#d63384") // Original pink
          }
        >
          Submit
        </button>
      </form>
    </div>
    </VFModalCard>
  )
}

export default ApplicationSelectModal