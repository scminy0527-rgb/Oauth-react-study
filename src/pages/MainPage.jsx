import React from "react";
import useAuthStore from "../store/useAuthStore";

const MainPage = () => {
  const { member, isAuthenticated } = useAuthStore();

  return (
    <div>
      메인 페이지
      <h1>
        {isAuthenticated ? member?.memberName + "님 환영합니다" : "비회원"}
      </h1>
    </div>
  );
};

export default MainPage;
