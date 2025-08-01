import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchInputMultiple } from '../../../components';

const SectionContainer = styled.div`
  border: 1px dotted #ccc;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 16px;
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

const PermissionForm = ({currentAppAllPermissions,}:any) => {


  console.log("current App all permissions", currentAppAllPermissions);

  const [LL1, setLL1] = useState<any>(Object.keys(currentAppAllPermissions.location_permission));
  const [LL2, setLL2] = useState<any>([]);
  const [LL3, setLL3] = useState<any>([]);
  const [PL1, setPL1] = useState<any>(Object.keys(currentAppAllPermissions.product_permission));
  const [PL2, setPL2] = useState<any>([]);
  const [PL3, setPL3] = useState<any>([]);
  const [LL1Opts, setLL1Opts] = useState<any>(LL1?.map((e:any)=>{return {label:e, value:e}}));
  const [LL2Opts, setLL2Opts] = useState<any>([]);
  const [LL3Opts, setLL3Opts] = useState<any>([]);

  const [PL1Opts, setPL1Opts] = useState<any>(PL1?.map((e:any)=>{return {label:e, value:e}}));
  const [PL2Opts, setPL2Opts] = useState<any>([]);
  const [PL3Opts, setPL3Opts] = useState<any>([]);

  useEffect(()=>{

    if(!currentAppAllPermissions || !currentAppAllPermissions.location_permission || !currentAppAllPermissions.product_permission) {
      return;
  }
    const l1Keys = Object.keys(currentAppAllPermissions.location_permission);

    const l2Keys:any = [];
    const l3keys:any = [];
    l1Keys.forEach((l1Key:any) => {
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
    const p2Keys:any = [];
    const p3keys:any = [];
    P1Keys.forEach((p1Key:any) => {
      const p2Obj = currentAppAllPermissions?.product_permission[p1Key];
    
      Object.keys(p2Obj).forEach((p2Key) => {
        p2Keys.push(`${p1Key}>${p2Key}`);
        const p3Array = p2Obj[p2Key];
        if (Array.isArray(p3Array)) {
          p3Array.forEach((entry: any) => {
            if (entry.location_heirarchy_3) {
              p3keys.push(`${p1Key}>${p2Key}>${entry.product_hierarchy_3}`);
            }
          });
        }
      });
    });
    setPL1(P1Keys);
    setPL2(p2Keys);
    setPL3(p3keys);
  },[currentAppAllPermissions])

  useEffect(()=>{
    setLL1Opts(LL1.map((e:any)=>{return {label:e, value:e}}));
    setPL1Opts(PL1.map((e:any)=>{return {label:e, value:e}}));
  },[LL1,PL1]);

  

  const [selectedLoc, setSelectedLoc] = useState<any>({PL1: [], PL2: [], PL3: []});
  const [selectedProd, setSelectedProd] = useState<any>({LL1: [], LL2: [], LL3: []});



  return (
    <div style={{padding: '40px 20px 20px 20px'}}>
      <SectionContainer>
        <SectionTitle>Product Permission</SectionTitle>
        <Grid>
          <SelectContainer>
            <Label>Business</Label>
            <SearchInputMultiple
                      placeholder={"Select"}
                      options={PL1Opts}
                      value={selectedProd.PL1}
                      setValue={(e:any)=>{setSelectedProd({...selectedProd, PL1: e})}}
                      disabled={false}
                      key={1}
                    />
          </SelectContainer>
          <SelectContainer>
            <Label>Category</Label>
            <SearchInputMultiple
                      placeholder={"Select"}
                      options={PL2Opts}
                      value={selectedProd.PL2}
                      setValue={(e:any)=>{setSelectedProd({...selectedProd, PL2: e})}}
                      disabled={false}
                      key={2}
                    />
          </SelectContainer>
          <SelectContainer>
            <Label>Value</Label>
            <SearchInputMultiple
                      placeholder={"Select"}
                      options={PL3Opts}
                      value={selectedProd.PL3}
                      setValue={(e:any)=>{setSelectedProd({...selectedProd, PL3: e})}}
                      disabled={false}
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
                      placeholder={"Select"}
                      options={LL1Opts}
                      value={selectedLoc.LL1}
                      setValue={(e:any)=>{setSelectedLoc({...selectedLoc, LL1: e})}}
                      disabled={false}
                      key={4}
                    />
          </SelectContainer>
          <SelectContainer>
            <Label>Location Group</Label>
            <SearchInputMultiple
                      placeholder={"Select"}
                      options={LL2Opts}
                      value={selectedLoc.LL2}
                      setValue={(e:any)=>{setSelectedLoc({...selectedLoc, LL2: e})}}
                      disabled={false}
                      key={5}
                    />
          </SelectContainer>
          <SelectContainer>
            <Label>WH Type</Label>
            <SearchInputMultiple
                      placeholder={"Select"}
                      options={LL3Opts}
                      value={selectedLoc.LL3}
                      setValue={(e:any)=>{setSelectedLoc({...selectedLoc, LL3: e})}}
                      disabled={false}
                      key={6}
                    />
          </SelectContainer>
        </Grid>
      </SectionContainer>
    </div>
  );
};

export default PermissionForm;
