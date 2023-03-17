import styled from "styled-components";

export const EditBack = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
`;

export const FormWrapper = styled.div`
    width: 600px;
    border-radius: 12px;
    z-index: 1;
    background-color: #fff;
    padding: 20px 50px 42px 50px;
    margin: 20px 0;
`;

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    span {
        color: rgba(0, 0, 0, 0.3);
        margin-left: 10px;
    }
`;

export const UploadedImage = styled.div`
    width: 88px;
    height: 88px;
    cursor: pointer;
    background: ${({ url }) => `url(${url})`};
    background-size: cover;
    background-position: center;
`;

export const FormInputName = styled.input`
    padding: 13px 20px;
`;

export const FormInputDescription = styled.input`
    padding: 13px 20px 163px 20px;
`;

export const FormInputFile = styled.input`
    display: none;
`;

export const FormAdvImages = styled.div`
    display: flex;
    column-gap: 10px;
`;

export const FormInputPriceWrapper = styled.div`
    max-width: 200px;
    position: relative;

    ::after {
        content: "₽";
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const FormInputPrice = styled.input`
    width: 100%;
    padding: 13px 40px 13px 20px;
`;
