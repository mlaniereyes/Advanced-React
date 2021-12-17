import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'nice shoes',
    price: 24232,
    description: 'these are the best shoes',
  });
  return (
    <form>
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
        <input
          onChange={handleChange}
          value={inputs.description}
          type="text"
          id="description"
          name="description"
          placeholder="Description"
        />
      </label>
      <button type="button" onClick={clearForm}>
        Clear form
      </button>
      <button type="button" onClick={resetForm}>
        reset form
      </button>
    </form>
  );
}
