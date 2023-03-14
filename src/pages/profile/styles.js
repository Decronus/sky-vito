import styled from "styled-components";
import { API_URL } from "../../utils/consts";

export const Main = styled.div`
    padding-bottom: 80px;
`;

export const AdvList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 40px 26px;
`;

export const SellerInfoBlock = styled.div`
    display: flex;
    column-gap: 50px;
`;

export const SellerInfoTextAndPhone = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const SellerInfoText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 16px;
    p:first-child {
        font-size: 20px;
        font-family: "Roboto-medium";
    }
`;

export const SellerAvatar = styled.div`
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: ${({ url }) => (url ? `url(${API_URL + url})` : "#DDDDDD")};
    background-size: cover;
    background-position: center;
`;

export const SellerGoods = styled.div`
    margin-top: 44px;
`;
