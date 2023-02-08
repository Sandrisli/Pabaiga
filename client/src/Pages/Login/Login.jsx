import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Form } from "../../components/Form/Form";
import { UserContext } from "../../contexts/UserContextWrapper";


const LoginContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    justify-conent: center;
    height: 100vh;
    justify-content: center;
`;

const FormStyled = styled(Form)`
    max-width: 100%
    padding: 20px;
    width: 400px;
`;

const LinkStyled = styled(Link)`
    align-self:center;
`;

const FieldsetStyled = styled.fieldset`
    border: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: center;
`;

const ErrorStyled = styled.div`
color: red;
text-align: center;
`;

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] =useState('');
    const [isLoading, setIsLoading] =useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleLogin = () => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => {
            if (res.status === 401) {
                throw new Error('Incorrect password or login');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            setUser(data);
            setIsLoading(false);
            setError('');
            navigate('/');
        })
        .catch((e) => {
            setError(e.meesage);
            setIsLoading(false);
        })
        
}

    return (
        <LoginContainer>
            <FormStyled onSubmit={handleLogin}>
                <h1>Event Managament</h1>
                <FieldsetStyled disabled={isLoading}>
                    <Input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        disabled={isLoading}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        disabled={isLoading}
                    />
                    {error && <ErrorStyled>{error}</ErrorStyled>}
                    <Button >Login</Button>
                    <LinkStyled to="/register">Register</LinkStyled>
                </FieldsetStyled>
            </FormStyled>
        </LoginContainer>
    );
}