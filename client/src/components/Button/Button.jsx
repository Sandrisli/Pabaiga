import styled from "syled-components";

const ButtonStyled = styled.button`
    background-color: ae6191; 
    border: 1px solid E04F80;
    border-radius: 12px;
    color:  f592cf; 
    font-size: 16px;
    padding: 10px 20px;

    &:disabled {
        opacity: 0.5;    }
`;


export const Button = (props) => {
    return <ButtonStyled {...props} />
}