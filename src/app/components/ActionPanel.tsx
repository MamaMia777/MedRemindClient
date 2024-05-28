"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Api from "../utils/api";
import { UserContext } from "./providers/UserProvider";
interface INewUser {
  name: string;
  email: string;
}
const LINKS = [
  { label: "Overview", href: "" },
  { label: "About Us", href: "about" },
];

const UserRecord = ({
  name,
  email,
  setUserPatients,
}: {
  name: string;
  email: string;
  setUserPatients: any;
}) => {
  const handleUserDeletion = async () => {
    const deleted = await Api().usersApi.deletePatient(email);
    if (deleted) {
      setUserPatients((prev: any) => {
        return prev.filter((el: any) => el.email !== email);
      });
    }
  };
  const handleUserEdition = () => {};

  return (
    <div className="w-full flex items-center justify-between">
      <span>{name}</span>
      <div className="flex">
        <Image
          onClick={handleUserEdition}
          className="cursor-pointer hover:bg-[gray] rounded-full"
          src={"pencil.svg"}
          width={15}
          height={15}
          alt="edit"
        />
        <Image
          onClick={handleUserDeletion}
          className="cursor-pointer hover:bg-[gray] rounded-full"
          src={"delete.svg"}
          width={15}
          height={15}
          alt="edit"
        />
      </div>
    </div>
  );
};

const ActionPanel = () => {
  const path = usePathname();
  const localUser = React.useContext(UserContext);

  const [newUser, setNewUser] = React.useState<INewUser | null>(null);
  const [userPatients, setUserPatients] = React.useState<any[]>([]);

  useEffect(() => {
    if (!localUser) return;
    // @ts-ignore
    const patients = localUser.patients.map((el) => {
      return { name: el.name, email: el.email };
    });
    setUserPatients(patients);
  }, [localUser]);

  const handleNewUser = async () => {
    if (!newUser) {
      setNewUser({ name: "", email: "" });
      return;
    }
    const savedUser = await Api().usersApi.createPatient({
      email: newUser.email,
      name: newUser.name,
    });

    if (savedUser) {
      setNewUser(null);
      setUserPatients((prev) => {
        return [
          ...prev,
          {
            name: savedUser.name,
            email: savedUser.email,
          },
        ];
      });
    }
  };
  const hideHeader =
    path.split("/").reverse()[0] === "login" ||
    path.split("/").reverse()[0] === "/signup";
  if (hideHeader || !localUser) {
    return <></>;
  }
  return (
    <div
      className="
    w-full h-full p-2 text-[black] shadow-lg"
    >
      <div className="flex gap-2 justify-between items-center ">
        <Image
          src={localUser.avatarUrl}
          className="rounded-full"
          width={50}
          height={50}
          alt={"medremind: icon"}
        />

        <p className="">
          <span className="font-bold">{localUser.name} </span>
          it is good to see you back at
          <span className="font-bold text-[1rem]">&nbsp;MedRemind</span>
        </p>
      </div>

      <div>
        <h3 className="mt-4">Users</h3>
        <div>
          {userPatients.map((el) => (
            <UserRecord
              key={el.name}
              name={el.name}
              email={el.email}
              setUserPatients={setUserPatients}
            />
          ))}
        </div>

        {newUser && (
          <div className="border mt-3">
            <p>Add new user</p>
            <input
              className="border text-[black] outline-none"
              type="text"
              value={newUser.name}
              onChange={(e) => {
                setNewUser((prev) => {
                  return { ...prev!, name: e.target.value };
                });
              }}
              placeholder="Name"
            />
            <input
              className="border text-[black] outline-none"
              type="email"
              value={newUser.email}
              onChange={(e) => {
                setNewUser((prev) => {
                  return { ...prev!, email: e.target.value };
                });
              }}
              placeholder="Email"
            />
          </div>
        )}
        <button
          onClick={handleNewUser}
          className="w-full bg-[black] mt-2 p-1 rounded-md text-[white] hover:bg-blue-200 duration-100"
        >
          {newUser ? "Create user" : "Add new user"}
        </button>
      </div>
    </div>
    // <>
    //   {/* {!hideHeader && (
    //     <header className=" w-full flex justify-between py-3 border-b-2 border-b-[solid red] h-[60px]">
    //       <div className="flex gap-6 items-center">
    //         <span className="font-bold text-[black]">WSP/eis</span>
    //         {LINKS.map((el) => (
    //           <Link href={`/${el.href}`} key={el.label}>
    //             <span
    //               className={`${
    //                 path.split("/").reverse()[0] === el.href.toLowerCase()
    //                   ? "font-bold text-[black]"
    //                   : ""
    //               }`}
    //             >
    //               {el.label}
    //             </span>
    //           </Link>
    //         ))}
    //       </div>
    //       <div>
    //         <Image
    //           src={
    //             localUser
    //               ? localUser.avatarUrl
    //               : "https://avatar.iran.liara.run/public/22"
    //           }
    //           width={40}
    //           height={40}
    //           className="rounded-md"
    //           alt="wsp"
    //         />
    //       </div>
    //     </header>
    //   )} */}
    // </>
  );
};
export default ActionPanel;
