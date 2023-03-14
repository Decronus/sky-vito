import styled from "styled-components";

export const PhoneButton = styled.button`
    width: 214px;
    height: 62px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 2px;
    background-color: #009ee4;
    border-radius: 6px;
    cursor: pointer;
    border: none;
    color: white;
    transition: background-color 0.2s ease-in;
    font-size: 14px;

    :hover {
        background-color: #0080c1;
    }

    span:first-child {
        font-family: "Roboto-medium";
        font-size: 16px;
    }
`;
