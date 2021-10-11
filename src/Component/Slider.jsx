import React from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined } from '@material-ui/icons'
const Container = styled.div`
width: 100%;
height:100vh;
display: flex;
`
const Arrow = styled.div``
const Slider = () => {
	return (
		<Container>
			<Arrow>
<ArrowLeftOutlined/>
</Arrow>
		</Container>
	)
}

export default Slider
