import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-min-viewport flex justify-center bg-neutral-300">
      <main
        className="
          w-full
          app-min-viewport
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
