import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
`;
const Left = styled.div`
  flex: 1;
`;


const Center = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 1;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>DONSA GEBEYA</Logo>
        <Desc>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, nemo
          vel. Impedit porro qui accusantium tempora quo labore, ducimus velit
          soluta placeat ex voluptatibus, voluptates nisi numquam hic, officiis
          rerum?
        </Desc>
        <SocialContainer>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
          <SocialIcon>
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center></Center>
      <Right></Right>
    </Container>
  );
};

export default Footer;
