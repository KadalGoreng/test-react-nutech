import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import dataBarang from "../dataBarang";
import { AddProducts, DeleteProduct, UpdateProduct } from "../components";
import { formatPrice, validateToken } from "../utils/helpers";

const Product = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [barang, setBarang] = useState(dataBarang);

  const barangSearch = barang
    .map(
      (item) =>
        item.nama.toLowerCase().indexOf(search.toLowerCase()) > -1 && item
    )
    .filter(Boolean);

  const endOffset = itemOffset + 5;
  const itemsSearch = barangSearch.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(barangSearch.length / 5);

  const handlePageClick = (e) => {
    setSelectedPage(e.selected);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    setSelectedPage(0);
  };

  useEffect(() => {
    const newOffset = (selectedPage * 5) % barangSearch.length;
    setItemOffset(newOffset);
  });

  useEffect(() => {
    // Cek token di local storage
    const token = localStorage.getItem("token");

    if (!token) {
      // Jika token tidak ada, kembali ke login
      navigate("/");
    } else {
      // Simulasi validasi token
      const isValidToken = validateToken(token);
      if (!isValidToken) {
        // Jika token tidak valid, kembali ke login
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-[100vh]">
      <ToastContainer theme="dark" />
      <div className="p-10">
        <div className="mb-2">
          <div className="flex justify-center font-bold text-[32px] mb-7">
            Data Sepatu
          </div>
          <div className="flex gap-4">
            <AddProducts setBarang={setBarang} barang={barang} />
            <input
              className="input w-full max-w-xs"
              type="text"
              placeholder="Search..."
              onChange={handleChangeSearch}
            />
          </div>
        </div>
        <table className="table w-full mb-4">
          <thead>
            <tr>
              <th>NO</th>
              <th>Foto</th>
              <th>Nama Barang</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemsSearch.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <div className="w-32 rounded">
                    <img src={item.foto.file} />
                  </div>
                </td>
                <td>{item.nama}</td>
                <td>{`Rp ${formatPrice(item.hargaBeli)}`}</td>
                <td>{`Rp ${formatPrice(item.hargaJual)}`}</td>
                <td>{`${item.stock} Unit`}</td>
                <td>
                  <div className="flex gap-3">
                    <UpdateProduct
                      {...item}
                      barang={barang}
                      setBarang={setBarang}
                    />
                    <DeleteProduct
                      id={item.id}
                      barang={barang}
                      setBarang={setBarang}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel="< prev"
          containerClassName="flex gap-1"
          renderOnZeroPageCount={null}
          nextClassName="btn btn-sm rounded btn-outline"
          previousClassName="btn btn-sm rounded btn-outline"
          activeLinkClassName="bg-[#1C1C1C] text-white"
          pageLinkClassName="btn btn-sm rounded btn-outline"
        />
      </div>
    </div>
  );
};

export default Product;
