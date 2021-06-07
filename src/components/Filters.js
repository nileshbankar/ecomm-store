import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    all_products,
    updateFilter,
    clearFilter,
    filters: {
      text,
      company,
      colors,
      category,
      min_price,
      max_price,
      price,
      shipping,
    },
  } = useFilterContext();

  const color = getUniqueValues(all_products, "colors");
  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");

  return (
    <Wrapper>
      <div className="content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="form-control">
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Search"
              className="search-input"
              value={text}
              onChange={updateFilter}
            />
          </div>

          <div className="form-control">
            <h5>Category</h5>
            <div>
              {categories.map((c, index) => (
                <button
                  key={index}
                  value={category}
                  name="category"
                  type="button"
                  className={`${
                    category.toLowerCase() === c.toLowerCase() ? "active" : null
                  }`}
                  onClick={updateFilter}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/*  companies */}

          <div className="form-control">
            <h5>Companies</h5>
            <div>
              <select
                value={company}
                name="company"
                className="company"
                onChange={updateFilter}
              >
                {companies.map((c, index) => {
                  return (
                    <option value={c} key={index}>
                      {c}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/*  colors */}

          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {color.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="colors"
                      onClick={updateFilter}
                      data-color="all"
                      className={`${
                        colors === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="colors"
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={updateFilter}
                  >
                    {colors === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilter}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}

          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilter}
            />
          </div>
          {/* end of  shipping */}

          <button type="button" className="clear-btn" onClick={clearFilter}>
            clear filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
