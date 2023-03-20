import styled from "styled-components";
import { API_URL } from "../../utils/consts";

export const ReviewsBack = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
`;

export const ReviewsBlock = styled.div`
    position: absolute;
    width: 800px;
    max-height: 900px;
    border-radius: 12px;
    z-index: 1;
    background-color: #fff;
    margin: 20px 0;
`;

export const ReviewTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px 0;
`;

export const OverflowBlock = styled.div`
    max-height: 720px;
    overflow-y: scroll;
    padding: 0 50px 70px 50px;
`;

export const Subtitle = styled.h3`
    font-size: 16px;
    margin-bottom: 14px;
`;

export const ReviewSendForm = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

export const ReviewSendFormInput = styled.input`
    padding: 10px 20px 66px 20px;
    margin-bottom: 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);
`;

export const ReviewsList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 30px;
`;

export const Review = styled.div`
    display: flex;
    column-gap: 12px;
    position: relative;
`;

export const ReviewDeleteIcon = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    svg:hover path {
        fill: #009ee4;
    }
`;

export const ReviewerAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ url }) => (url ? `url(${API_URL + url})` : "#DDDDDD")};
    background-size: cover;
    background-position: center;
`;

export const ReviewerInfo = styled.div`
    display: flex;
    column-gap: 10px;
    margin-bottom: 12px;
`;

export const ReviewerName = styled.p`
    font-family: "Roboto-Medium";
`;

export const ReviewDateRelease = styled.p`
    color: #5f5f5f;
`;

export const ReviewerCommentBlock = styled.div``;

export const ReviewerCommentTitle = styled.p`
    font-family: "Roboto-Medium";
`;

export const ReviewCommentText = styled.p``;
