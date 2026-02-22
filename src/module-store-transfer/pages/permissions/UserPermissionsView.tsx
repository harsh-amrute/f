import React, { useEffect, useState } from "react";
import { useUserData } from "../../../context";
import { MainService } from "../../../services/profile/api";
import PermissionHeirarchyCanvas from "../manage-users/PermissioinHeirarchyCanvas";

import styled from "styled-components";
import { profileOverView, subTitleBox, subTitlePad, subTitleSpan } from "./styles.css";

// Reusing styles from manage-users or creating local ones for Tabs
const TabsContainer = styled.div`
  display: flex;
  gap: 14px;
  background: white;
  padding: 10px 10px 0 10px;
  overflow-x: auto;
  margin-left: 80px;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1.6rem;
  border-radius: 24px;
  border-bottom: 2px solid ${({ active }) => (active ? "#b02792ff" : "transparent")};
  color: ${({ active }) => (active ? "#b02790ff" : "#666")};
  background: ${({ active }) => (!active ? "#eceeeeff" : "#e6b0dc64")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  white-space: nowrap;

  &:hover {
    color: #b0277bff;
    background-color: #f3e5f5;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  height: calc(100vh - 200px); 
  overflow: hidden;
  justify-content: center; /* Center the canvas */
`;

const CanvasSection = styled.div`
  flex: none; /* Do not stretch indefinitely */
  width: 90%; /* Occupy 90% width or specific px like 1200px */
  position: relative;
  overflow: hidden;
  margin-top: 20px; /* Spacing from tabs */
`;

const UserPermissionsView = () => {
  const { user } = useUserData();
  const [dataAllPermissions, setDataAllPermissions] = useState<any[]>([]);
  const [userPermissions, setUserPermissions] = useState<any>({});
  const [selectedApplication, setSelectedApplication] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allPermsRes, userPermsRes] = await Promise.all([
          MainService.getAllPermissions(),
          MainService.getUserPermissions(user.user.id),
        ]);

        let allPermissionsData: any[] = [];
        if (allPermsRes.data) {
          allPermissionsData = allPermsRes.data;
          setDataAllPermissions(allPermsRes.data);
          // Set default selected application
          if (allPermsRes.data.length > 0) {
            setSelectedApplication(allPermsRes.data[0].application_name);
          }
        }

        if (userPermsRes.data) {
           const isDynamicPermissions = (user.config_data.INHERITED_ACCESS === "1") || false;
           // Parse permissions
           const fetchedPermissionsArray = userPermsRes.data.permissions || userPermsRes.data;
           const newSelectedPermissions: any = {};
           
           if (Array.isArray(fetchedPermissionsArray) && allPermissionsData.length > 0) {
              fetchedPermissionsArray.forEach((appPerm: any) => {
                  const appName = appPerm.application_name;
                  const appData = allPermissionsData.find((d: any) => d.application_name === appName);
                  
                  if (appData) {
                    newSelectedPermissions[appName] = {};

                    // Iterate through keys (e.g., location_hids, product_hids)
                    Object.keys(appPerm).forEach((key) => {
                        if (key.endsWith('_hids')) {
                            const hids = appPerm[key];
                            if (!Array.isArray(hids) || hids.length === 0) return;

                            const type = key.replace('_hids', '_permission'); 
                            const defKey1 = `${type}_ids`; 
                            const defKey2 = `${type.replace("_permission", "")}_permission_ids`;
                            
                            const definitions = appData[defKey1] || appData[defKey2] || [];
                            const prefix = type.split("_")[0];

                            const paths = hids.map((hid: string) => {
                                const cleanHid = hid.endsWith('_') ? hid.slice(0, -1) : hid;
                                const def = definitions.find((d: any) => d.h_id === cleanHid || d.h_id === hid);
                                if (!def) return null;

                                const h1 = def[`${prefix}_hierarchy_1`] || def[`hierarchy_1`] || def[`${prefix}_heirarchy_1`] || def[`heirarchy_1`];
                                const h2 = def[`${prefix}_hierarchy_2`] || def[`hierarchy_2`] || def[`${prefix}_heirarchy_2`] || def[`heirarchy_2`];
                                const h3 = def[`${prefix}_hierarchy_3`] || def[`hierarchy_3`] || def[`${prefix}_heirarchy_3`] || def[`heirarchy_3`];

                                const path = [h1, h2, h3].filter(Boolean);

                                if (!isDynamicPermissions) {
                                    const isLeaf = (h3 && h3 !== ""); 
                                    if (!isLeaf) {
                                        path.push("isActive");
                                    }
                                }
                                
                                return path;
                            }).filter((p: any) => p !== null);

                            if (paths.length > 0) {
                                newSelectedPermissions[appName][type] = paths;
                            }
                        }
                    });
                     if (Object.keys(newSelectedPermissions[appName]).length === 0) {
                        delete newSelectedPermissions[appName];
                    }
                  }
              });
           }
           
           setUserPermissions(newSelectedPermissions);
        }

      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.user?.id) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading permissions...</div>;
  }

  const applications = dataAllPermissions.map((app) => app.application_name);

  return (
    <div className={profileOverView}>
      <div className={subTitleBox}>
        <div className={subTitlePad}>
          <div className={subTitleSpan}>My Permissions</div>
        </div>
      </div>

      {/* Applications Tabs */}
      <TabsContainer>
        {applications.map((app) => (
          <Tab
            key={app}
            active={selectedApplication === app}
            onClick={() => setSelectedApplication(app)}
          >
            {app}
          </Tab>
        ))}
      </TabsContainer>

      <ContentContainer>
        {selectedApplication && (
          <>
            {/* Hierarchy Canvas (Read Only) */}
            <CanvasSection>
              <PermissionHeirarchyCanvas
                dataAllPermissions={dataAllPermissions}
                selectedApplication={selectedApplication}
                selectedPermissions={userPermissions}
                setSelectedPermissions={() => {console.log("setSelectedPermissions") }} 
                readOnly={true}
              />
            </CanvasSection>
          </>
        )}
      </ContentContainer>
    </div>
  );
};

export default UserPermissionsView;
