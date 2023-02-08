import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import styled from 'styled-components';
import { Button } from "../Button/Button";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";

//cl
const Header = styled.div`
    padding: 10px;
    background-color: lightgreen;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const PageLayout = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" />
    }

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
        setUser(null);
        navigate('/login'); 
    }

    return (
        <div>
            <Header>
                <Button onClick={handleLogout}>Log out</Button>
                <h1>Events</h1>
            </Header>
            <Outlet />
        </div>
    )
};
