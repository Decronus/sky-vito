import { useState, useRef } from "react";
import { StyledContainer } from "../../global-styles";
import * as S from "./styles";
import AdvReviews from "../../components/adv-reviews/AdvReviews";
import MainButton from "../../components/main-button/MainButton";
import EditAdvForm from "../../components/edit-adv-form/EditAdvForm";
import { useLoaderData, useNavigate } from "react-router-dom";
import { userSelector } from "../../store/selectors/main";
import { useSelector } from "react-redux";
import PhoneButton from "../../components/phone-button/PhoneButton";
import Queries from "../../services/queries.service";
import { LOGIN_ROUTE } from "../../utils/consts";
import { useLocation } from "react-router-dom";
import { checkActualAccessToken } from "../../decorators";

function AdvPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [adv, comments] = useLoaderData();
    const currentUser = useSelector(userSelector);

    const imagesListRef = useRef(null);

    const [activeImg, setActiveImg] = useState(0);
    const [visibleReviews, setVisibleReviews] = useState(false);
    const [visibleEditAdvForm, setVisibleEditAdvForm] = useState(false);

    const deleteAdv = () => {
        // eslint-disable-next-line no-restricted-globals
        const accept = confirm("Вы уверены, что хотите снять объявление с публикации?");
        if (accept) {
            Queries.deleteAdv(adv.id)
                .then((response) => console.log(response))
                .then(() => navigate("/"));
        }
    };

    const formatCommentEnding = (comments) => {
        if (comments.length === 0) {
            return "Оставить отзыв";
        } else if (comments.length === 1) {
            return `${comments.length} отзыв`;
        } else if (comments.length >= 2 && comments.length <= 4) {
            return `${comments.length} отзыва`;
        } else if (comments.length >= 5 && comments.length <= 20) {
            return `${comments.length} отзывов`;
        } else if (comments.length[comments.length - 1] === 1) {
            return `${comments.length} отзыв`;
        } else if (comments.length[comments.length - 1] >= 2 && comments.length <= 4) {
            return `${comments.length} отзыва`;
        } else {
            return `${comments.length} отзывов`;
        }
    };

    const changeActiveImage = (event, index) => {
        const images = imagesListRef.current.childNodes;

        images.forEach((img) => {
            img.style.border = "none";
        });

        event.target.style.border = "2px solid #009EE4";
        setActiveImg(index);
    };

    return (
        <S.Main>
            <StyledContainer>
                <S.AdvInfo>
                    <S.AdvImagesBlock>
                        <S.CurrentAdvImage url={adv?.images[activeImg]?.url} alt="Изображение" />
                        <S.AdvImagesList ref={imagesListRef}>
                            {adv?.images.map((image, index) => (
                                <S.AdvImage
                                    key={image.id}
                                    url={image.url}
                                    alt="Изображение"
                                    onClick={(event) => changeActiveImage(event, index)}
                                    style={{ border: index === 0 ? "2px solid #009EE4" : "none" }}
                                />
                            ))}
                        </S.AdvImagesList>
                    </S.AdvImagesBlock>
                    <div>
                        <S.AdvTitle>{adv?.title}</S.AdvTitle>
                        <S.AdvDataRelease>{new Date(adv?.created_on).toLocaleDateString()}</S.AdvDataRelease>
                        <S.AdvLocation>{adv?.user?.city}</S.AdvLocation>
                        <S.AdvReviews
                            onClick={() =>
                                currentUser || comments?.length !== 0
                                    ? setVisibleReviews(true)
                                    : navigate(`/${LOGIN_ROUTE}`, { state: { from: location.pathname } })
                            }
                        >
                            {formatCommentEnding(comments)}
                        </S.AdvReviews>
                        <S.AdvPrice>{`${adv?.price} ₽`}</S.AdvPrice>

                        <S.AdvSettingsButtons>
                            {adv?.user_id === currentUser?.id ? (
                                <>
                                    <MainButton type="button" onClick={() => setVisibleEditAdvForm(true)}>
                                        Редактировать
                                    </MainButton>
                                    <MainButton
                                        type="button"
                                        onClick={(event) => checkActualAccessToken(deleteAdv(event))}
                                    >
                                        Снять с публикации
                                    </MainButton>
                                </>
                            ) : (
                                <PhoneButton user={currentUser} />
                            )}
                        </S.AdvSettingsButtons>

                        <S.SellerInfo>
                            <S.SellerAvatar url={adv?.user.avatar} />
                            <div>
                                <S.SellerName to={`/profile/${adv?.user?.id}`}>{adv?.user?.name}</S.SellerName>
                                <S.SellerActivity>Продает товары с {adv?.user.sells_from}</S.SellerActivity>
                            </div>
                        </S.SellerInfo>
                    </div>
                </S.AdvInfo>
                <div>
                    <h2>Описание товара</h2>

                    {adv?.description ? (
                        <S.AdvDescription>{adv?.description}</S.AdvDescription>
                    ) : (
                        <S.NoAdvDescription>Пользователь не оставил описание товара</S.NoAdvDescription>
                    )}
                </div>
            </StyledContainer>
            {visibleReviews && <AdvReviews adv={adv} comments={comments} closeForm={() => setVisibleReviews(false)} />}

            {visibleEditAdvForm && <EditAdvForm adv={adv} closeForm={() => setVisibleEditAdvForm(false)} />}
        </S.Main>
    );
}

export default AdvPage;
