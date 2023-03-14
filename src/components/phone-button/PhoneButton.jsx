import { useState } from "react";
import * as S from "./styles";

const PhoneButton = ({ user }) => {
    const [phoneVisibility, setPhoneVisibility] = useState(false);

    if (user.phone) {
        return phoneVisibility ? (
            <S.PhoneButton>
                <span>{`${user?.phone.slice(0, 1)} ${user?.phone.slice(1, 4)} ${user?.phone.slice(4)}`}</span>
            </S.PhoneButton>
        ) : (
            <S.PhoneButton onClick={() => setPhoneVisibility(true)}>
                <span>Показать телефон</span>
                <span>{`${user?.phone.slice(0, 1)} ${user?.phone.slice(1, 4)} ХХХ ХХ ХХ`}</span>
            </S.PhoneButton>
        );
    }
};

export default PhoneButton;
