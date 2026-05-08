import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "./routers/router";

function App() {
  const { isAuthenticated, member, setMember, setIsAuthenticated } =
    useAuthStore();

  // const navigate = useNavigate();

  useEffect(() => {
    // 최초 한 번 토큰으로 내 정보를 조회하는 서비스
    const intializeAuth = async () => {
      try {
        const response = await fetch("http://localhost:10000/api/members/me", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Access Token Expired");

        const datas = await response.json();
        const { success, message, data } = datas;
        if (success) {
          setMember(data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // accessToken이 만료
        try {
          // 한번더 refresh 토큰과 accessToken을 백엔드로 보내서 accessToken 재발급
          console.log("AccessToken이 만료됨!");

          const response = await fetch(
            "http://localhost:10000/api/auth/refresh",
            {
              method: "POST",
              credentials: "include",
            },
          );

          if (!response.ok) throw new Error("refresh Token Expired");

          // 새로운 accessToken으로 재요청
          const meReponse = await fetch(
            "http://localhost:10000/api/members/me",
            {
              credentials: "include",
            },
          );

          if (!meReponse.ok) throw new Error("Access Token Expired");
          const datas = await meReponse.json();
          const { success, message, data } = datas;
          if (success) {
            setMember(data);
            setIsAuthenticated(true);
          }
        } catch (err) {
          // refresh 토큰 만료 -> 재로그인
          setMember(null);
          setIsAuthenticated(false);
          // alert("세션 만료. 다시 로그인 하세요");
        }
      }
    };

    intializeAuth();
  }, []);

  console.log(member);

  return <RouterProvider router={router} />;
}

export default App;
