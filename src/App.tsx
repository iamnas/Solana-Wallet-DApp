import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import AppWalletProvider from "./Component/AppWalletProvider";
import RequestAirdrop from "./Component/RequestAirdrop";
import ShowSolanaBalance from "./Component/ShowSolanaBalance";
import SendToken from "./Component/SendToken";
import SignMessage from "./Component/SignMessage";
import Crad from "./Component/Crad";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <AppWalletProvider>
        <nav className="bg-white shadow-md p-4 flex items-center justify-between fixed w-full top-0 left-0 z-10">
          <div className="flex items-center space-x-4">
            <img src="vite.svg" alt="SOL" className="w-12 h-12" />
            <h1 className="text-xl font-bold text-gray-800">Solana Wallet DApp</h1>
          </div>
          <WalletMultiButton className="!bg-blue-500 hover:!bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300" />
        </nav>

        <div className="container mx-auto pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 px-4">
            {/* Airdrop Component */}
            <Crad title={"Request Airdrop"} component={<RequestAirdrop />} />
            {/* Solana Balance Component */}
            <Crad title={"Show Balance"} component={<ShowSolanaBalance />} />
            {/* Send Token Component */}
            <Crad title={"Send Token"} component={<SendToken />} />
            {/* Sign Message Component */}
            <Crad title={"Sign Message"} component={<SignMessage />} />
          </div>
        </div>
      </AppWalletProvider>
    </div>
  );
}

export default App;
