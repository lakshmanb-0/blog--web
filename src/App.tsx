import { currentUser } from "./appwrite/auth-appwrite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components";
import { Spin, message } from "antd";
import { RootState, login, logout, setLoading } from "./store";

const App = () => {
  const { loading } = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch();
  const [_, contextHolder] = message.useMessage();

  useEffect(() => {
    userCheck()
  }, []);

  const userCheck = async () => {
    dispatch(setLoading(true))
    try {
      let user = await currentUser();
      !!user
        ? dispatch(login(user))
        : dispatch(logout());
    }
    catch (error) { console.log(error) }
    finally { dispatch(setLoading(false)) }
  };

  return (
    <Spin spinning={loading} className="min-h-screen">
      <div>

        <Navbar />
        <div className="max-w-6xl mx-auto">
          <Outlet />
          {contextHolder}

        </div>
      </div>
    </Spin>
  )
}

export default App;
