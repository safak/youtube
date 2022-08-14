import styled, { keyframes } from "styled-components"

  const animation = keyframes`
    0%{
    transform: translateX(100px);
    }
    50%{
      transform: translateX(500px);
    }
    75%{
      transform: translateX(-500px);
    }
    100%{
      transform: translateX(-100px);
    }
  `
const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size: 14px;
    font-weight:bolder;
`
const Text = styled.h3`
    animation-name: ${animation};
    animation-duration: 20s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
`
const Announcement = () => {
  return (
    <Container>
      <Text>
        | Best Sellers in Sports Fitness Outdoors | Up to 30% off | Top offers | All Brands |
      </Text>
    </Container>
  )
}

export default Announcement
