import React, { useState } from "react";
import LogoAuth from "../../assets/static/logo_auth.svg";
import * as S from "./styles";
import MainButton from "../../components/main-button/MainButton";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";

function Registration() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [city, setCity] = useState("");

    function registration(event) {
        event.preventDefault();
        if (email && password === repeatPassword) {
            const body = {
                id: Date.now(),
                email: email,
                password: password,
                name: name,
                surname: surname,
                city: city,
            };

            Queries.postRegUser(body)
                .then((response) => console.log(response.data))
                .then(() => navigate("/login"));
        } else {
            alert("Пароли не совпадают");
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
                    <S.AuthFormInput
                        placeholder="Повторите пароль"
                        type="password"
                        value={repeatPassword}
                        onChange={(event) => setRepeatPassword(event.target.value)}
                    />
                    <S.AuthFormInput
                        placeholder="Имя (необязательно)"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <S.AuthFormInput
                        placeholder="Фамилия (необязательно)"
                        type="text"
                        value={surname}
                        onChange={(event) => setSurname(event.target.value)}
                    />
                    <S.AuthFormInput
                        placeholder="Город (необязательно)"
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <MainButton type="submit" onClick={registration}>
                        Зарегистрироваться
                    </MainButton>
                </S.AuthForm>
            </S.AuthBlock>
        </S.Auth>
    );
}

export default Registration;
