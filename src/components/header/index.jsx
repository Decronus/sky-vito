import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import HeaderButton from "./header-button";
import { StyledContainer } from "../../global-styles";
import CreateAdvForm from "../create-adv-form";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../store/selectors/main";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/consts";
import { logOut } from "../../store/actions/creators/main";

function Header() {
    const currentUser = useSelector(userSelector);
    const dispatch = useDispatch();

    const [visibleAddAdv, setVisibleAddAdv] = useState();

    function exitAccount() {
        localStorage.setItem(ACCESS_TOKEN, "");
        localStorage.setItem(REFRESH_TOKEN, "");
        dispatch(logOut());
    }

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
                            <HeaderButton onClick={() => setVisibleAddAdv(true)}>Разместить объявление</HeaderButton>
                            <Link to={`/account`}>
                                <HeaderButton>Личный кабинет</HeaderButton>
                            </Link>

                            <HeaderButton onClick={exitAccount}>Выйти из аккаунта</HeaderButton>
                        </S.HeaderAuthButtons>
                    )}
                </S.HeaderInner>
            </StyledContainer>

            {visibleAddAdv && <CreateAdvForm closeForm={() => setVisibleAddAdv(false)} />}
        </S.Header>
    );
}

export default Header;
