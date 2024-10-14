import { useState } from "react";

const AlertDialog = ({ isOpenVal, onClose, onSubmit }) => {
  const [secret, setSecret] = useState("");

  const handleInputChange = (e) => {
    setSecret(e.target.value);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(secret);
    }
    handleExport();
    setSecret("");
    onClose();
  };

  const handleExport = async () => {
    const res = await fetch("/api/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secret }),
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Client_Data@${new Date().toString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      alert("Unauthorized or error occurred. contact ( +91 9778685012 )");
    }
  };

  if (!isOpenVal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-4 text-black ">
            Enter Administrator Password 🔐🤫
          </h3>
          <button
            className="bg-blue-600 mb-4 p-1 rounded-md "
            onClick={onClose}
          >
            {" "}
            close{" "}
          </button>
        </div>
        <input
          type="password"
          value={secret}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4 bg-slate-50 text-black"
          placeholder="Enter something..."
        />
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
