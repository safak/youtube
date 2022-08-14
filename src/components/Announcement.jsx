import styled from "styled-components"

const Container = styled.div`
    height: 20px;
    margin-bottom: 60px;
    margin-top: 20px;
    background-image: linear-gradient(to right, fuchsia  , yellow);
    color: white;
    scale: 2;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 14px;
    font-weight:bolder;
`
const Announcement = () => {
  return (
    <Container>
        !!! Best Sellers !!! Super Deal !!! Free Shipping Over For Next 5 Days !!!
    </Container>
  )
}

export default Announcement
