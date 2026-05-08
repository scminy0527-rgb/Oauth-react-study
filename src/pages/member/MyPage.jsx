import React from "react";
import useAuthStore from "../../store/useAuthStore";
import { useForm } from "react-hook-form";
import { ProfileImageBox } from "./styled";
import { securePrivatePost } from "../../api/http";

// 마이페이지
const MyPage = () => {
  const { member, setMember } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onChange" });

  const updateFile = async ({ uploadFile }) => {
    // 1. S3에 파일 업로드
    const formData = new FormData();
    formData.append("uploadFile", uploadFile[0]);

    const uploadResponse = await fetch(
      "http://localhost:10000/private/api/file/upload-file",
      { method: "POST", body: formData, credentials: "include" },
    );
    const { success, data } = await uploadResponse.json();
    if (!success) return;

    // 2. 업로드된 상대 경로로 DB의 memberPicture 변경
    await securePrivatePost("/members/update-picture", {
      memberPicture: data.updatedUrl,
    });

    // 3. 스토어 업데이트 → 백엔드 파일 엔드포인트 URL로 저장 (S3 URL 미노출)
    setMember({
      ...member,
      memberPicture: `http://localhost:10000/api/files/${data.updatedUrl}`,
    });
  };

  return (
    <div>
      <h2>프로필 수정</h2>
      <ProfileImageBox>
        <img src={member?.memberPicture} alt="profile" />
      </ProfileImageBox>
      <form onSubmit={handleSubmit(updateFile)}>
        <input
          type="file"
          accept="image/*"
          {...register("uploadFile", { required: true })}
        />
        {errors.uploadFile?.type === "required" && <p>이미지를 선택하세요</p>}
        <button disabled={isSubmitting}>프로필 수정</button>
      </form>
      로그인 후 접근할 수 있는 마이페이지😎
    </div>
  );
};

export default MyPage;
