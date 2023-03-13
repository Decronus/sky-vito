import React from "react";
import Adv from "../../components/adv";
import { StyledContainer } from "../../global-styles";
import * as S from "./styles";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchSelector } from "../../store/selectors/main";

function Home() {
    const adsList = useLoaderData();
    const searchQuery = useSelector(searchSelector);

    function searchFilter(searchQuery, adv) {
        const advValues = Object.values(adv).slice(0, 2).join(" ");
        return advValues.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return (
        <S.Main>
            <StyledContainer>
                <S.Title>Объявления</S.Title>
                <S.AdvList>
                    {adsList
                        .filter((adv) => searchFilter(searchQuery, adv))
                        .map((adv) => (
                            <Adv key={adv.id} adv={adv} />
                        ))}
                </S.AdvList>
            </StyledContainer>
        </S.Main>
    );
}

export default Home;
