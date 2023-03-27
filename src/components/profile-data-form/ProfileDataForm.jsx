import { useEffect, useRef, useState } from "react";
import MainButton from "../main-button/MainButton";
import * as S from "./styles";
// import mockAvatarMen from "../assets/static/mockAvatarMen.jpg";
// import mockAvatarWomen from '../../assets/static/mockAvatarWomen.jpg';
import Queries from "../../services/queries.service";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/actions/creators/main";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { checkActualAccessToken } from "../../utils/decorators";

function ProfileDataForm() {
    const dispatch = useDispatch();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    const hiddenFileInput = useRef();

    const [name, setName] = useState(currentUser.name);
    const [surname, setSurname] = useState(currentUser.surname);
    const [city, setCity] = useState(currentUser.city);
    const [phone, setPhone] = useState(currentUser.phone);
    const [avatar, setAvatar] = useState(currentUser.avatar);
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

    const fileInputClick = () => {
        hiddenFileInput.current.click();
    };

    const uploadAvatar = () => {
        const fileUploaded = hiddenFileInput.current.files[0];

        const form = new FormData();
        form.append("file", fileUploaded);

        Queries.postUploadAvatar(form)
            .then((user) => {
                localStorage.setItem("user", JSON.stringify(user.data));
                setAvatar(user.data.avatar);
            })
            .catch((error) => alert(error));
    };

    useEffect(() => {
        setActiveButton(checkNewUserData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            dispatch(logIn(user.data));
            setActiveButton(false);
        });
    }

    return (
        <S.DataForm>
            <S.AvatarWrapper>
                <S.Avatar url={avatar} />
                <S.ChangeAvatarBtn type="button" onClick={fileInputClick}>
                    Заменить
                </S.ChangeAvatarBtn>
                <S.DataFormInputFile
                    type="file"
                    name="avatar"
                    accept="image/*"
                    ref={hiddenFileInput}
                    onChange={() => checkActualAccessToken(uploadAvatar())}
                />
            </S.AvatarWrapper>
            <S.TextData>
                <S.InputsNameBlock>
                    <S.InputWrapper>
                        <S.DataFormLabel htmlFor="first-name">Имя</S.DataFormLabel>
                        <S.DataFormInput
                            placeholder="Имя"
                            type="text"
                            name="first-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </S.InputWrapper>
                    <S.InputWrapper>
                        <S.DataFormLabel htmlFor="last-name">Фамилия</S.DataFormLabel>
                        <S.DataFormInput
                            placeholder="Фамилия"
                            type="text"
                            name="last-name"
                            value={surname}
                            onChange={(event) => setSurname(event.target.value)}
                        />
                    </S.InputWrapper>
                </S.InputsNameBlock>

                <S.InputWrapper>
                    <S.DataFormLabel htmlFor="city">Город</S.DataFormLabel>
                    <S.DataFormInput
                        placeholder="Город"
                        type="text"
                        name="city"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.DataFormLabel htmlFor="phone">Телефон</S.DataFormLabel>
                    <S.DataFormInput
                        placeholder="Номер телефона"
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </S.InputWrapper>

                <MainButton
                    type="submit"
                    active={activeButton}
                    onClick={(event) => checkActualAccessToken(updateUser(event))}
                >
                    Сохранить
                </MainButton>

                <UpdatePasswordForm />
            </S.TextData>
        </S.DataForm>
    );
}

export default ProfileDataForm;
