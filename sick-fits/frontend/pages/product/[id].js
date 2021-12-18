import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
  query {
    Product(where: { id: "61bd104e6e7cc76d8f1484e2" }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY);

  console.log('SINGLE_ITEM_QUERY', data, loading, error);
  return <p>Hey i'm a product page {query.id}</p>;
}
