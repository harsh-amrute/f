import Approval from "./Approval"; // Import the Approval component
import "../styles.css";

const MCGridView = ({ status, view, setView }: any) => {
    console.log(setView)
    console.log("status inside MCGridView:", status);

    return (
        <div>
            {(status === "very-incomplete") || (status==="incomplete") ? (
                <Approval view={view} setView={setView} /> // Pass view and setView to Approval
            ) : status === "surplus" ? (
                <div>Removal screen</div>
            ) : null}
        </div>
    );
};

export default MCGridView;
