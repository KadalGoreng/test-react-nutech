import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const userAccount = {
      username: "admin",
      password: "admin",
    };

    if (
      username === userAccount.username &&
      password === userAccount.password
    ) {
      // Simulasi generate token JWT saat login berhasil
      const token = "generateJwtToken";
      // Menyimpan token ke local storage
      localStorage.setItem("token", token);

      navigate("/product");
    } else {
      toast.error("Username password salah!");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center align-item h-[100vh] items-center">
        <ToastContainer />
        <div className="w-full bg-slate-600 max-w-md rounded-lg p-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-center text-white">
              Selamat Datang
            </h1>
            <form
              className="flex flex-col items-center w-full"
              onSubmit={handleLogin}
            >
              <div className="w-full">
                <label className="label">
                  <span className="label-text text-white">Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="w-full">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <button className="w-full my-4 btn text-white bg-red-500 hover:bg-red-700 border-none">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
