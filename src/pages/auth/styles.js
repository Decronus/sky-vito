import styled from "styled-components";
import { Link } from "react-router-dom";

export const Auth = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AuthBlock = styled.div`
    max-width: 366px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 45px;
    row-gap: 42px;
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

export const AuthFormInput = styled.input`
    outline: none;
    border: none;
    border-bottom: 1px solid #d9d9d9;
    padding: 4px 0;
    &:placeholder {
        font-size: 18px;
    }
    font-size: 18px;
    border-radius: 0;
`;

export const SignUpLink = styled(Link)`
    border: 1px solid #d9d9d9;
    padding: 14px;
    text-decoration: none;
    color: black;
    border-radius: 6px;
    cursor: pointer;
`;
