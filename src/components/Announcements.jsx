import { styled } from "styled-components"

const container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcements = () => {
  return (
    <container>
      Amazing Deals! get Free shipping and delivery for orders Over 5,000
    </container>
  )
}

export default Announcements
