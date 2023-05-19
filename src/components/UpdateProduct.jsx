import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

export default function UpdateProduct(props) {
  const { id, nama, hargaBeli, hargaJual, stock, foto, setBarang, barang } =
    props;

  const ref = useRef();

  const [payload, setPayload] = useState({
    id: id,
    nama: nama,
    hargaBeli: hargaBeli,
    hargaJual: hargaJual,
    stock: stock,
    foto: foto,
  });

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleChangeState = (key, value) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdatePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    const allowedExtensions = /(\.jpg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      alert("Hanya foto dengan format JPG atau PNG yang diperbolehkan!");
      return;
    }

    reader.onload = (e) => {
      const updatedPhoto = {
        file: e.target.result,
        caption: file.name,
      };
      handleChangeState("foto", updatedPhoto);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !payload.nama ||
      !payload.hargaBeli ||
      !payload.hargaJual ||
      !payload.stock ||
      !payload.foto
    ) {
      toast.error("Semua form harus diisi!");
      return;
    }

    if (
      barang.find(
        (item) =>
          item.id !== id &&
          item.nama.toLowerCase() === payload.nama.toLowerCase()
      )
    ) {
      toast.error("Barang sudah ada!");
      return;
    }

    setBarang(barang.map((item) => (item.id === id ? payload : item)));
    ref.current.value = null;
    setModal(!modal);
    toast.success("Barang berhasil diubah!");
  };

  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={handleOpenModal}>
        Ubah
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleOpenModal}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-2">Ubah Barang</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nama Barang</label>
              <input
                type="text"
                value={payload.nama}
                onChange={(e) => handleChangeState("nama", e.target.value)}
                className="input w-full input-bordered"
                placeholder="Masukan Nama Barang"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Harga Beli</label>
              <input
                type="number"
                min="0"
                value={payload.hargaBeli}
                onChange={(e) => handleChangeState("hargaBeli", e.target.value)}
                className="input w-full input-bordered"
                placeholder="Masukan Harga Tanpa Titik"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Harga Jual</label>
              <input
                type="number"
                min="0"
                value={payload.hargaJual}
                onChange={(e) => handleChangeState("hargaJual", e.target.value)}
                className="input w-full input-bordered"
                placeholder="Masukan Harga Tanpa Titik"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Stock</label>
              <input
                type="number"
                min="0"
                value={payload.stock}
                onChange={(e) => handleChangeState("stock", e.target.value)}
                className="input w-full input-bordered"
                placeholder="1"
              />
            </div>
            <input
              className="mt-4"
              type="file"
              ref={ref}
              accept=".jpg, .png"
              onChange={handleUpdatePhoto}
            />
            <div className="w-24 mt-4 rounded">
              <img src={payload.foto ? payload.foto.file : foto.file} />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleOpenModal}>
                Tutup
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
