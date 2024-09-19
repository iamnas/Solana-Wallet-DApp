import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function ShowSolanaBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    }
  }, [publicKey, connection]);

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Solana Balance</h2>
      <div className="text-3xl font-bold text-gray-800">{balance} SOL</div>
    </div>
  );
}
