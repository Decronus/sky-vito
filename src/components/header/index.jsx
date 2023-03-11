import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import HeaderButton from "./header-button";
import { StyledContainer, Overlay } from "../../global-styles";
import CreateAdvForm from "../create-adv-form";
import Queries from "../../services/queries.service";

function Header({ isAuth }) {
    useEffect(() => {
        Queries.getCurrentUser().then((user) => console.log(user.data));
    });

    const [visibleAddAdv, setVisibleAddAdv] = useState();
    return (
        <S.Header>
            <StyledContainer>
                <S.HeaderInner>
                    {!isAuth ? (
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
                            <Link to="/profile/1">
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
