import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";
import CloseFormButton from "../close-form-button";
import plug from "../../assets/static/add_adv_photo_plug.jpg";
import MainButton from "../main-button";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import { checkActualAccessToken } from "../../decorators";

function EditAdvForm({ adv, closeForm }) {
    function extractImages(adv) {
        const tempArray = [];
        for (let image of adv.images) {
            console.log(image);
            tempArray.push(API_URL + image.url);
        }

        return tempArray;
    }

    const hiddenFileInput = useRef();
    const navigate = useNavigate();

    const [title, setTitle] = useState(adv?.title);
    const [description, setDescription] = useState(adv?.description);
    const [price, setPrice] = useState(adv?.price);
    const [activeButton, setActiveButton] = useState(false);
    const [advImages, setAdvImages] = useState(extractImages(adv));
    const [files, setFiles] = useState([]);

    const chooseImage = (event) => {
        if (event.currentTarget === event.target) {
            hiddenFileInput.current.click();
        }
    };

    const newAdvData = {
        title: title,
        description: description,
        price: price,
    };

    const checkNewAdvData = () => {
        if (files.length) return true;

        for (let el in newAdvData) {
            if (String(newAdvData[el]) !== String(adv[el])) {
                return true;
            }
        }
        return false;
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
                if (files.length) {
                    const deleteImgRequests = adv.data.images.map((image) => {
                        return Queries.deleteImageFromAdv(adv.data.id, image.url).catch((error) =>
                            alert(`Ошибка при загрузке изображений: ${error}`)
                        );
                    });

                    Promise.all(deleteImgRequests).then(() => {
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
                }
                closeForm();
                navigate(window.location.pathname);
            })
            .catch((error) => alert(`Ошибка при изменении объявления: ${error}`));
    }

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

    const deleteImageFromAdv = (advId, url, index) => {
        if (url) {
            Queries.deleteImageFromAdv(advId, url)
                .then(() => {
                    const newFiles = files;
                    newFiles.splice(index, 1);
                    setFiles(newFiles);

                    deletePreviewImages(index);
                })
                .catch((error) => alert(`Ошибка при удалении изображения: ${error}`));
        } else {
            deletePreviewImages(index);
        }
    };

    function deletePreviewImages(index) {
        const newAdvImages = advImages;
        newAdvImages.splice(index, 1);

        setAdvImages(newAdvImages);
        navigate(window.location.pathname);
    }

    return (
        <S.EditBack onClick={closeForm}>
            <S.FormWrapper onClick={(event) => event.stopPropagation()}>
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
                            multiple
                            ref={hiddenFileInput}
                            onChange={uploadFiles}
                        />

                        <S.FormAdvImages>
                            {Array.from({ length: 5 }, (el, index) => (
                                <div key={index}>
                                    <S.UploadedImage onClick={chooseImage} url={advImages[index] || plug}>
                                        {advImages[index] && (
                                            <S.UploadedImageCloseDiv
                                                // onClick={() =>
                                                //     deleteImageFromAdv(adv.id, adv.images[index]?.url, index)
                                                // }
                                                onClick={() =>
                                                    checkActualAccessToken(
                                                        deleteImageFromAdv(adv.id, adv.images[index]?.url, index)
                                                    )
                                                }
                                            >
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
                        <MainButton active={activeButton} onClick={(event) => checkActualAccessToken(updateAdv(event))}>
                            Сохранить
                        </MainButton>
                    </div>
                </S.Form>
            </S.FormWrapper>
        </S.EditBack>
    );
}

export default EditAdvForm;
