import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/dashboardNavbar";
import api from "../api/api.js";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [myAccountId, setMyAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getMyTransactions() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/transactions/me");

      setTransactions(response.data.transactions);
      setMyAccountId(response.data.myAccountId);

    } catch (error) {
      console.log("Transaction Fetch Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyTransactions();
  }, []);

  return (
    <div className='bg-[url("/dashboard-bg.jpeg")] h-screen w-screen bg-center bg-cover overflow-x-hidden pb-20'>

      <DashboardNavbar 
        notificationCount={0}
        notificationMessage=""
      />

      <div className="">

        <div className="
          w-[98%] h-48 rounded-4xl bg-[#020817]/90
          absolute top-32 left-4
          border border-cyan-400/30
          shadow-[0_0_25px_rgba(37,99,235,0.35)]
          flex flex-col justify-center px-10
        ">
          <h1 className="text-white text-5xl font-serif">
            Transaction History
          </h1>

          <p className="text-cyan-300 font-serif text-xl mt-2">
            See your sent and received money history
          </p>
        </div>

        {loading && (
          <p className="text-white text-2xl font-serif mt-10">
            Loading transactions...
          </p>
        )}

        {error && (
          <p className="text-red-400 text-xl font-serif mt-10">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="
            mt-10 rounded-4xl bg-[#020817]/90
            border border-blue-400/30
            shadow-[0_0_25px_rgba(37,99,235,0.35)]
            w-[98%] absolute top-75 left-4 h-115
            overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          ">

            <div className="grid grid-cols-5 text-slate-400 font-serif px-6 py-4 border-b border-blue-400/20">
              <p>Date</p>
              <p>Description</p>
              <p>Type</p>
              <p>Amount</p>
              <p>Status</p>
            </div>

            {transactions.length === 0 && (
              <p className="text-white font-serif text-xl px-6 py-8">
                No transactions found.
              </p>
            )}

            {transactions.map((transaction) => {
              const isCredit = transaction.toAccount?._id === myAccountId;

              return (
                <div 
                  key={transaction._id}
                  className="grid grid-cols-5 items-center px-6 py-5 border-b border-blue-400/10 hover:bg-cyan-400/5 transition-all duration-300"
                >
                  <p className="text-slate-300 font-serif">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${isCredit ? "bg-green-400/20" : "bg-red-400/20"}
                    `}>
                      {isCredit ? (
                        <FaArrowDown className="text-green-400" />
                      ) : (
                        <FaArrowUp className="text-red-400" />
                      )}
                    </div>

                    <p className="text-white font-serif">
                      {isCredit 
                        ? `Received from ${transaction.fromAccount?.userName}`
                        : `Sent to ${transaction.toAccount?.userName}`}
                    </p>
                  </div>

                  <p className={`font-serif ${isCredit ? "text-green-400" : "text-red-400"}`}>
                    {isCredit ? "Credit" : "Debit"}
                  </p>

                  <p className={`font-serif font-semibold ${isCredit ? "text-green-400" : "text-red-400"}`}>
                    {isCredit ? "+" : "-"}{transaction.amount} Pkr
                  </p>

                  <p className="text-cyan-300 font-serif">
                    {transaction.transactionStatus}
                  </p>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default Transactions;