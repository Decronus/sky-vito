import React from "react";
import Adv from "../../components/adv";
import { StyledContainer } from "../../global-styles";
import * as S from "./styles";
import { useLoaderData } from "react-router-dom";

function Home() {
    const adsList = useLoaderData();

    return (
        <S.Main>
            <StyledContainer>
                <S.Title>Объявления</S.Title>
                <S.AdvList>
                    {adsList.map((adv) => (
                        <Adv key={adv.id} adv={adv} />
                    ))}
                </S.AdvList>
            </StyledContainer>
        </S.Main>
    );
}

export default Home;
