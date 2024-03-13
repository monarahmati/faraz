import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const MainLayout = () => {
  const token = Cookies.getItem('token');
  const navigate = useNavigate();
  if (!token) {
    navigate('/login');
  }
  return (
    <div className="wrapper" style={{ minHeight: "100h" }}>
      <div className="main">
        <main className="content">
            <div className="container-fluid p-0">
                <Outlet/>
            </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
