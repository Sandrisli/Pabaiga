import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";

const RegisterContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    justify-conent: right;
    height: 100vh;
    justify-content: right;
`;

const FormStyled = styled(Form)`
    
    padding: 20px;
    width: 400px;
    background-color: purple;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: right;
`;


const LinkStyled = styled(Link)`
    align-self: right;
`;


const ErrorStyled = styled.div`
color: red;
text-align: center;
`;


export const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })
        })
        .then((res) => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }

            if (!res.ok ) {
                throw new Error('Something went wrong');
            }
            
            return res.json();
        })
        .then((data) => {
            navigate('/login');
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.meesage);
            setIsLoading(false);
        })
    };

    return (
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister} disabled={isLoading}>
                
                <h1>Event Managament register</h1>

                    <Input
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <Input
                        placeholder="Surname"
                        onChange={(e) => setSurname(e.target.value)}
                        value={surname}
                        required
                    />
                    <Input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    {error && <ErrorStyled>{error}</ErrorStyled>}
                    <Button>Register</Button>
                    <LinkStyled to="/login">Login</LinkStyled>
                </FormStyled>
        </RegisterContainer>
    );
}