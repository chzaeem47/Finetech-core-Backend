import React, { useState } from "react";
import { FaPaperPlane, FaUser, FaLock } from "react-icons/fa";
import api from "../api/api.js";

const QuickTransfer = ({ account, onTransferSuccess }) => {

  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fromAccount = account?._id;

  async function handleTransfer(e) {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!fromAccount) {
      setError("Your account is still loading. Please wait.");
      return;
    }

    if (!toAccount.trim()) {
      setError("Please enter receiver account number.");
      return;
    }

    if (!amount) {
      setError("Please enter amount.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    if (toAccount.trim() === fromAccount) {
      setError("You cannot transfer money to your own account.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/transactions/", {
        fromAccount: fromAccount,
        toAccount: toAccount.trim(),
        amount: Number(amount),
        idempotencykey: `${Date.now()}-${Math.random()}`
      });

      setMessage(response.data.message || "Transaction completed successfully");

      setToAccount("");
      setAmount("");

      await onTransferSuccess();

    } catch (error) {
      console.log("Transfer Error:", error.response?.data || error.message);

      setError(error.response?.data?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-145 h-93 bg-[#020817]/90 relative left-[39%] bottom-11 rounded-4xl
      border border-blue-400/40
      backdrop-blur-xl
      shadow-[0_0_10px_rgba(37,99,235,0.35)]"
    >
      <h1 className="text-white text-3xl font-serif relative left-19 top-[22px]">Quick Transfer</h1>

      <div className="flex gap-2 items-center text-gray-400 font-serif absolute left-95 top-7">
          <FaLock size={14} />
          <span>Secure and Encrypted</span>
      </div>

      <FaPaperPlane size={30} className="relative left-8 bottom-3 text-cyan-400" />

      <form className="relative top-3 left-9 w-[88%]" onSubmit={handleTransfer}>
        
        <h1 className="text-white text-lg font-serif mb-2 relative left-2">Account Number</h1>

        <div className="w-full h-12 flex items-center gap-3 px-4 rounded-xl
            bg-[#0b1733]
            border border-blue-400/25
            focus-within:border-cyan-400
            transition-all duration-300
          ">

          <input type="text" placeholder="Enter Receiver Account Number"
            className="
              w-full bg-transparent outline-none
              text-white placeholder:text-slate-400
              font-serif
            " value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          />

          <FaUser className="text-slate-400" />
        </div>

        
        <h1 className="text-white text-lg font-serif mt-5 mb-2 relative bottom-2 left-2">Enter Amount</h1>

        <div
          className="
            w-full h-12 relative bottom-2
            flex items-center gap-3
            px-4
            rounded-xl
            bg-[#0b1733]
            border border-blue-400/25
            focus-within:border-cyan-400
            transition-all duration-300
          "
        >
          <input
            type="text"
            placeholder="Enter Amount"
            className="
              w-full bg-transparent outline-none
              text-white placeholder:text-slate-400
              font-serif
            " value={amount}
            onChange={(e) => {const value = e.target.value
              if (/^\d*$/.test(value)) {setAmount(value)}
            }}
          />

          <span className="text-cyan-400 font-serif font-semibold">Pkr</span>

        </div>

        {error && (
          <p className="text-red-400 font-serif relative bottom-0 left-1">
            {error}
          </p>
        )}

        {message && (
          <p className="text-cyan-300 font-serif relative bottom-0 left-1">
            {message}
          </p>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="
          w-full h-12
          mt-6 relative bottom-3
          rounded-xl
         bg-blue-800
         hover:bg-blue-700
         text-white font-serif text-lg
          flex items-center justify-center gap-2
          shadow-[0_0_18px_rgba(37,99,235,0.55)]
          transition-all duration-300
          disabled:opacity-60
        ">
        {loading ? "Sending..." : "Send Money"}
        <FaPaperPlane size={16} />
        </button>

      </form>
    </div>
  );
};

export default QuickTransfer;