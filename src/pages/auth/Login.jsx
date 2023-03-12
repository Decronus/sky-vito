import React, { useState } from "react";
import LogoAuth from "../../assets/static/logo_auth.svg";
import * as S from "./styles";
import MainButton from "../../components/main-button";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/consts";
import { logIn } from "../../store/actions/creators/main";
import { useDispatch } from "react-redux";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(event) {
        event.preventDefault();
        if (email && password) {
            const body = {
                email: email,
                password: password,
            };

            Queries.postLogin(body)
                .then((response) => {
                    localStorage.setItem(
                        ACCESS_TOKEN,
                        response.data.access_token
                    );
                    localStorage.setItem(
                        REFRESH_TOKEN,
                        response.data.refresh_token
                    );

                    Queries.getCurrentUser().then((user) => {
                        dispatch(logIn(user.data));
                    });
                })
                .then(() => navigate("/"));
        }
    }

    return (
        <S.Auth>
            <S.AuthBlock>
                <img src={LogoAuth} alt="logo" />

                <S.AuthForm>
                    <S.AuthFormInput
                        placeholder="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <S.AuthFormInput
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <MainButton type="submit" onClick={login}>
                        Войти
                    </MainButton>
                    <S.SignUpLink to="/registration">
                        Зарегистрироваться
                    </S.SignUpLink>
                </S.AuthForm>
            </S.AuthBlock>
        </S.Auth>
    );
}

export default Login;
