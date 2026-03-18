import React, { useEffect, useState } from "react";
import { useUserData } from "../../../context";
import { MainService } from "../../../services/profile/api";
import PermissionHeirarchyCanvas from "../manage-users/PermissioinHeirarchyCanvas";
import { 
  profileOverView, 
  subTitleBox, 
  subTitlePad, 
  subTitleSpan,
  tabsContainer,
  tabBase,
  tabActive,
  tabInactive,
  contentContainer,
  canvasSection
} from "./styles.css";

const Permissions = () => {
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
          if (allPermsRes.data.length > 0) {
            setDataAllPermissions(allPermsRes.data);
          }
          // Set default selected application
          if (allPermsRes.data.length > 0) {
            setSelectedApplication(allPermsRes.data[0].application_name);
          }
        }

        if (userPermsRes.data) {
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
                    const definitions = appData[defKey1] || [];
                    const prefix = type.split("_")[0];

                    const paths = hids.map((hid: string) => {
                      const cleanHid = hid.endsWith('_') ? hid.slice(0, -1) : hid;
                      const def = definitions.find((d: any) => d.h_id === cleanHid || d.h_id === hid);
                      if (!def) return null;

                      const h1 = def[`${prefix}_hierarchy_1`] ?? def[`hierarchy_1`] ?? def[`${prefix}_heirarchy_1`] ?? def[`heirarchy_1`] ?? '';
                      const h2 = def[`${prefix}_hierarchy_2`] ?? def[`hierarchy_2`] ?? def[`${prefix}_heirarchy_2`] ?? def[`heirarchy_2`] ?? '';
                      const h3 = def[`${prefix}_hierarchy_3`] ?? def[`hierarchy_3`] ?? def[`${prefix}_heirarchy_3`] ?? def[`heirarchy_3`] ?? '';

                      const path = [h1, h2, h3].filter(Boolean); // Filter out empty strings

                      // IA Node Logic
                      // If def is active (IA Node definition) AND the input HID does NOT end with underscore
                      // (Underscore implies Group/Parent selection of that node, not the IA node itself)
                      // AND it is NOT a leaf node (L3). Leaf nodes (L3) should never have prime suffix, they are just selected.
                      // Assuming L3 means h3 is present.
                      const isLeaf = (h3 && h3 !== "");
                      if (def.isActive && !hid.endsWith('_') && !isLeaf) {
                        if (path.length > 0) {
                          path[path.length - 1] = path[path.length - 1] + "'";
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
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', fontSize: '1.8rem' }}>Loading permissions...</div>;
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
      <div className={tabsContainer}>
        {applications.map((app) => (
          <div
            key={app}
            className={`${tabBase} ${selectedApplication === app ? tabActive : tabInactive}`}
            onClick={() => setSelectedApplication(app)}
          >
            {app}
          </div>
        ))}
      </div>

      <div className={contentContainer}>
        {selectedApplication && (
          <>
            {/* Hierarchy Canvas (Read Only) */}
            <div className={canvasSection}>
              <PermissionHeirarchyCanvas
                dataAllPermissions={dataAllPermissions}
                selectedApplication={selectedApplication}
                selectedPermissions={userPermissions}
                setSelectedPermissions={() => { console.log("setSelectedPermissions") }}
                readOnly={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Permissions;
