import React from 'react'
import styled from 'styled-components'
import {popularProducts} from '../Data'
import Product from './Product'
const Container = styled.div``
const Products = () => {
	return (
		<Container>
{popularProducts.map((item)=>(
<Product item={item}/>

))}			
		</Container>
	)
}

export default Products
