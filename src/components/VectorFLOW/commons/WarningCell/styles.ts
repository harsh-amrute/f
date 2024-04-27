import styled from 'styled-components'


export const SCContainer = styled.div`
    height:36px;
    border-radius: 5px;
    background: #ff5f151a 0% 0% no-repeat padding-box;
    border: 1px solid #FF5F15;
    color:#FF5F15;
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
`

export const SCToolTipWrapper = styled.div`
    position:fixed;
    padding:1px 5px;
    border: 1px solid #FF5F15;
    background-color:rgba(255,255,255,1);
    color:#FF5F15;
    border-radius:4px;
    width:170px;
    z-index:100000;
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
