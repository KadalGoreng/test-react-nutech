import React, { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteProduct(props) {
  const { id, barang, setBarang } = props;

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleDelete = async (id) => {
    setBarang(barang.filter((item) => item.id !== id));
    setModal(!modal);
    toast.success("Barang berhasil dihapus!");
  };

  return (
    <div>
      <button
        className="btn bg-red-500 hover:bg-red-700 text-white border-none btn-sm"
        onClick={handleOpenModal}
      >
        Hapus
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleOpenModal}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Yakin akan menghapus barang?</h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleOpenModal}>
              Tutup
            </button>

            <button
              type="button"
              className="btn bg-red-500 hover:bg-red-700 text-white border-none"
              onClick={() => handleDelete(id)}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
