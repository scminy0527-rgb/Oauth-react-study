import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/Header";
import MemberJoin from "../pages/member/MemberJoin";
import Login from "../pages/member/Login";
import AuthLayout from "../layouts/AuthLayout";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/member/MyPage";
import TestMyPage from "../pages/member/TestMyPage";
import Verify from "../pages/member/Verify";

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "member/join",
        element: <MemberJoin />,
      },
      {
        path: "member/login",
        element: <Login />,
      },
      {
        path: "member/verify",
        element: <Verify />,
      },
      {
        path: "member/my-page-test",
        element: <TestMyPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "member/my-page",
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
