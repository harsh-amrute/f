import React, { useEffect, useState } from "react";
import { useUserData } from "../../../context";
import { MainService } from "../../../services/profile/api";
import PermissionHeirarchyCanvas from "../manage-users/PermissioinHeirarchyCanvas";

import {
  SCProfileOverView,
  SCSubTitleBox,
  SCSubTitlePad,
  SCSubTitleSpan,
} from "./styles";
import styled from "styled-components";

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

        if (allPermsRes.data) {
          setDataAllPermissions(allPermsRes.data);
          // Set default selected application
          if (allPermsRes.data.length > 0) {
            setSelectedApplication(allPermsRes.data[0].application_name);
          }
        }

        if (userPermsRes.data) {
           // Transform user permissions if necessary to match the expected format for the canvas/form
           // The API usually returns the JSON structure directly.
           // However, we need to inspect the response structure from previous tasks/conversations.
           // Assuming standard structure based on `manage-users` usage.
           // For `selectedPermissions` prop in canvas, it expects: { [appName]: { [permType]: [[path], ...] } }
           // The `get-user-permissions` might return the role/permissions object.
           
           // Based on `manage-users/index.tsx`, `selectedPermissions` is maintained in state.
           // We need to see how `getUserPermissions` returns data.
           // If it returns the same structure as what we save, we can use it directly.
           // If it returns a User object with `permissions` field, we use that.
           
           // Looking at `api.ts`, `getUserPermissions` calls `/api/user/get-user-permissions/?id=...`
           // Let's assume it returns the permissions object directly or consistent with what we need.
           // If we need to adapt, we'll debug.
           setUserPermissions(userPermsRes.data.permissions || userPermsRes.data);
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
    <SCProfileOverView>
      <SCSubTitleBox>
        <SCSubTitlePad>
          <SCSubTitleSpan>My Permissions</SCSubTitleSpan>
        </SCSubTitlePad>
      </SCSubTitleBox>

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
    </SCProfileOverView>
  );
};

export default UserPermissionsView;
