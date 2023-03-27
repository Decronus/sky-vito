import React, { useState, useRef } from "react";
import * as S from "./styles";
import MainButton from "../main-button";
import CloseFormButton from "../close-form-button";
import plug from "../../assets/static/add_adv_photo_plug.jpg";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";
import { checkActualAccessToken } from "../../decorators";

function CreateAdvForm({ closeForm }) {
    const navigate = useNavigate();
    const hiddenFileInput = useRef();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [advImages, setAdvImages] = useState([]);
    const [files, setFiles] = useState([]);

    const chooseImage = (event) => {
        if (event.currentTarget === event.target) {
            hiddenFileInput.current.click();
        }
    };

    const uploadFiles = () => {
        const filesUploaded = hiddenFileInput.current.files;
        if (filesUploaded.length > 5) {
            alert("Выберите максимум 5 изображений");
            return;
        }
        setFiles(filesUploaded);

        const tempArray = [];
        for (let file of filesUploaded) {
            const obj = URL.createObjectURL(file);
            tempArray.push(obj);
        }

        setAdvImages(tempArray);
    };

    const createAdv = (event) => {
        event.preventDefault();

        const body = {
            title: title,
            description: description,
            price: price,
        };

        Queries.postCreateAdv(body).then((adv) => {
            const uploadImgRequests = Array.from(files).map((file) => {
                const form = new FormData();
                form.append("file", file);

                return Queries.postAddImageToAdv(adv.data.id, form).catch((error) =>
                    alert(`Ошибка при загрузке изображений: ${error}`)
                );
            });

            Promise.all(uploadImgRequests).then(() => {
                closeForm();
                navigate(window.location.pathname);
            });
        });
    };

    function deletePreviewImages(index) {
        const newAdvImages = advImages;
        newAdvImages.splice(index, 1);

        setAdvImages(newAdvImages);
        navigate(window.location.pathname);
    }

    return (
        <S.CreateAdvBack onClick={closeForm}>
            <S.FormWrapper onClick={(event) => event.stopPropagation()}>
                <S.TitleWrapper>
                    <h2>Новое объявление</h2>
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
                        <label htmlFor="adv-photo" style={{ marginBottom: "6px" }}>
                            Фотографии товара <span>не более 5 фотографий</span>
                        </label>
                        <S.FormInputFile
                            name="adv-photo"
                            type="file"
                            accept="image/*"
                            multiple
                            ref={hiddenFileInput}
                            onChange={uploadFiles}
                        />

                        <S.FormAdvImages>
                            {Array.from({ length: 5 }, (el, index) => (
                                <S.UploadedImage key={index} url={advImages[index] || plug} onClick={chooseImage}>
                                    {advImages[index] && (
                                        <S.UploadedImageCloseDiv onClick={() => deletePreviewImages(index)}>
                                            <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 0 30 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7.27466 7.72559L21.8236 22.2745"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                />
                                                <path
                                                    d="M21.8235 7.72559L7.27454 22.2745"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                />
                                            </svg>
                                        </S.UploadedImageCloseDiv>
                                    )}
                                </S.UploadedImage>
                            ))}
                        </S.FormAdvImages>
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <label htmlFor="adv-price">Цена</label>
                        <S.FormInputPriceWrapper>
                            <S.FormInputPrice
                                name="adv-price"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </S.FormInputPriceWrapper>
                    </S.InputWrapper>
                    <div>
                        <MainButton active={title} onClick={(event) => checkActualAccessToken(createAdv(event))}>
                            Опубликовать
                        </MainButton>
                    </div>
                </S.Form>
            </S.FormWrapper>
        </S.CreateAdvBack>
    );
}

export default CreateAdvForm;
