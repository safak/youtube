import styled from "styled-components"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"
const Container = styled.div`
    display: flex;
    padding: 20px;
    margin-bottom: 50px;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    margin-top: -40px;
`
const Categories = () => {
  return (
    <Container>
        {categories.map(item=>(
            <CategoryItem item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Categories
