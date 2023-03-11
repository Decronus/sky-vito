import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { ADV_ROUTE } from "../../utils/consts";

function Adv({ adv }) {
    return (
        <S.Adv>
            <Link to={`${ADV_ROUTE}/${adv.id}`}>
                <S.AdvImage url={adv.images[0]?.url} alt="img" />
            </Link>
            <Link to={`${ADV_ROUTE}/${adv.id}`}>
                <S.AdvTitle>{adv.title}</S.AdvTitle>
            </Link>

            <S.AdvPrice>{adv.price}</S.AdvPrice>
            <S.AdvLocation>{adv.user.city}</S.AdvLocation>
            <S.AdvDataRelease>
                {new Date(adv.created_on).toLocaleDateString()}
            </S.AdvDataRelease>
        </S.Adv>
    );
}

export default Adv;
