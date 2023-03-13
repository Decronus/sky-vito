import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as S from "./styles";
import logo from "../../assets/static/logo.svg";
import MainButton from "../main-button";
import { StyledContainer } from "../../global-styles";
import { HOME_ROUTE } from "../../utils/consts";
import { useDispatch } from "react-redux";
import { search } from "../../store/actions/creators/main";
import { useSelector } from "react-redux";
import { searchSelector } from "../../store/selectors/main";

function Search() {
    const { pathname } = useLocation();
    const isHome = pathname === HOME_ROUTE;

    const dispatch = useDispatch();
    const searchQuery = useSelector(searchSelector);

    return (
        <S.Search>
            <StyledContainer>
                <S.SearchWrapper>
                    <img src={logo} alt="logo" />
                    {isHome ? (
                        <S.SearchBlock>
                            <S.SearchInput
                                placeholder="Поиск по объявлениям"
                                value={searchQuery}
                                onChange={(event) =>
                                    dispatch(search(event.target.value))
                                }
                            />
                            <MainButton>Найти</MainButton>
                        </S.SearchBlock>
                    ) : (
                        <Link to="/">
                            <MainButton>Вернуться на главную</MainButton>
                        </Link>
                    )}
                </S.SearchWrapper>
            </StyledContainer>
        </S.Search>
    );
}

export default Search;
