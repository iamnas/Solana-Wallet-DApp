import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function RequestAirdrop() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState(0);

  async function requestAirdrop() {
    if (publicKey && amount > 0) {
      try {
        const tx = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
        alert("Airdrop successful: " + tx);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please connect your wallet and enter a valid amount.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {publicKey && (
        <h3 className="text-xl font-semibold text-gray-700">{`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`}</h3>
      )}

      <input
        onChange={(e) => setAmount(Number(e.target.value))}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        placeholder="Amount (SOL)"
        required
      />

      <button
        disabled={!publicKey || amount <= 0}
        onClick={requestAirdrop}
        className={`${!publicKey || amount <= 0
          ? "text-gray-400 bg-gray-300 cursor-not-allowed"
          : "text-white bg-blue-600 hover:bg-blue-700"
          } font-medium rounded-lg text-sm px-6 py-2.5 transition duration-300`}
      >
        Request Airdrop
      </button>
    </div>
  );
}
