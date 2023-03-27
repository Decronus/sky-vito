import styled from "styled-components";

export const Main = styled.div`
    padding-bottom: 37px;
`;

export const AdvList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 40px 26px;

    @media screen and (max-width: 1158px) {
        grid-template-columns: repeat(3, 270px);
    }

    @media screen and (max-width: 890px) {
        grid-template-columns: repeat(2, 270px);
    }
`;

export const Title = styled.h1`
    margin-bottom: 40px;
`;
