"use client";
import { ICategoryBasic } from "@wsp/app/utils";
import Api from "@wsp/app/utils/api";
import { useState } from "react";
import { useQuery } from "react-query";
import Calendar from "../Calendar";
const MainPage = () => {
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoryBasic[]>([]);
  const date = new Date();

  const handleWindowClose = () => setAddCategory(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: "categories",
    queryFn: () => Api().categories.getCategories(),
  });

  return (
    <div>
      <p>
        <span className="font-bold text-[black] text-[1.5rem]">
          {date.getFullYear()}
        </span>
      </p>
      <Calendar />
    </div>
    // <Calendar />
    // <div className="">
    //   {/* <div>
    //     <div className="w-full flex justify-between items-center">
    //       <h1>Overview</h1>
    //       <Button onClick={() => setAddCategory(true)} className="mt-2">
    //         <Image
    //           className=" fill-[white]"
    //           src={"/ui/Plus.svg"}
    //           width={16}
    //           height={16}
    //           alt={"Add"}
    //         />
    //         Add category
    //       </Button>
    //     </div>
    //     <div>
    //       <Input placeholder="Search...." onChange={handleSearch} />
    //     </div>
    //     <div className="grid grid-cols-5 gap-5 pt-6">
    //       {(isLoading || !!error || !categories) &&
    //         new Array(20).fill(0).map((_, idx) => {
    //           return (
    //             <div
    //               key={idx}
    //               className="w-full h-[120px] bg-accent animate-pulse rounded"
    //             ></div>
    //           );
    //         })}
    //       {categories &&
    //         categories.map((el) => (
    //           <CategoryCard
    //             name={el.name}
    //             key={el.categoryId}
    //             categoryId={el.categoryId}
    //             refetch={refetch}
    //           />
    //         ))}
    //     </div>
    //   </div>
    //   {addCategory && (
    //     <Popup onClose={handleWindowClose}>
    //       <AddCategoryModal onClose={handleWindowClose} refetch={refetch} />
    //     </Popup>
    //   )} */}
    // </div>
  );
};
export default MainPage;
