import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchInputMultiple } from "../../../components";
import { get } from "lodash";

const SectionContainer = styled.div`
  border: 1px dotted #ccc;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 16px;
  zoom: 0.85;
`;

const SectionTitle = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
  color: #333;
  margin-bottom: 6px;
`;

const PermissionForm = ({
  currentAppAllPermissions,
  selectedPermissions,
  setSelectedPermissions,
  selectedApplication,
}: any) => {

  const [LL1, setLL1] = useState<any>(
    Object.keys(currentAppAllPermissions.location_permission)
  );
  const [LL2,setLL2] = useState<any>([]);
  const [LL3, setLL3] = useState<any>([]);
  const [PL1, setPL1] = useState<any>(
    Object.keys(currentAppAllPermissions.product_permission)
  );
  const [PL2, setPL2] = useState<any>([]);
  const [PL3, setPL3] = useState<any>([]);
  const [LL1Opts, setLL1Opts] = useState<any>(
    LL1?.map((e: any) => {
      return { label: e, value: e };
    })
  );
  const [LL2Opts, setLL2Opts] = useState<any>([]);
  const [LL3Opts, setLL3Opts] = useState<any>([]);

  const [PL1Opts, setPL1Opts] = useState<any>(
    PL1?.map((e: any) => {
      return { label: e, value: e };
    })
  );
  const [PL2Opts, setPL2Opts] = useState<any>([]);
  const [PL3Opts, setPL3Opts] = useState<any>([]);

  useEffect(() => {
    if (
      !currentAppAllPermissions ||
      !currentAppAllPermissions.location_permission ||
      !currentAppAllPermissions.product_permission
    ) {
      return;
    }
    const l1Keys = Object.keys(currentAppAllPermissions.location_permission);

    const l2Keys: any = [];
    const l3keys: any = [];
    l1Keys.forEach((l1Key: any) => {
      const l2Obj = currentAppAllPermissions.location_permission[l1Key];

      Object.keys(l2Obj).forEach((l2Key) => {
        l2Keys.push(`${l1Key}>${l2Key}`);

        const l3Array = l2Obj[l2Key];
        if (Array.isArray(l3Array)) {
          l3Array.forEach((entry: any) => {
            if (entry.location_heirarchy_3) {
              l3keys.push(`${l1Key}>${l2Key}>${entry.location_heirarchy_3}`);
            }
          });
        }
      });
    });
    setLL1(l1Keys);
    setLL2(l2Keys);
    setLL3(l3keys);

    const P1Keys = Object?.keys(currentAppAllPermissions?.product_permission);
    const p2Keys: any = [];
    const p3keys: any = [];
    P1Keys.forEach((p1Key: any) => {
      const p2Obj = currentAppAllPermissions?.product_permission[p1Key];

      Object.keys(p2Obj).forEach((p2Key) => {
        p2Keys.push(`${p1Key}>${p2Key}`);
        const p3Array = p2Obj[p2Key];
        if (Array.isArray(p3Array)) {
          p3Array.forEach((entry: any) => {
            if (entry.product_hierarchy_3) {
              p3keys.push(`${p1Key}>${p2Key}>${entry.product_hierarchy_3}`);
            }
          });
        }
      });
    });
    setPL1(P1Keys);
    setPL2(p2Keys);
    setPL3(p3keys);
  }, [currentAppAllPermissions]);

  useEffect(() => {
    setLL1Opts(
      LL1.map((e: any) => {
        return { label: e, value: e };
      })
    );
    setPL1Opts(
      PL1.map((e: any) => {
        return { label: e, value: e };
      })
    );
  }, [LL1, PL1]);

  // When LL1 changes → update LL2 options and selected LL2 (keep LL3 unchanged)
  useEffect(() => {
    if (!selectedApplication ) return;

    const selectedLocPerms =
      selectedPermissions[selectedApplication]?.location_permission || [];
    const newLL2Opts: any[] = [];

    const selectedL1Keys = selectedLocPerms.map((e:any)=>e[0])


    LL2.forEach((ele:any)=>{
      if(selectedL1Keys.some((val:any)=> val===ele.split('>')[0])){
        newLL2Opts.push(ele);
      }
    })
    setLL2Opts(newLL2Opts.map((e:any) => ({ label: e, value: e })));
  }, [LL2,selectedPermissions, selectedApplication]);

  useEffect(() => {
    if (!selectedApplication ) return;
  
    const selectedLocPerms =
      selectedPermissions[selectedApplication]?.location_permission || [];
    const newLL3Opts: any[] = [];
  
    const selectedL2Keys = selectedLocPerms
      .filter((e: any) => e.length >= 2)
      .map((e: any) => `${e[0]}>${e[1]}`);
  
    LL3.forEach((ele: any) => {
      if (selectedL2Keys.some((val: any) => val === ele.split('>').slice(0, 2).join('>'))) {
        newLL3Opts.push(ele);
      }
    });
  
    setLL3Opts(newLL3Opts.map(e => ({ label: e, value: e })));
  }, [LL3,selectedPermissions, selectedApplication]);

  useEffect(() => {
    if (!selectedApplication ) return;
  
    const selectedProdPerms =
      selectedPermissions[selectedApplication]?.product_permission || [];
    const newPL2Opts: any[] = [];
  
    const selectedP1Keys = selectedProdPerms.map((e: any) => e[0]);
  
    PL2.forEach((ele: any) => {
      if (selectedP1Keys.some((val: any) => val === ele.split('>')[0])) {
        newPL2Opts.push(ele);
      }
    });

  
    setPL2Opts(newPL2Opts.map(e => ({ label: e, value: e })));
  }, [PL2,selectedPermissions, selectedApplication]);

  useEffect(() => {
    if (!selectedApplication) return;
  
    const selectedProdPerms =
      selectedPermissions[selectedApplication]?.product_permission || [];
    const newPL3Opts: any[] = [];

    
    const selectedP2Keys = selectedProdPerms
    .filter((e: any) => e.length >= 2)
    .map((e: any) => `${e[0]}>${e[1]}`);
    
    PL3.forEach((ele: any) => {
      if (selectedP2Keys.some((val: any) => val === ele.split('>').slice(0, 2).join('>'))) {
        newPL3Opts.push(ele);
      }
    });

  
    setPL3Opts(newPL3Opts.map(e => ({ label: e, value: e })));
  }, [PL3,selectedPermissions, selectedApplication]);
  
  
  

  

  const getUniqueObjects=(arr:any, key:any)=> {
    const seen = new Set();
    return arr.filter((item:any) => {
      const val = item[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  }
  const getSelectedPermissions = ({
    selectedPermissions,
    selectedApplication,
    permissionType,
    level,
  }: any) => {
    const currentPermissions = selectedPermissions[selectedApplication] || {};

    const permissionSet = currentPermissions[permissionType] || [];

    let val: { value: string; label: string }[] = [];




    if (level === 0) {
      val = permissionSet
        .filter((e: any) => e.length >= 1)
        .map((e: any) => ({
          value: e[0],
          label: e[0],
        }));
    }

    if (level === 1) {
      val = permissionSet
        .filter((e: any) => e.length >= 2)
        .map((e: any) => {
          const joined = e.slice(0, 2).join(">");
          return { value: joined, label: joined };
        })
    }

    if (level === 2) {
      val = permissionSet
        .filter((e: any) => e.length >= 3)
        .map((e: any) => {
          const joined = e.slice(0, 3).join(">");
          return { value: joined, label: joined };
        });
    }

    return getUniqueObjects(val, "value");
  };

  const updateSelectedPermissions = ({
    val,
    selectedPermissions,
    selectedApplication,
    permissionType,
    level,
  }: any) => {
    if (!val || !Array.isArray(val)) return;

    
    const prevPerms =
    selectedPermissions?.[selectedApplication]?.[permissionType] || [];
    
    const selectPermissions = Array.isArray(prevPerms) ? prevPerms : [];
    console.log("val", val);
    console.log("selectedPermissions", prevPerms);
  
    let newPerm: any[] = [];
  
    if (level === 0) {
      const filteredPermissions = selectPermissions.filter((ele: any) =>
        val.some(({ value }: any) => value === ele[0])
      );
  
      const filteredNewPermissions = val
        .filter(
          (ele: any) =>
            !selectPermissions.some((e: any) => e[0] === ele.value)
        )
        .map((ele: any) => [ele.value]);
  
      newPerm = [...filteredNewPermissions, ...filteredPermissions];
    }
  
    if (level === 1) {
      const filteredPermissions = selectPermissions.filter(
        (ele: any) =>
          ele.length >= 2 &&
          val.some(({ value }: any) => value === ele.slice(0, 2).join(">"))
      );
  
      const filteredNewPermissions = val
        .filter(
          (ele: any) =>
            !selectPermissions.some(
              (e: any) => e.slice(0, 2).join(">") === ele.value
            )
        )
        .map((ele: any) => ele.value.split(">"));
  
      newPerm = [...filteredNewPermissions, ...filteredPermissions];
    }
    
    if (level === 2) {
      const filteredPermissions = selectPermissions.filter(
        (ele: any) =>
          ele.length >= 3 &&
          val.some(({ value }: any) => value === ele.slice(0, 3).join(">"))
      );
  
      const filteredNewPermissions = val
        .filter(
          (ele: any) =>
            !selectPermissions.some(
              (e: any) => e.slice(0, 3).join(">") === ele.value
            )
        )
        .map((ele: any) => ele.value.split(">"));
  
      newPerm = [...filteredNewPermissions, ...filteredPermissions];
    }
  
    setSelectedPermissions((prev: any) => ({
      ...prev,
      [selectedApplication]: {
        ...prev[selectedApplication],
        [permissionType]: newPerm,
      },
    }));
  };
  

  return (
    <div style={{ padding: "40px 20px 20px 20px" }}>
      <SectionContainer>
        <SectionTitle>Product Permission</SectionTitle>
        <Grid>
          <SelectContainer>
            <Label>Business</Label>
            <SearchInputMultiple
              disabled={false}
              placeholder="Select"
              options={PL1Opts}
              value={getSelectedPermissions({
                selectedPermissions,
                selectedApplication,
                permissionType: "product_permission",
                level: 0,
              })}
              setValue={(e: any) => {
                updateSelectedPermissions({
                  val: e,
                  selectedPermissions,
                  selectedApplication,
                  permissionType: "product_permission",
                  level: 0,
                });
              }}
              key={1}
            />
          </SelectContainer>
          <SelectContainer>
            <Label>Category</Label>
            <SearchInputMultiple
              placeholder="Select"
              disabled={false}
              options={PL2Opts}
              value={getSelectedPermissions({
                selectedPermissions,
                selectedApplication,
                permissionType: "product_permission",
                level: 1,
              })}
              setValue={(e: any) => {
                updateSelectedPermissions({
                  val: e,
                  selectedPermissions,
                  selectedApplication,
                  permissionType: "product_permission",
                  level: 1,
                });
              }}
              key={2}
            />
          </SelectContainer>
          <SelectContainer>
            <Label>Value</Label>
            <SearchInputMultiple
              placeholder="Select"
              disabled={false}
              options={PL3Opts}
              value={getSelectedPermissions({
                selectedPermissions,
                selectedApplication,
                permissionType: "product_permission",
                level: 2,
              })}
              setValue={(e: any) => {
                updateSelectedPermissions({
                  val: e,
                  selectedPermissions,
                  selectedApplication,
                  permissionType: "product_permission",
                  level: 2,
                });
              }}
              key={3}
            />
          </SelectContainer>
        </Grid>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>Location Permission</SectionTitle>
        <Grid>
          <SelectContainer>
            <Label>Zone</Label>
            <SearchInputMultiple
              placeholder="Select"
              disabled={false}
              options={LL1Opts}
              value={getSelectedPermissions({
                selectedPermissions,
                selectedApplication,
                permissionType: "location_permission",
                level: 0,
              })}
              setValue={(e: any) => {
                updateSelectedPermissions({
                  val: e,
                  selectedPermissions,
                  selectedApplication,
                  permissionType: "location_permission",
                  level: 0,
                });
              }}
              key={4}
            />
          </SelectContainer>
          <SelectContainer>
            <Label>Location Group</Label>
            <SearchInputMultiple
              placeholder="Select"
              disabled={false}
              options={LL2Opts}
              value={getSelectedPermissions({
                selectedPermissions,
                selectedApplication,
                permissionType: "location_permission",
                level: 1,
              })}
              setValue={(e: any) => {
                updateSelectedPermissions({
                  val: e,
                  selectedPermissions,
                  selectedApplication,
                  permissionType: "location_permission",
                  level: 1,
                });
              }}
              key={5}
            />
          </SelectContainer>
          <SelectContainer>
            <Label>WH Type</Label>
            <SearchInputMultiple
              placeholder="Select"
              disabled={false}
              options={LL3Opts}
              value={getSelectedPermissions({
                selectedPermissions,
                selectedApplication,
                permissionType: "location_permission",
                level: 2,
              })}
              setValue={(e: any) => {
                updateSelectedPermissions({
                  val: e,
                  selectedPermissions,
                  selectedApplication,
                  permissionType: "location_permission",
                  level: 2,
                });
              }}
              key={6}
            />
          </SelectContainer>
        </Grid>
      </SectionContainer>
    </div>
  );
};

export default PermissionForm;
