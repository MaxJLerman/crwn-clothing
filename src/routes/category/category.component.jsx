import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom'

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, Title } from './category.styles';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  // category & categoriesMap in the dependency array means useEffect runs whenever the either the category or categoriesMap elements change

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {
            // only renders the products onto the screen if products has a value
            products && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
