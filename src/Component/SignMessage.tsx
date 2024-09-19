import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  async function handleSignMessage() {
    if (!publicKey || !signMessage) {
      alert("Please connect your wallet first");
      return;
    }

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
      alert(`Message signature: ${bs58.encode(signature)}`);
    } else {
      alert("Message signature verification failed.");
    }
  }

  return (
    <div className="space-y-5 flex justify-center flex-col">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        placeholder="Enter message to sign"
        required
      />

      <button
        disabled={!publicKey || message.trim() === ""}
        onClick={handleSignMessage}
        className={`${!publicKey || message.trim() === ""
          ? "text-gray-400 bg-gray-300 cursor-not-allowed"
          : "text-white bg-purple-600 hover:bg-purple-700"
          } font-medium rounded-lg text-sm px-6 py-2.5 transition duration-300`}
      >
        Sign Message
      </button>
    </div>
  );
}
