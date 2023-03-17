import ProfileDataForm from "../../components/profile-data-form";
import { StyledContainer } from "../../global-styles";
import Adv from "../../components/adv";
import * as S from "./styles";
import { useLoaderData } from "react-router-dom";
import { userSelector } from "../../store/selectors/main";
import { useSelector } from "react-redux";

function Account() {
    const userAds = useLoaderData();

    const currentUser = useSelector(userSelector);

    return (
        <S.Main>
            <StyledContainer>
                <h1>Здравствуйте, {currentUser?.name ? currentUser?.name : currentUser?.email}</h1>
                <h2>Настройки профиля</h2>
                <ProfileDataForm currentUser={currentUser} />

                {userAds.length > 0 && (
                    <S.SellerGoods>
                        <h2>Мои товары</h2>
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

export default Account;
