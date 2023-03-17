import React, { useState, useRef } from "react";
import * as S from "./styles";
import MainButton from "../main-button";
import CloseFormButton from "../close-form-button";
import plug from "../../assets/static/add_adv_photo_plug.jpg";
import Queries from "../../services/queries.service";
import { useNavigate } from "react-router-dom";

function CreateAdvForm({ closeForm }) {
    const navigate = useNavigate();
    const hiddenFileInput = useRef();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const [advImages, setAdvImages] = useState([]);
    const [files, setFiles] = useState([]);

    const chooseImage = () => {
        hiddenFileInput.current.click();
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
            for (let file of files) {
                const form = new FormData();
                form.append("file", file);

                Queries.postAddImageToAdv(adv.data.id, form)
                    .then(() => navigate(window.location.pathname))
                    .catch((error) => alert(error));
            }

            closeForm();
        });
    };
    return (
        <S.CreateAdvBack>
            <S.FormWrapper>
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
                                <div key={index} onClick={chooseImage}>
                                    <S.UploadedImage url={advImages[index] || plug}></S.UploadedImage>
                                </div>
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
                        <MainButton active={title} onClick={createAdv}>
                            Опубликовать
                        </MainButton>
                    </div>
                </S.Form>
            </S.FormWrapper>
        </S.CreateAdvBack>
    );
}

export default CreateAdvForm;
