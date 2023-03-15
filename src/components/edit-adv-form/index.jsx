import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";
import CloseFormButton from "../close-form-button";
import plug from "../../assets/static/add_adv_photo_plug.jpg";
import MainButton from "../main-button";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";

function EditAdvForm({ adv, closeForm }) {
    const hiddenFileInput = useRef();
    const navigate = useNavigate();

    const [title, setTitle] = useState(adv?.title);
    const [description, setDescription] = useState(adv?.description);
    const [price, setPrice] = useState(adv?.price);
    const [activeButton, setActiveButton] = useState(false);
    const [advImage, setAdvImage] = useState();

    const newAdvData = {
        title: title,
        description: description,
        price: price,
    };

    const checkNewAdvData = () => {
        for (let el in newAdvData) {
            if (String(newAdvData[el]) !== String(adv[el])) {
                return true;
            }
        }
        return false;
    };

    const handleClick = (e) => {
        const { target } = e;

        console.log(target);
    };

    const handleChange = () => {
        const fileUploaded = hiddenFileInput.current.files[0];
        const obj = URL.createObjectURL(fileUploaded);
        setAdvImage(obj);
    };

    useEffect(() => {
        setActiveButton(checkNewAdvData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newAdvData]);

    function updateAdv(event) {
        event.preventDefault();

        const body = {
            title: title,
            description: description,
            price: price,
        };

        Queries.patchUpdateAdv(adv.id, body)
            .then((adv) => {
                console.log("adv.data", adv.data);
                closeForm();
                navigate(`/adv/${adv.data.id}`);
            })
            .catch((error) => alert(error));
    }

    return (
        <S.EditBack>
            <S.FormWrapper>
                <S.TitleWrapper>
                    <h2>Редактировать объявление</h2>
                    <CloseFormButton onClick={closeForm} />
                </S.TitleWrapper>
                <S.Form>
                    <S.InputWrapper>
                        <label htmlFor="adv-name">Название</label>
                        <S.FormInputName
                            name="adv-name"
                            placeholder="Введите название"
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <label htmlFor="adv-description">Описание</label>
                        <S.FormInputDescription
                            name="adv-description"
                            placeholder="Введите описание"
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <label htmlFor="adv-photo">
                            Фотографии товара <span>не более 5 фотографий</span>
                        </label>
                        <S.FormInputFile
                            name="adv-photo"
                            type="file"
                            accept="image/*"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                        />

                        <S.FormAdvImages>
                            {Array.from({ length: 5 }, (_v, k) => (
                                <div key={k} onClick={handleClick}>
                                    <img src={advImage || plug} alt="название" />
                                </div>
                            ))}
                        </S.FormAdvImages>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <label htmlFor="adv-price">Цена</label>
                        <S.FormInputPriceWrapper>
                            <S.FormInputPrice
                                name="adv-price"
                                type="number"
                                placeholder="Введите цену"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </S.FormInputPriceWrapper>
                    </S.InputWrapper>
                    <div>
                        <MainButton active={activeButton} onClick={updateAdv}>
                            Сохранить
                        </MainButton>
                    </div>
                </S.Form>
            </S.FormWrapper>
        </S.EditBack>
    );
}

export default EditAdvForm;
