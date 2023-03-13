import React, { useEffect, useRef, useState } from "react";
import MainButton from "../main-button";
import * as S from "./styles";
// import mockAvatarMen from "../assets/static/mockAvatarMen.jpg";
// import mockAvatarWomen from '../../assets/static/mockAvatarWomen.jpg';
import Queries from "../../services/queries.service";

function ProfileDataForm() {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const formRef = useRef();
    const hiddenFileInput = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const cityRef = useRef();
    const phoneRef = useRef();

    const [name, setName] = useState(currentUser.name);
    const [surname, setSurname] = useState(currentUser.surname);
    const [city, setCity] = useState(currentUser.city);
    const [phone, setPhone] = useState(currentUser.phone);

    const [activeButton, setActiveButton] = useState(false);
    const checkNewUserData = () => {
        for (let el in newUserData) {
            if (newUserData[el] !== currentUser[el]) {
                return true;
            }
        }
        return false;
    };

    const newUserData = {
        name: name,
        surname: surname,
        city: city,
        phone: phone,
    };

    const [avatarSrc, setAvatarSrc] = useState(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = () => {
        const fileUploaded = hiddenFileInput.current.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(fileUploaded);

        let obj;
        reader.onload = () => {
            obj = reader.result;
            console.log("resultl", reader.result);
        };

        const obj2 = URL.createObjectURL(fileUploaded);

        const body = {
            avatar: obj2,
        };

        Queries.postUploadAvatar(body).then(() => {
            console.log("obj", obj);
        });
        setAvatarSrc(obj2);
    };

    useEffect(() => {
        setActiveButton(checkNewUserData);
    }, [newUserData]);

    function updateUser(event) {
        event.preventDefault();

        const body = {
            name: name,
            surname: surname,
            city: city,
            phone: phone,
        };

        Queries.patchCurrentUser(body).then((user) => {
            localStorage.setItem("user", JSON.stringify(user.data));
            setActiveButton(false);
        });
    }

    return (
        <S.DataForm ref={formRef}>
            <S.AvatarWrapper>
                <S.Avatar url={avatarSrc} />
                <S.ChangeAvatarBtn type="button" onClick={handleClick}>
                    Заменить
                </S.ChangeAvatarBtn>
                <S.DataFormInputFile
                    type="file"
                    name="avatar"
                    accept="image/*"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                />
            </S.AvatarWrapper>
            <S.TextData>
                <S.InputsNameBlock>
                    <S.InputWrapper>
                        <S.DataFormLabel htmlFor="first-name" ref={nameRef}>
                            Имя
                        </S.DataFormLabel>
                        <S.DataFormInput
                            placeholder="Имя"
                            type="text"
                            name="first-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            // onFocus={() => nameRef.current.focus()}
                            // onBlur={() => nameRef.current.blur()}
                        />
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <S.DataFormLabel htmlFor="last-name" ref={surnameRef}>
                            Фамилия
                        </S.DataFormLabel>
                        <S.DataFormInput
                            placeholder="Фамилия"
                            type="text"
                            name="last-name"
                            value={surname}
                            onChange={(event) => setSurname(event.target.value)}
                            // onFocus={() => surnameRef.current.focus()}
                            // onBlur={() => surnameRef.current.blur()}
                        />
                    </S.InputWrapper>
                </S.InputsNameBlock>

                <S.InputWrapper>
                    <S.DataFormLabel htmlFor="city" ref={cityRef}>
                        Город
                    </S.DataFormLabel>
                    <S.DataFormInput
                        placeholder="Город"
                        type="text"
                        name="city"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        // onFocus={() => cityRef.current.focus()}
                        // onBlur={() => cityRef.current.blur()}
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.DataFormLabel htmlFor="phone" ref={phoneRef}>
                        Телефон
                    </S.DataFormLabel>
                    <S.DataFormInput
                        placeholder="Номер телефона"
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        // onFocus={() => phoneRef.current.focus()}
                        // onBlur={() => phoneRef.current.blur()}
                        // onMouseEnter={() => phoneRef.current.focus()}
                        // onMouseLeave={() => phoneRef.current.blur()}
                    />
                </S.InputWrapper>
                <div>
                    <MainButton type="submit" active={activeButton} onClick={updateUser}>
                        Сохранить
                    </MainButton>
                </div>
            </S.TextData>
        </S.DataForm>
    );
}

export default ProfileDataForm;
