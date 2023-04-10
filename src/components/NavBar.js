import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {CREATE_ROUTE, LOGIN_ROUTE, USERS_ROUTE} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../redux/slices/auth";

const NavbarComp = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.auth)

    // При первом рендере будет происходить проверка на авторизован пользователь или нет
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(login())
        } else {
            dispatch(logout())
        }
    }, [])
    // Выход из аккаунта
    const onClickLogout = () => {
        if (window.confirm("Вы действительно хотите выйти?")) {
            dispatch(logout());
            window.localStorage.removeItem("token");
            navigate(LOGIN_ROUTE)
        }
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink
                    style={{color: "white", textDecoration: 'none'}}
                    to={USERS_ROUTE}
                >
                    ATON</NavLink>
                {isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant={"outline-light"}
                            style={{marginLeft: "20px"}}
                            onClick={() => navigate(CREATE_ROUTE)}
                        >
                            Создать пользователей</Button>
                        <Button
                            variant={"outline-light"}
                            style={{marginLeft: "20px"}}
                            onClick={onClickLogout}
                        >
                            Выйти</Button>
                    </Nav> :
                    <Nav className="ml-auto">
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >Авторизация</Button>
                    </Nav>
                }

            </Container>
        </Navbar>
    )
};

export default NavbarComp;