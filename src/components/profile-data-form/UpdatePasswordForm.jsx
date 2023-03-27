import { useState } from "react";
import MainButton from "../main-button/MainButton";
import * as S from "./styles";
import Queries from "../../services/queries.service";
import { checkActualAccessToken } from "../../utils/decorators";

function UpdatePasswordForm() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const updatePassword = (event) => {
        event.preventDefault();

        if (newPassword1 === newPassword2) {
            const body = {
                password_1: oldPassword,
                password_2: newPassword1,
            };

            Queries.putUpdatePassword(body)
                .then(() => {
                    alert("Пароль успешно изменен");

                    setOldPassword("");
                    setNewPassword1("");
                    setNewPassword2("");
                })
                .catch((error) => {
                    if (error.response.data.detail === "Incorrect password") alert("Неправильный старый пароль");
                });
        } else {
            alert("Значения в полях нового пароля не совпадают");
        }
    };

    return (
        <>
            <S.InputWrapper>
                <h3 style={{ margin: "14px 0 5px 0" }}>Сменить пароль</h3>
                <S.DataFormLabel htmlFor="old-password">Старый пароль</S.DataFormLabel>
                <S.DataFormInput
                    type="password"
                    name="old-password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                />
            </S.InputWrapper>
            <S.InputsNameBlock>
                <S.InputWrapper>
                    <S.DataFormLabel htmlFor="new-password">Новый пароль</S.DataFormLabel>
                    <S.DataFormInput
                        type="password"
                        name="new-password"
                        value={newPassword1}
                        onChange={(event) => setNewPassword1(event.target.value)}
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <S.DataFormLabel htmlFor="new-password-2">Новый пароль ещё раз</S.DataFormLabel>
                    <S.DataFormInput
                        type="password"
                        name="new-password-2"
                        value={newPassword2}
                        onChange={(event) => setNewPassword2(event.target.value)}
                    />
                </S.InputWrapper>
            </S.InputsNameBlock>

            <MainButton
                type="submit"
                active={oldPassword && newPassword1 && newPassword2}
                // onClick={updatePassword}
                onClick={(event) => checkActualAccessToken(updatePassword(event))}
            >
                Поменять пароль
            </MainButton>
        </>
    );
}

export default UpdatePasswordForm;
