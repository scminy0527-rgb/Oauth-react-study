import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";

// 마이페이지: AuthLayout이 로그인 여부를 이미 검사했으므로
// 이 컴포넌트는 항상 로그인된 상태에서만 렌더링됨
const TestMyPage = () => {
  useAuthStore();

  useEffect(() => {
    const testFetch = async () => {
      const response = await fetch(
        "http://localhost:10000/private/my-page-test",
        {
          method: "POST",
          credentials: "include",
        },
      );

      console.log("testFetch 실행");
    };

    testFetch();
  }, []);

  return <div>로그인 후 접근할 수 있는 마이페이지😎</div>;
};

export default TestMyPage;
