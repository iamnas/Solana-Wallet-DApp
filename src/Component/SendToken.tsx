import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export default function SendToken() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  async function sendToken() {
    if (publicKey) {
      const transferTransaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(address),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      await sendTransaction(transferTransaction, connection);
      alert("Sent " + amount + " SOL to " + address);
    }
  }

  return (
    <div className="space-y-6 flex flex-col justify-center" >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient Address</label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          placeholder="Enter recipient address"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount (SOL)</label>
        <input
          onChange={(e) => setAmount(Number(e.target.value))}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          placeholder="Enter amount"
          required
        />
      </div>

      <button
        disabled={!publicKey || amount <= 0 || !address}
        onClick={sendToken}
        className={`${!publicKey || amount <= 0 || !address
          ? "text-gray-400 bg-gray-300 cursor-not-allowed"
          : "text-white bg-green-600 hover:bg-green-700"
          } font-medium rounded-lg text-sm px-6 py-2.5 transition duration-300`}
      >
        Send SOL
      </button>
    </div>
  );
}
