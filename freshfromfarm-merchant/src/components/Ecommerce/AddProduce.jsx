import { useState } from "react";
import { addProduce } from "../../api/produceAPI";
import Backbutton from "../Utilities/Backbutton";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Additems() {
  const [produce, setProduce] = useState({
    name: "",
    description: "",
    price: "",
    discounted_price: "",
    quantity_unit: "",
    quantity: "",
    produce_media: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduce((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduce((prevState) => ({
      ...prevState,
      produce_media: Array.from(e.target.files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(produce).forEach(([key, value]) => {
      if (key === "produce_media") {
        value.forEach((file) => formData.append("produce_media", file));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await addProduce(formData)
      if (res.status !== 200)
        throw new Error("Something went wrong!");

      if (res.data.status) {
        toast.success(`${res.data.message}`);
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return (
    <div id="add-produce"
      // className="bg-gray-50 dark:bg-gray-950"
      className="max-w-9xl mx-auto w-full bg-gray-100 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8"
    >
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
            List Your Produce
          </h1>
        </div>
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          <Backbutton />

        </div>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 dark:!bg-gray-700/75">
            {/* <p className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-300">
              List Your Produce
            </p> */}
            <form
              method="POST"
              onSubmit={handleSubmit}
              encType={"application/x-www-form-urlencoded"}
              className="mt-3 space-y-3"
            >
              <div>
                <label htmlFor="produceName" className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Produce Name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    id="produceName"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
                    placeholder="Produce Name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="produceDescription" className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Produce Description</label>
                <div className="relative flex items-center">
                  <textarea
                    name="description"
                    id="produceDescription"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
                    placeholder="About Produce"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="producePrice" className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Price</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="price"
                    id="producePrice"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
                    placeholder="15"
                    onChange={handleChange}
                  />
                </div>
              </div>


              <div>
                <label htmlFor="produceDiscountedPrice" className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Discounted Price</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="discounted_price"
                    id="produceDiscountedPrice"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
                    placeholder="15"
                    onChange={handleChange}
                  />
                </div>
              </div>






              <div>
                <label htmlFor="produceQuantity" className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Quantity</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="quantity"
                    id="produceQuantity"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
                    placeholder="15"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantityUnit" className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Quantity Unit</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input type="radio" id="quantity_unit_lb" name="quantity_unit" value="lb" onChange={handleChange} className="form-radio h-4 w-4 accent-green-600" />
                    <label htmlFor="option1" className="ml-2 block text-sm font-medium text-gray-800 dark:text-gray-300">LB</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="quantity_unit_pc" name="quantity_unit" value="pc" onChange={handleChange} className="form-radio h-4 w-4 accent-green-600" />
                    <label htmlFor="option2" className="ml-2 block text-sm font-medium text-gray-800 dark:text-gray-300">PC</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="quantity_unit_pkt" name="quantity_unit" value="pkt" onChange={handleChange} className="form-radio h-4 w-4 accent-green-600" />
                    <label htmlFor="option2" className="ml-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Pkt</label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="produceMedia" className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-300">Images or Videos</label>
                <div className="relative flex items-center">
                  <input
                    type="file"
                    accept="image/*, video/*"
                    id="produceMedia"
                    name="produce_media"
                    multiple
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-green-800"
                    onChange={handleFileChange}
                    style={{ color: 'rgba(22, 163, 74, 1)' }}
                  />
                </div>
              </div>


              <div>
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-md border bg-green-600 px-4 py-2 text-[15px] font-medium tracking-wide text-white hover:bg-green-700 focus:outline-none dark:!bg-gray-950"
                >
                  Add Produce
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}