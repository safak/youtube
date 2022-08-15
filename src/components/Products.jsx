import styled from "styled-components"
import { famousProducts } from "../data"
import Product from "./Product"
const Container = styled.div`
    padding: 17px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Products = () => {
  return (
    <Container>
      {famousProducts.map(item=>(
        <Product item={item} key={item.id}/>
      ))}
    </Container>
  )
}

export default Products
