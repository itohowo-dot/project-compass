import React, { createContext, useContext, useState, useCallback } from "react";

interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  walletType: "leather" | "xverse" | null;
}

interface WalletContextType extends WalletState {
  connect: (type: "leather" | "xverse") => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

const MOCK_WALLETS = {
  leather: { address: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKQYAC0D", balance: 1.2847 },
  xverse: { address: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE", balance: 0.5432 },
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WalletState>({
    connected: false,
    address: null,
    balance: 0,
    walletType: null,
  });

  const connect = useCallback((type: "leather" | "xverse") => {
    const mock = MOCK_WALLETS[type];
    setState({ connected: true, address: mock.address, balance: mock.balance, walletType: type });
  }, []);

  const disconnect = useCallback(() => {
    setState({ connected: false, address: null, balance: 0, walletType: null });
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
