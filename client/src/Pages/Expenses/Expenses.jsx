import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { UserContext } from '../../contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';


const ExpensesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

const ExpensesListItem = styled.li`
<align-items: center;
border-radius: 10px
box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
display: flex;
justify-content: space-between;
padding: 10px 30px;
`;

const HoverOverlay = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
`;

const HoverOverlayContent = styled.div`
    color: orangered;
    font-size: 20px;
    font-weight: 800;
`;

const ExpenseListItem = styled.li`
    align-items: center;
    background: rgb(221,241,240);
    background: linear-gradient(0deg, rgba(221,241,240,0.9864320728291317) 47%, rgba(70,252,189,1) 100%);
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin-top: 10px ;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;
    

    ${HoverOverlay} {
        visibility: hidden;
    }
    &:hover {
        ${HoverOverlay} {
            visibility: visible;
    }
}
`;

const FormStyled = styled.form`
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
 `;

const ExpensesSpan = styled.span`
    color: #979cb0;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

    export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setExpenses(data);
                }
                setIsLoading(false);
            });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

const handleExpenseAdd = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admin`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            surname,
            email,
            password,
            userId: user.id
        })
    })
    .then((res) => res.json())
    .then((data) => {
        setExpenses(data);
        setName('');
        setSurname('');
        setPhone('')
        setEmail('');
        
    });
}

const handleDeleteExpense = (id) => {
    if (window.confirm('Do you want to delete ?')) {
        fetch(`${process.env.REACT_APP_API_URL}/expendes/${id}`, {
            method: 'DELETE', 
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
        .then((res) => res.json())
        .then(data => {
            setExpenses(data);
        });
    }
    }

return(
    <ExpensesList>
        <FormStyled onSubmit={handleExpenseAdd}>
            <Input
                 placeholder="name"
                 required
                 onChange={(e) => setName(e.target.value)}
                 value={name}
            />
            <Input
                placeholder="surname"
                required
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
            />
            <Input placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <Input
                placeholder="phone"
                type="number"
                required
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
            />
            <Button>Add</Button>
        </FormStyled>
        {expenses.map((att) => (
                <ExpensesListItem key={att.id} onClick={() => handleDeleteExpenses(att.id)}>
                    <HoverOverlay>
                        <HoverOverlayContent>DELETE</HoverOverlayContent>
                    </HoverOverlay>
                    <span>Name: {att.name}</span>
                    <span>Surname: {att.surname}</span>
                    <span>Email: {att.email}</span>
                    <span>Phone: {att.phone}</span>
                </ExpensesListItem>    
            ))}
             </ExpensesList>
    );
  
}    