import React, { useState } from 'react';
import './styles';

const DropdownCellRenderer: React.FC<any> = (params) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleDropdown = () => {
        setShowMenu(!showMenu);
    };

    const clearAll = () => {
        const checkboxes = document.querySelectorAll('.dropdown-menu input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach(checkbox => checkbox.checked = false);
    };

    const confirmSelection = () => {
        alert('Selection confirmed!');
        setShowMenu(false);
    };

    return (
        <div className="dropdown">
            <div className="dropdown-header" onClick={toggleDropdown}>
                <span>Select</span>
                <span className="arrow">&#x25BC;</span>
            </div>
            {showMenu && (
                <div className="dropdown-menu">
                    <input type="text" placeholder="Search..." />
                    {/* <label><input type="checkbox" /> Planning</label>
                    <label><input type="checkbox" /> Transportation</label>
                    <label><input type="checkbox" /> Annealing</label>
                    <label><input type="checkbox" /> Annealing - Rolling</label> */}
                    <div className="dropdown-footer">
                        <button onClick={clearAll}>Clear All</button>
                        <button onClick={confirmSelection}>&#x2713;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownCellRenderer;