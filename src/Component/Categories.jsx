import React from 'react'
import styled from 'styled-components'
import { categories } from '../Data'
import CategoryItem from './CategoryItem'
const Container = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
padding: 50px;
justify-content: space-between;
`
const Categories = () => {
	return (
		<div>
			<Container>
{categories.map(item => (
<CategoryItem item = {item}/>

))}
</Container>
		</div>
	)
}

export default Categories
