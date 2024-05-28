"use client";
import Api from "@wsp/app/utils/api";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext<any>({});
export default function UserProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<any>();
  const history = useRouter();
  useEffect(() => {
    console.log("USER PROVIDER");
    const token = parseCookies()["MED_REMIND_AUTHORIZATION_COOKIE"];
    console.log({ token });
    if (token) {
      console.log("HERE");
      Api()
        .usersApi.getMe()
        .then((res) => {
          setUser(res);
        })
        .catch((err) => {
          history.push("/login");
        });
    } else {
      history.push("/login");
    }
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
