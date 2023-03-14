import styled from "styled-components";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/consts";

export const Main = styled.div`
    padding-bottom: 117px;
`;

export const AdvInfo = styled.div`
    display: flex;
    column-gap: 60px;
    margin-bottom: 60px;
`;

export const AdvImagesBlock = styled.div`
    min-width: 480px;
`;

export const CurrentAdvImage = styled.div`
    width: 480px;
    height: 480px;
    margin-bottom: 30px;
    background: ${({ url }) => (url ? `url(${API_URL + url})` : "#DDDDDD")};
    background-size: cover;
    background-position: center;
`;

export const AdvImagesList = styled.div`
    display: flex;
    column-gap: 10px;
`;

export const AdvImage = styled.div`
    width: 88px;
    height: 88px;
    background: ${({ url }) => (url ? `url(${API_URL + url})` : "#DDDDDD")};
    background-size: cover;
    background-position: center;
`;

export const AdvTitle = styled.p`
    font-size: 32px;
    margin-bottom: 10px;
`;

export const AdvDataRelease = styled.p`
    font-size: 16px;
    margin-bottom: 4px;
    color: #5f5f5f;
`;

export const AdvLocation = styled.p`
    font-size: 16px;
    margin-bottom: 4px;
    color: #5f5f5f;
`;

export const AdvReviews = styled.p`
    font-size: 16px;
    margin-bottom: 34px;
    color: #009ee4;
    cursor: pointer;
`;

export const AdvPrice = styled.p`
    font-size: 28px;
    margin-bottom: 20px;
`;

export const AdvSettingsButtons = styled.div`
    display: flex;
    column-gap: 10px;
    margin-bottom: 34px;
`;

export const SellerInfo = styled.div`
    display: flex;
    column-gap: 12px;
`;

export const SellerAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

export const SellerName = styled(Link)`
    font-size: 20px;
    line-height: 26px;
    color: #009ee4;
`;

export const SellerActivity = styled.p`
    font-size: 16px;
    line-height: 32px;
`;

export const AdvDescription = styled.p`
    width: 70%;
`;
