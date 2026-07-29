import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-neutral-300 flex justify-center">
      <main
        className="
          w-full
          max-w-[25.125rem]
          min-h-screen
          bg-[#141414]
          border-x
          border-neutral-400
          overflow-hidden
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
