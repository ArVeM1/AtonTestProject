import React from 'react';
import {useDispatch} from "react-redux";
import {fetchRemoveUser} from "../redux/slices/users";
import {Button, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {USER_ROUTE} from "../utils/consts";

const UserItem = ({id, avatar, email, firstName, lastName}) => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    // Удаление пользователя
    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить человека?')) {
            dispatch(fetchRemoveUser(id));
        }
    };

    return (
        <tr className="text-center">
            <td>{id}</td>
            <td><Image width={150} height={150} src={avatar} alt="id"/></td>
            <td>{email}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td><Button onClick={onClickRemove}>Delete</Button></td>
            <td><Button onClick={() => navigate(USER_ROUTE + '/' + id)}>Info</Button></td>
        </tr>
    );
};

export default UserItem;