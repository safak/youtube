import styledComponents from 'styled-components'
import React from 'react'
import { categories } from '../data';
import CategoryItem from './CategoryItem';

const Container = styledComponents.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
`;
const Categories = () => {
  return (
    <Container>
        {categories.map(item=>(
            <CategoryItem item={item}/>
        ))}
    </Container>
  )
}

export default Categories