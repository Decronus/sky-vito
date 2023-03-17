import { useState } from "react";
import * as S from "./styles";
import MainButton from "../main-button";
import CloseFormButton from "../close-form-button";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/main";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";
import { ADV_ROUTE } from "../../utils/consts";

function AdvReviews({ closeForm, comments, adv }) {
    const navigate = useNavigate();
    const currentUser = useSelector(userSelector);

    const [text, setText] = useState("");

    const addComment = (event) => {
        event.preventDefault();

        Queries.postCreateAdsComment(adv?.id, { text: text })
            .then(() => {
                setText("");
                navigate(`/${ADV_ROUTE}/${adv.id}`);
            })
            .catch((error) => alert(error));
    };

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
                                <S.ReviewSendFormInput
                                    type="text"
                                    placeholder="Введите отзыв"
                                    value={text}
                                    onChange={(event) => setText(event.target.value)}
                                />
                                <div>
                                    <MainButton active={text} type="submit" onClick={addComment}>
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
