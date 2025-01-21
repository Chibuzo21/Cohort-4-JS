import React from "react";
import { useQuery } from "@tanstack/react-query";

const Api = () => {
  const Action = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return response.json();
  };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: Action,
  });

  if (isLoading) {
    return (
      <main className="h-screen  flex justify-center items-center bg-opacity-30 bg-black">
        <div className="w-24 h-24 border-4 border-t-transparent border-black animate-spin rounded-full"></div>
      </main>
    );
  }
  if (isError) {
    return (
      <div className="bg-black bg-opacity-30 flex justify-center items-center h-screen">
        <p>ERROR CHOKE!!!</p>
      </div>
    );
  }
  console.log(Object.keys(data[10]));

  return (
    <main className=" ">
      <h1 className="text-center my-3 text-4xl  font-bold">MY API</h1>

      <section className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-5 p-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="h-full flex gap-3 items-center justify-center flex-col border-blue-800 p-2 border-2 rounded-md"
          >
            <img src={item.image} className="max-w-52 " />
            <p className="text-xl font-bold text-center ">{item.title}</p>
            <p className="text-gray-800 font-medium text-lg">{item.price}</p>
            <p className="text-sm text-center">{item.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Api;
