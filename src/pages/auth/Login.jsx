import React from "react";
import { useLocation } from "react-router-dom";
import LogoAuth from "../../assets/static/logo_auth.svg";
// import { REGISTRATION_ROUTE } from "../../utils/consts";
import * as S from "./styles";
import MainButton from "../../components/main-button";

function Login() {
    const { pathname } = useLocation();

    // const isSignUp = pathname === REGISTRATION_ROUTE;

    return (
        <S.Auth>
            <S.AuthBlock>
                <img src={LogoAuth} alt="logo" />

                <S.AuthForm>
                    <S.AuthFormInput placeholder="email" type="email" />
                    <S.AuthFormInput placeholder="Пароль" type="password" />

                    <MainButton type="submit">Войти</MainButton>
                    <S.SignUpLink to="/registration">
                        Зарегистрироваться
                    </S.SignUpLink>
                </S.AuthForm>
            </S.AuthBlock>
        </S.Auth>
    );
}

export default Login;
