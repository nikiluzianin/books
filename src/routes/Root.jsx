import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
// returns page with outlet (where all the pages will be renederd) and header

export default Root;
