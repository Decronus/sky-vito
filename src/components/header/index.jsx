import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import HeaderButton from "./header-button";
import { StyledContainer } from "../../global-styles";
import CreateAdvForm from "../create-adv-form";
import Queries from "../../services/queries.service";
import { ACCESS_TOKEN } from "../../utils/consts";
import { REFRESH_TOKEN } from "../../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../store/actions/creators/main";
import { userSelector } from "../../store/selectors/main";

function Header() {
    const dispatch = useDispatch();
    const currentUser = useSelector(userSelector);
    console.log("currentUser", currentUser);

    function checkCurrentUser() {
        Queries.getCurrentUser()
            .then((user) => {
                dispatch(logIn(user.data));
            })
            .catch((error) => {
                const body = {
                    access_token: localStorage.getItem(ACCESS_TOKEN),
                    refresh_token: localStorage.getItem(REFRESH_TOKEN),
                };

                Queries.postUpdateTokens(body)
                    .then((response) => {
                        localStorage.setItem(
                            ACCESS_TOKEN,
                            response.data.access_token
                        );
                        localStorage.setItem(
                            REFRESH_TOKEN,
                            response.data.refresh_token
                        );
                    })
                    .then(() =>
                        Queries.getCurrentUser().then((user) =>
                            dispatch(logIn(user.data))
                        )
                    );
            });
    }

    useEffect(() => {
        checkCurrentUser();
    }, []);

    const [visibleAddAdv, setVisibleAddAdv] = useState();
    return (
        <S.Header>
            <StyledContainer>
                <S.HeaderInner>
                    {!currentUser ? (
                        <Link to="/login">
                            <HeaderButton>Вход в личный кабинет</HeaderButton>
                        </Link>
                    ) : (
                        <S.HeaderAuthButtons>
                            <HeaderButton
                                onClick={() => setVisibleAddAdv(true)}
                            >
                                Разместить объявление
                            </HeaderButton>
                            <Link to={`/profile/${currentUser?.id}`}>
                                <HeaderButton>Личный кабинет</HeaderButton>
                            </Link>
                        </S.HeaderAuthButtons>
                    )}
                </S.HeaderInner>
            </StyledContainer>

            {visibleAddAdv && (
                <CreateAdvForm closeForm={() => setVisibleAddAdv(false)} />
            )}
        </S.Header>
    );
}

export default Header;
