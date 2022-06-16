import React from 'react'
import styledComponents from 'styled-components'

const Container = styledComponents.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = () => {
  return (
    <Container>
        Super Deal! Free shipping on orders over Rs.500
    </Container>
  )
}

export default Announcement