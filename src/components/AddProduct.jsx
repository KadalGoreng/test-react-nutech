import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const AddProducts = (props) => {
  const { barang, setBarang } = props;

  const ref = useRef();

  const newId = barang.length > 0 ? barang[barang.length - 1].id + 1 : 1;
  const [payload, setPayload] = useState({
    id: newId,
    nama: "",
    hargaBeli: "",
    hargaJual: "",
    stock: "",
    foto: "",
  });
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setPayload({
      id: newId,
      nama: "",
      hargaBeli: "",
      hargaJual: "",
      stock: "",
      foto: "",
    });
    ref.current.value = null;
    setModal(!modal);
  };

  const handleChangeState = (key, value) => {
    setPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUploadFoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const photo = {
        file: e.target.result,
        fileName: file.name,
      };
      handleChangeState("foto", photo);
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

    const allowedExtensions = /(\.jpg|\.png)$/i;
    if (!allowedExtensions.exec(payload.foto.fileName)) {
      toast.error("Hanya format foto JPG atau PNG yang diperbolehkan!");
      return;
    }

    if (
      barang.find(
        (item) => item.nama.toLowerCase() === payload.nama.toLowerCase()
      )
    ) {
      toast.error("Barang sudah ada!");
      return;
    }

    setBarang([...barang, payload]);
    setPayload({
      id: newId + 1,
      nama: "",
      hargaBeli: "",
      hargaJual: "",
      stock: "",
      foto: "",
    });

    ref.current.value = null;
    setModal(!modal);
    toast.success("Barang berhasil ditambahkan!");
  };

  return (
    <div>
      <button className="btn btn-accent" onClick={handleOpenModal}>
        Tambah Barang
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleOpenModal}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-2">Tambah Barang</h3>
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
            <div className="mt-4">
              <input
                ref={ref}
                type="file"
                accept=".jpg, .png"
                onChange={handleUploadFoto}
              />
            </div>
            {payload.foto && (
              <div className="w-24 my-4 rounded">
                <img src={payload.foto.file} />
              </div>
            )}
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
};

export default AddProducts;
