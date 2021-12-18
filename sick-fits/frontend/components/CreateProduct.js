import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCT_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        price: $price
        description: $description
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'nice shoes',
    price: 24232,
    description: 'these are the best shoes',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCT_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        // submit the inputfields to the backend
        const res = await createProduct();
        clearForm();
        console.log('id===>', res.data.createProduct.id);
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Image
          <input
            required
            onChange={handleChange}
            type="file"
            id="image"
            name="image"
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            onChange={handleChange}
            value={inputs.name}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            onChange={handleChange}
            value={inputs.price}
            type="number"
            id="price"
            name="price"
            placeholder="Price"
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            onChange={handleChange}
            value={inputs.description}
            id="description"
            name="description"
            placeholder="Description"
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
