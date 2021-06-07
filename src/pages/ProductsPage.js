import React, { useEffect } from "react";
import styled from "styled-components";
import { Filters, ProductList, Sort, PageHero } from "../components";
import { useFilterContext } from "../context/filter_context";

const ProductsPage = () => {
  const { clearFilter } = useFilterContext();

  useEffect(() => {
    clearFilter();
  }, []);
  return (
    <main>
      <PageHero title="Products"></PageHero>
      <Wrapper className="page">
        <div className="section-center products">
          <Filters></Filters>

          <div>
            <Sort></Sort>
            <ProductList></ProductList>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
