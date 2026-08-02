import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-neutral-300 flex justify-center">
      <main
        className="
          w-full
          min-h-screen
          bg-[#141414]
          md:max-w-[25.125rem]
          md:border-x
          md:border-neutral-400
          overflow-hidden
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
