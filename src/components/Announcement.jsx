import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-image: linear-gradient(to right, fuchsia  , yellow);
    color: white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 14px;
    font-weight:bolder;
`
const Announcement = () => {
  return (
    <Container>
        Super Deal !!! Free Shipping Over For Next 5 Days !!!
    </Container>
  )
}

export default Announcement
