import { useState } from "react";
import * as S from "./styles";
import MainButton from "../main-button/MainButton";
import CloseFormButton from "../close-form-button/CloseFormButton";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/main";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";
import { ADV_ROUTE } from "../../utils/consts";
import { checkActualAccessToken } from "../../utils/functions";

function AdvReviews({ closeForm, comments, adv }) {
    const navigate = useNavigate();
    const currentUser = useSelector(userSelector);

    const [text, setText] = useState("");

    const addComment = async (event) => {
        event.preventDefault();

        await checkActualAccessToken();

        Queries.postCreateAdsComment(adv?.id, { text: text })
            .then(() => {
                setText("");
                navigate(`/${ADV_ROUTE}/${adv.id}`);
            })
            .catch((error) => alert(error));
    };

    return (
        <S.ReviewsBack onClick={closeForm}>
            <S.ReviewsBlock onClick={(event) => event.stopPropagation()}>
                <S.ReviewTitleWrapper>
                    <h2>Отзывы о товаре</h2>
                    <CloseFormButton onClick={closeForm} />
                </S.ReviewTitleWrapper>
                <S.OverflowBlock>
                    {currentUser && (
                        <>
                            <S.Subtitle>Добавить отзыв</S.Subtitle>
                            <S.ReviewSendForm>
                                <S.ReviewSendFormInput
                                    type="text"
                                    placeholder="Введите отзыв"
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}
                                />
                                <div>
                                    <MainButton active={text} type="submit" onClick={(event) => addComment(event)}>
                                        Опубликовать
                                    </MainButton>
                                </div>
                            </S.ReviewSendForm>
                        </>
                    )}

                    <S.ReviewsList>
                        {comments.map((el, index) => (
                            <S.Review key={index}>
                                {el.author.id === currentUser?.id && (
                                    <S.ReviewDeleteIcon>
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 17 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M7.13486 8.54895L0.567429 15.1164L1.98164 16.5306L8.54907 9.96316L15.1165 16.5306L16.5307 15.1164L9.96329 8.54895L16.5306 1.98164L15.1164 0.567429L8.54907 7.13474L1.98177 0.567429L0.567551 1.98164L7.13486 8.54895Z"
                                                fill="#AAAAAA"
                                            />
                                        </svg>
                                    </S.ReviewDeleteIcon>
                                )}

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
