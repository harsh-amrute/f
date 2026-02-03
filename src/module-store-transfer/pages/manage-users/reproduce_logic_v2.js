
const isDynamicPermissions = false; // Testing FALSE case

const dataAllPermissions = [
{
    "application_name": "Distribution",
    "application_id": 2,
    "product_permission_ids": [
        // Leaf Nodes (L3)
        { "id": 1, "product_hierarchy_1": "Level1", "product_hierarchy_2": "Level2_A", "product_hierarchy_3": "Leaf_X", "h_id": "L1_L2A_LX", "isActive": true },
        { "id": 2, "product_hierarchy_1": "Level1", "product_hierarchy_2": "Level2_A", "product_hierarchy_3": "Leaf_Y", "h_id": "L1_L2A_LY", "isActive": true },
        { "id": 3, "product_hierarchy_1": "Level1", "product_hierarchy_2": "Level2_B", "product_hierarchy_3": "Leaf_Z", "h_id": "L1_L2B_LZ", "isActive": true },
        
        // Node Definitions (L2, where L3 is empty)
        { "id": 4, "product_hierarchy_1": "Level1", "product_hierarchy_2": "Level2_A", "product_hierarchy_3": "", "h_id": "L1_L2A", "isActive": true },
        { "id": 5, "product_hierarchy_1": "Level1", "product_hierarchy_2": "Level2_B", "product_hierarchy_3": "", "h_id": "L1_L2B", "isActive": true },
        
        // IA Definitions
        { "id": 6, "product_hierarchy_1": "Level1", "product_hierarchy_2": "Level2_A", "product_hierarchy_3": "", "h_id": "L1_L2A_IA", "isActive": true } // Mock IA
    ]
}
];

// Test Cases
const permissions = {
    "Distribution": {
        "product_permission": [
            ["Level1"], // Case 1: Parent Selection -> Should get Leaf_X, Leaf_Y, Leaf_Z (Nodes with 3 levels). Should NOT get L1_L2A, L1_L2B.
            ["Level1", "Level2_A"], // Case 2: L2 Selection -> Should get Leaf_X, Leaf_Y. Should NOT get L1_L2A.
            ["Level1", "Level2_A", "isActive"] // Case 3: IA Selection -> Should get L1_L2A_IA (if logic mapped to it).
        ]
    }
};

const payload = {};

// LOGIC SIMULATION
const appNames = Object.keys(permissions);

appNames.forEach((appName) => {
    const appData = dataAllPermissions.find(d => d.application_name === appName);
    if (!appData) return;

    const appId = appData.application_id;
    const appPermissions = permissions[appName];

    Object.keys(appPermissions).forEach((permType) => {
        if (!payload[permType]) payload[permType] = [];

        const paths = appPermissions[permType];
        
        const defKey1 = `${permType}_ids`;
        const defKey2 = `${permType.replace("_permission", "")}_permission_ids`;
        const definitions = appData[defKey1] || appData[defKey2] || [];

        const ids = [];
        const prefix = permType.split("_")[0];

        if (Array.isArray(definitions)) {
            paths.forEach((path) => {
                const isIA = path[path.length - 1] === "isActive";
                const hierarchyPath = isIA ? path.slice(0, -1) : path;
                
                // *** LOGIC VARIATION ***
                if (!isDynamicPermissions) {
                    // Logic For False
                     const matchedDefs = definitions.filter((def) => {
                       // Common Helper
                       const h1 = def[`${prefix}_hierarchy_1`] || def[`hierarchy_1`] || def[`${prefix}_heirarchy_1`] || def[`heirarchy_1`];
                       const h2 = def[`${prefix}_hierarchy_2`] || def[`hierarchy_2`] || def[`${prefix}_heirarchy_2`] || def[`heirarchy_2`];
                       const h3 = def[`${prefix}_hierarchy_3`] || def[`hierarchy_3`] || def[`${prefix}_heirarchy_3`] || def[`heirarchy_3`];

                       // IA Case: Specific Match (including isActive flag if relevant, but user said map to object with isActive:true)
                       if (isIA) {
                           // Exact path match
                           if (h1 !== hierarchyPath[0]) return false;
                           
                           if (hierarchyPath.length > 1) {
                               if (h2 !== hierarchyPath[1]) return false;
                           } else {
                               if (h2 && h2 !== "") return false;
                           }
                           
                           if (hierarchyPath.length > 2) {
                               if (h3 !== hierarchyPath[2]) return false;
                           } else {
                               if (h3 && h3 !== "") return false;
                           }

                           // User requirement: IA matches the node where isActive: true
                           // In our data, IA entry is "L1_L2A_IA" but normally it maps to the node "L1_L2A" with isActive=true.
                           // User example: ['LL1', 'LL2_1', 'isActive'] -> Maps to object with h1:LL1, h2:LL2_1, h3:"", isActive:true.
                           // In my mock data, ID 4 matches this signature for L1_L2A. 
                           // ID 6 is my manual "IA" entry logic?
                           // Actually the user example matched ID 1580 which was the node itself. 
                           // So we should match the NODE definition (h3="") having isActive:true.
                           
                           if (def.isActive !== true) return false;
                           return true;
                       }

                       // Standard Case (Cascade)
                       // 1. Path Match (Prefix)
                       if (h1 !== hierarchyPath[0]) return false;
                       if (hierarchyPath.length > 1 && h2 !== hierarchyPath[1]) return false;
                       if (hierarchyPath.length > 2 && h3 !== hierarchyPath[2]) return false;

                       // 2. Leaf Requirement (All 3 levels must be present)
                       if (!h1 || h1 === "") return false;
                       if (!h2 || h2 === "") return false;
                       if (!h3 || h3 === "") return false;

                       return true;
                    });
                    
                    matchedDefs.forEach(def => ids.push(def.h_id));

                } else {
                    // Logic For True (Previous Exact Match)
                    const matchedDef = definitions.find((def) => {
                        // ... (Existing Logic)
                        return false; 
                    });
                    if (matchedDef) ids.push(matchedDef.h_id);
                }
            });
        }

        // Add to Payload
        let appEntry = payload[permType].find((e) => e.appId === appId);
        if (!appEntry) {
            appEntry = { appId: appId, perm: [] };
            payload[permType].push(appEntry);
        }
        appEntry.perm = Array.from(new Set([...appEntry.perm, ...ids]));
    });
});

console.log(JSON.stringify(payload, null, 2));
