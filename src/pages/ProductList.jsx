import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Products from "../components/Products"
const Container = styled.div`
    
`
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: bolder;
    margin-right: 20px;
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`

const Option = styled.option`
    
`

const ProductList = () => {
  return (
    <Container>
        <Announcement/>
        <Navbar/>
        <Title>Clothing</Title>
        <FilterContainer>
            <Filter><FilterText>Filter Produts : </FilterText>
            <Select>
                <Option disabled selected>
                    Colors
                </Option>
                <Option>White</Option>
                <Option>Black</Option>
                <Option>Red</Option>
                <Option>Green</Option>
                <Option>Blue</Option>
                <Option>Yellow</Option>
                <Option>Pink</Option>
            </Select>
            <Select>
                <Option disabled selected>
                    Sizes
                </Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>SF</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                <Option>XXL</Option>
            </Select>
            </Filter>
            <Filter><FilterText>Sort Products : </FilterText>
            <Select>
                <Option selected>Sort by</Option>
                <Option>Trending</Option>
                <Option>Price (Low-to-High)</Option>
                <Option>Price (High-to-Low)</Option>
            </Select>
            </Filter>
        </FilterContainer>
        <Products/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList
