import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  TrashIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  SquaresPlusIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { allProducts } from "../constants/products";

const Products = () => {
  const cancelButtonRef = useRef(null);
  const openRef = useRef(null);
  const editRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState(allProducts);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProduct = () => {
    console.log(`Add new product`);
    setOpen(false);
    setProducts([...products, { ...product, id: products.length + 1 }]);
    setProduct({
      id: null,
      name: "",
      category: "",
      price: 0,
      stock: 0,
    });
  };

  const handleEditProduct = (product) => {
    console.log(`Edit product with ID ${product.id}`);
    setOpen(true);
    setSelectedProduct(product);
    setProduct(product);
  };

  const updateProduct = () => {
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id ? product : p
    );
    setProducts(updatedProducts);
    setProduct({
      id: null,
      name: "",
      category: "",
      price: 0,
      stock: 0,
    });
    setSelectedProduct(null);
    setOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      updateProduct();
    } else {
      handleAddProduct();
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <Link className="font-extrabold text-blue-600 flex items-center gap-1" to="/">
          <ChevronLeftIcon className="h-6 w-6" />
          <p className="tracking-widest">Back</p>
        </Link>
        <h2 className="text-2xl w-64 m-auto font-bold mb-4 mt-8 text-center text-white bg-red-600 p-3">Manage Products</h2>
        <button
          type="button"
          className="my-5 inline-flex w-full justify-center rounded-md bg-green-500 px-8 py-5 text-lg font-extrabold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-600 sm:mt-0 sm:w-auto focus:outline-none"
          onClick={() => setOpen(true)}
          ref={openRef}
        >
          <PlusCircleIcon className="h-6 w-12" />Add Product
        </button>

        <div className="overflow-x-scroll">
          <table className="min-w-full border border-gray-300 overflow-x-scroll">
            <thead className="text-white">
              <tr className="bg-gray-500">
                <th className="py-2 px-4 border">Product ID</th>
                <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Price (₹)</th>
                <th className="py-2 px-4 border">Stock</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="py-2 px-4 border">{product.id}</td>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.category}</td>
                  <td className="py-2 px-4 border">₹{product.price}</td>
                  <td className="py-2 px-4 border">{product.stock}</td>
                  <td className="py-2 px-4 border flex flex-col md:flex-row gap-8 justify-center">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 m-1 rounded hover:bg-blue-700 flex items-center gap-2 w-fit h-fit"
                      onClick={() => handleEditProduct(product)}
                      ref={editRef}
                    >
                      <PencilSquareIcon className="h-6 w-6 md:h-4 md:w-4" />
                      Update
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 m-1 rounded hover:bg-red-700 flex items-center gap-2 w-fit h-fit"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <TrashIcon className="h-6 w-6 md:h-4 md:w-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                        <SquaresPlusIcon
                          className="h-6 w-6 text-green-500"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 mt-2 text-green-500"
                        >
                          Enter Product Details
                        </Dialog.Title>
                        <div className="mt-4">
                          <form onSubmit={handleSubmit}>
                            <div className="m-3">
                              <div className="mb-1">
                                <label htmlFor="name">Product Name</label>
                              </div>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                                className="bg-transparent border-b border-green-600 w-80 focus:outline-none"
                              />
                            </div>
                            <div className="m-3">
                              <div className="mb-1">
                                <label htmlFor="category">Category:</label>
                              </div>
                              <input
                                type="text"
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="bg-transparent border-b border-green-600 w-80 focus:outline-none"
                              />
                            </div>
                            <div className="m-2">
                              <div className="mb-1">
                                <label htmlFor="price">Price:</label>
                              </div>
                              <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="bg-transparent border-b border-green-600 w-80 focus:outline-none"
                              />
                            </div>
                            <div className="m-2">
                              <div className="mb-1">
                                <label htmlFor="stock">Stock:</label>
                              </div>
                              <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                className="bg-transparent border-b border-green-600 w-80 focus:outline-none"
                              />
                            </div>
                            <div className="m-3 flex flex-row justify-between w-80">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-green-500 sm:ml-3 sm:w-auto"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-right rounded-md bg-red-600 text-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-red-600 sm:mt-0 sm:w-auto"
                                onClick={() => {
                                  setOpen(false);
                                  setSelectedProduct(null);
                                  setProduct({
                                    id: null,
                                    name: "",
                                    category: "",
                                    price: 0,
                                    stock: 0,
                                  });
                                }}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Products;
