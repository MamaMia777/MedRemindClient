"use client";
import Api from "@wsp/app/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Social = () => {
  const history = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      Api()
        .usersApi.googleLogin(code)
        .then((resp) => {
          history.push("/");
        });
    }
  }, []);

  return <></>;
};
export default Social;
