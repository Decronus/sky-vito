import React, { useState, useEffect, useRef } from "react";
import * as S from "./styles";
import CloseFormButton from "../close-form-button";
import plug from "../../assets/static/add_adv_photo_plug.jpg";
import MainButton from "../main-button";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/consts";

function EditAdvForm({ adv, closeForm }) {
    console.log("adv", adv);
    const hiddenFileInput = useRef();
    const navigate = useNavigate();

    const [title, setTitle] = useState(adv?.title);
    const [description, setDescription] = useState(adv?.description);
    const [price, setPrice] = useState(adv?.price);
    const [activeButton, setActiveButton] = useState(false);
    const [initImages, setInitImages] = useState(true);
    const [advImages, setAdvImages] = useState([]);
    const [files, setFiles] = useState([]);
    console.log("files", files);

    const chooseImage = () => {
        hiddenFileInput.current.click();
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
        setInitImages(false);

        const tempArray = [];
        for (let file of filesUploaded) {
            const obj = URL.createObjectURL(file);
            tempArray.push(obj);
        }

        setAdvImages(tempArray);
    };

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
                            multiple
                            ref={hiddenFileInput}
                            onChange={uploadFiles}
                        />

                        <S.FormAdvImages>
                            {Array.from({ length: 5 }, (el, index) => (
                                <div key={index} onClick={chooseImage}>
                                    <S.UploadedImage
                                        url={
                                            advImages[index] ||
                                            (initImages &&
                                                (adv.images[index]?.url ? API_URL + adv.images[index]?.url : null)) ||
                                            plug
                                        }
                                    ></S.UploadedImage>
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
