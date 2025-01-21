import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const PUT = () => {
  const queryClient = useQueryClient();
  const { productid } = useParams();

  const mutationFn = async (product) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productid}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(product),
      }
    );
    if (!response.ok) {
      throw new Error("Error updating product");
    }
    return response.json();
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], (oldProducts) => {
        return oldProducts.map((product) =>
          product.id === newProduct.id ? newProduct : product
        );
      });
    },
  });

  const Handle = () => {
    // Example product ID
    const product = {
      title: "Gongoooooo",
      description: "ehdssssssddd",
      price: "300000",
      image: "https://picsum.photos/200/300.jpg",
    };
    mutate(product);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-600 text-2xl border-black"
        onClick={Handle}
      >
        PUT
      </button>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error updating product.</div>}
      {isSuccess && <div>Product updated successfully!</div>}
    </div>
  );
};

export default PUT;
