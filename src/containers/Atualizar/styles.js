import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
        margin: 50px 0 15px 0;
    }

    form {
        display: flex;
        flex-direction: column;
    }
`

export const Label = styled.label`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: -0.03em;
    color: #7C7C7C;
    margin-bottom: 6px;
    margin-top: 25px;
`
export const Input = styled.input`
    width: 425px;
    height: 36px;
    padding: 15px;
    background: #F9F9F9;
    border: ${props => props.error ? '2px solid #FA982F' : '1px solid #E6E6E6'};
    box-sizing: border-box;
    border-radius: 3px;

    &::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 120%;
        letter-spacing: -0.03em;
        color: #A2A2A2;
    }
`

export const ErrorMessage = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 120%;
    letter-spacing: -0.03em;
    color: #F54A48;
    margin: 10px 0;
`

export const Button = styled.button`
    width: 425px;
    height: 37px;
    background: #D55112;
    border-radius: 3px;
    border: none;
    margin-top: 50px;
    margin-bottom: 50px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.6;
    }
`
