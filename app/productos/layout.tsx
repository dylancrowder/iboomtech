import ProductFilterSidebar from "@/secciones/sidebar/SideBarProduct";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center">
      <span></span>
      <div className="flex justify-start items-start w-[90%] py-6 ">
        <div className=" md:w-[30%]  ">
          <ProductFilterSidebar />
        </div>
        <div className=" w-[100%] ">
          <main className=" bg-white  ">{children}</main>
        </div>
      </div>
    </div>
  );
}
