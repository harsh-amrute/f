import styled from 'styled-components'

export const SCToolTipWrapper = styled.div`
    position:fixed;
    padding:1px 5px;
    border:1px solid #BC3D81;
    background-color:rgba(255,255,255,1);
    color:#820F4C;
    border-radius:4px;
    width:170px;
    z-index:100000;
`

export const SCContainer = styled.div`
    height:36px;
    border-radius: 5px;
    background: #bc3d811a 0% 0% no-repeat padding-box;
    border: 1px solid #BC3D81;
    color:#820F4C;
    font-size:15px;
    line-height:18px;
    font-family:'Roboto'
    font-style:normal;
    font-weight:500;
    margin-top:4px;
    margin-bottom:4px;
    display:flex;
    align-items:center;
    white-space:pre-wrap;
    overflow:visible;
`
export const SCErrorToolTipUl = styled.ul`
    font-size:9px;
    width:100%;
    padding-inline:0px;
    margin-block-start:0;
    margin-block-end:0;
    margin-inline:0;
    padding:0px 0px 10px 15px;
`

export const SCErrorToolTipLi = styled.li`
    margin-top:5px;
    list-style-type:circle;
    &::before{
        color:#B80000;
    }
`

