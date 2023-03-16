import React from "react";
import * as S from "./styles";
import MainButton from "../main-button";
import CloseFormButton from "../close-form-button";
import { userSelector } from "../../store/selectors/main";
import { useSelector } from "react-redux";

function AdvReviews({ closeForm, comments }) {
    const currentUser = useSelector(userSelector);

    return (
        <S.ReviewsBack>
            <S.ReviewsBlock>
                <S.ReviewTitleWrapper>
                    <h2>Отзывы о товаре</h2>
                    <CloseFormButton onClick={closeForm} />
                </S.ReviewTitleWrapper>
                <S.OverflowBlock>
                    {currentUser && (
                        <>
                            <S.Subtitle>Добавить отзыв</S.Subtitle>
                            <S.ReviewSendForm>
                                <S.ReviewSendFormInput type="text" placeholder="Введите отзыв" />
                                <div>
                                    <MainButton active={false} type="submit">
                                        Опубликовать
                                    </MainButton>
                                </div>
                            </S.ReviewSendForm>
                        </>
                    )}

                    <S.ReviewsList>
                        {comments.map((el, key) => (
                            <S.Review key={key}>
                                <S.ReviewerAvatar url={el?.author.avatar} />
                                <div>
                                    <S.ReviewerInfo>
                                        <S.ReviewerName>{el?.author.name}</S.ReviewerName>
                                        <S.ReviewDateRelease>
                                            {new Date(el?.created_on).toLocaleDateString()}
                                        </S.ReviewDateRelease>
                                    </S.ReviewerInfo>
                                    <S.ReviewerCommentBlock>
                                        <S.ReviewerCommentTitle>Комментарий</S.ReviewerCommentTitle>
                                        <S.ReviewCommentText>{el?.text}</S.ReviewCommentText>
                                    </S.ReviewerCommentBlock>
                                </div>
                            </S.Review>
                        ))}
                    </S.ReviewsList>
                </S.OverflowBlock>
            </S.ReviewsBlock>
        </S.ReviewsBack>
    );
}

export default AdvReviews;
