import React from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
const Container = styled.div`
width: 100%;
height:100vh;
display: flex;
`
const Arrow = styled.div`
width: 50px;
height:50px;
background: white;
border-radius: 50%;
`
const Slider = () => {
	return (
		<Container>
			<Arrow>
<ArrowLeftOutlined/>
</Arrow>
<Arrow>
<ArrowRightOutlined>
</Arrow>
		</Container>
	)
}

export default Slider
