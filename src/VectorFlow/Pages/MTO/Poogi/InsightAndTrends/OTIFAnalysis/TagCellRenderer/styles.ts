import styled,{keyframes} from 'styled-components'

const fadeIn = keyframes`
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
`

export const Wrapper = styled.div`
    position: relative;
    height: 25px;
    top: 5px;
    display: flex;
    justify-content: center;
`

export const Icon = styled.img`
    height: 30px;
    cursor:pointer;
`
export const TextWrapper = styled.div`
    position: absolute;
    color:white;
    max-width:700px;
    z-index:200;
    animation:${fadeIn} 0.4s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 2px;
    border-radius: 4px;
    ::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 10px;
      border-style: solid;
      border-color: #333 transparent transparent transparent; // Adjust to match tooltip background
    }
`

export const Tag = styled.div`
  font-size: 16px;
  font-family: Roboto;
  font-weight: 900;
  line-height: 24px;
  list-style: circle;
  color: white;
  background: rgb(254, 162, 54);
  min-width: 100px;
  text-align: center;
  border-radius: 8px;
  padding: 5px 20px;
`