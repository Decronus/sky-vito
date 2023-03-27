import { StyledContainer } from "../../global-styles";
import Adv from "../../components/adv/Adv";
import * as S from "./styles";
import { useLoaderData } from "react-router-dom";
import PhoneButton from "../../components/phone-button/PhoneButton";

function Profile() {
    const [userAds, user] = useLoaderData();

    return (
        <S.Main>
            <StyledContainer>
                <h1>Профиль продавца</h1>
                <S.SellerInfoBlock>
                    <div>
                        <S.SellerAvatar url={user?.avatar}></S.SellerAvatar>
                    </div>
                    <S.SellerInfoTextAndPhone>
                        <S.SellerInfoText>
                            <p>{user?.name}</p>
                            <p>{user?.city}</p>
                            <p>Продает товары с {user?.sells_from}</p>
                        </S.SellerInfoText>
                        <PhoneButton user={user} />
                    </S.SellerInfoTextAndPhone>
                </S.SellerInfoBlock>

                {userAds.length > 0 && (
                    <S.SellerGoods>
                        <h2>Товары продавца</h2>
                        <S.AdvList>
                            {userAds.map((adv) => (
                                <Adv key={adv.id} adv={adv} />
                            ))}
                        </S.AdvList>
                    </S.SellerGoods>
                )}
            </StyledContainer>
        </S.Main>
    );
}

export default Profile;
