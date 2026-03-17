import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Shared from "../../shared";
import { authenticate, userSession, getUserData, getUserAddress } from "../../lib/stacks";

type WalletProviderProps = {
  value: Omit<Shared.WalletContextType, "connect" | "disconnect" | "isSignedIn" | "userSession" | "userData">;
  children: React.ReactNode;
};

export function WalletProvider({ value, children }: WalletProviderProps) {
  const { setWalletAddress, setUserRole } = value;
  const [userData, setUserData] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const hydrateSession = async () => {
      if (userSession.isSignInPending()) {
        try {
          const data = await userSession.handlePendingSignIn();
          setUserData(data);
          const address =
            data.profile?.stxAddress?.testnet || data.profile?.stxAddress?.mainnet || null;
          setWalletAddress(address);
          setIsSignedIn(true);
        } catch (error) {
          console.error("Error handling pending sign in:", error);
        }
        return;
      }

      if (userSession.isUserSignedIn()) {
        try {
          const data = getUserData();
          setUserData(data);
          setWalletAddress(getUserAddress());
          setIsSignedIn(true);
        } catch (error) {
          console.error("Error loading user session:", error);
        }
      }
    };

    hydrateSession();
  }, [setWalletAddress]);

  const connect = useCallback(() => {
    authenticate(() => {
      if (userSession.isUserSignedIn()) {
        const data = getUserData();
        setUserData(data);
        setWalletAddress(getUserAddress());
        setIsSignedIn(true);
      }
    });
  }, [setWalletAddress]);

  const disconnect = useCallback(() => {
    userSession.signUserOut(window.location.origin);
    setIsSignedIn(false);
    setUserData(null);
    setWalletAddress(null);
    setUserRole(null);
  }, [setUserRole, setWalletAddress]);

  const providerValue = useMemo<Shared.WalletContextType>(
    () => ({
      ...value,
      connect,
      disconnect,
      isSignedIn,
      userSession,
      userData,
    }),
    [value, connect, disconnect, isSignedIn, userData],
  );

  return (
    <Shared.WalletContext.Provider value={providerValue}>{children}</Shared.WalletContext.Provider>
  );
}
