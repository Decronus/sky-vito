import React, { useState } from "react";
import ProfileDataForm from "../../components/profile-data-form";
import { StyledContainer } from "../../global-styles";
import Adv from "../../components/adv";
import * as S from "./styles";
import { useLoaderData } from "react-router-dom";

function Profile() {
    const [userAds, user] = useLoaderData();
    const [phoneVisibility, setPhoneVisibility] = useState(false);

    const isMyProfile = false;

    return (
        <S.Main>
            <StyledContainer>
                {isMyProfile ? (
                    <>
                        <h1>Здравствуйте, {user.name}</h1>
                        <h2>Настройки профиля</h2>
                        <ProfileDataForm />
                        <h2>Мои товары</h2>
                        <S.AdvList>
                            {userAds.map((adv) => (
                                <Adv key={adv.id} adv={adv} />
                            ))}
                        </S.AdvList>
                    </>
                ) : (
                    <>
                        <h1>Профиль продавца</h1>
                        <S.SellerInfoBlock>
                            <div>
                                <S.SellerAvatar
                                    url={user?.avatar}
                                ></S.SellerAvatar>
                            </div>
                            <div>
                                <p>{user?.name}</p>
                                <p>{user?.city}</p>
                                <p>Продает товары с {user?.sells_from}</p>
                                {phoneVisibility ? (
                                    <S.PhoneButton>
                                        <span>
                                            {`${user?.phone.slice(
                                                0,
                                                1
                                            )} ${user?.phone.slice(
                                                1,
                                                4
                                            )} ${user?.phone.slice(4)}`}
                                        </span>
                                    </S.PhoneButton>
                                ) : (
                                    <S.PhoneButton
                                        onClick={() => setPhoneVisibility(true)}
                                    >
                                        Показать телефон
                                        <span>
                                            {`${user?.phone.slice(
                                                0,
                                                1
                                            )} ${user?.phone.slice(
                                                1,
                                                4
                                            )} ХХХ ХХ ХХ`}
                                        </span>
                                    </S.PhoneButton>
                                )}
                            </div>
                        </S.SellerInfoBlock>
                        <h2>Товары продавца</h2>
                        <S.AdvList>
                            {userAds.map((adv) => (
                                <Adv key={adv.id} adv={adv} />
                            ))}
                        </S.AdvList>
                    </>
                )}
            </StyledContainer>
        </S.Main>
    );
}

export default Profile;
