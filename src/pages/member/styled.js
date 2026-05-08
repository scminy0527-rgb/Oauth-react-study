import styled from "styled-components";

export const ProfileImageBox = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
