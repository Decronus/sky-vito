import { useState } from "react";
import { StyledContainer } from "../../global-styles";
import * as S from "./styles";
import testImg from "../../assets/static/test.jpg";
import AdvReviews from "../../components/adv-reviews";
import MainButton from "../../components/main-button";
import EditAdvForm from "../../components/edit-adv-form";
import { useLoaderData } from "react-router-dom";
import { userSelector } from "../../store/selectors/main";
import { useSelector } from "react-redux";
import PhoneButton from "../../components/phone-button/PhoneButton";

function AdvPage() {
    const adv = useLoaderData();
    const currentUser = useSelector(userSelector);
    console.log("adv", adv);
    console.log("curr", currentUser);

    const [activeImg, setActiveImg] = useState(0);
    const [visibleReviews, setVisibleReviews] = useState(false);
    const [visibleEditAdvForm, setVisibleEditAdvForm] = useState(false);

    return (
        <S.Main>
            <StyledContainer>
                <S.AdvInfo>
                    <S.AdvImagesBlock>
                        <S.CurrentAdvImage url={adv.images[0]?.url} alt="Изображение" />
                        <S.AdvImagesList>
                            {adv?.images?.map((image, index) => (
                                <S.AdvImage
                                    key={image.id}
                                    url={adv.images[0]?.url}
                                    alt="Изображение"
                                    onClick={() => setActiveImg(index)}
                                />
                            ))}
                        </S.AdvImagesList>
                    </S.AdvImagesBlock>
                    <div>
                        <S.AdvTitle>{adv.title}</S.AdvTitle>
                        <S.AdvDataRelease>{new Date(adv.created_on).toLocaleDateString()}</S.AdvDataRelease>
                        <S.AdvLocation>{adv?.user?.city}</S.AdvLocation>
                        <S.AdvReviews onClick={() => setVisibleReviews(true)}>23 отзыва</S.AdvReviews>
                        <S.AdvPrice>{`${adv.price} ₽`}</S.AdvPrice>

                        <S.AdvSettingsButtons>
                            {adv.user_id === currentUser?.id ? (
                                <>
                                    <MainButton type="button" onClick={() => setVisibleEditAdvForm(true)}>
                                        Редактировать
                                    </MainButton>
                                    <MainButton type="button">Снять с публикации</MainButton>
                                </>
                            ) : (
                                <PhoneButton user={currentUser} />
                            )}
                        </S.AdvSettingsButtons>

                        <S.SellerInfo>
                            <S.SellerAvatar src={testImg} alt="seller avatar" />
                            <div>
                                <S.SellerName to={`/profile/${adv?.user?.id}`}>{adv?.user?.name}</S.SellerName>
                                <S.SellerActivity>Продает товары с октября 2003</S.SellerActivity>
                            </div>
                        </S.SellerInfo>
                    </div>
                </S.AdvInfo>
                <div>
                    <h2>Описание товара</h2>
                    <S.AdvDescription>{adv.description}</S.AdvDescription>
                </div>
            </StyledContainer>
            {visibleReviews && <AdvReviews closeForm={() => setVisibleReviews(false)} />}

            {visibleEditAdvForm && <EditAdvForm adv={adv} closeForm={() => setVisibleEditAdvForm(false)} />}
        </S.Main>
    );
}

export default AdvPage;
