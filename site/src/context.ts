import React from "react";
export interface ContextType {
  user: {
    id: string;
    username: string;
    email: string;
    integrations: [any];
    discriminator: number;
  };
  setUser: React.SetStateAction<
    | {
        id: string;
        username: string;
        email: string;
        integrations: [any];
        discriminator: number;
      }
    | any
  >;
  refresh: string;
  token: string;
}
const UserContext = React.createContext<ContextType>(
  null as unknown as ContextType
);
export default UserContext;
