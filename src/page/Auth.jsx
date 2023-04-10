import React, {useState} from 'react';
import {Container, Card, Form, Button, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE, USERS_ROUTE} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchRegister} from "../redux/slices/auth";
import Notification from "../components/Notification";

const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.auth)
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

// При клике у нас будет проверка на какой мы странице находимся и от этого будет зависить нужный нам запрос
    const click = async () => {
        const fields = {
            email,
            password
        }
        try {
            let data;
            if (isLogin) {
                data = await dispatch(fetchAuth(fields))
            } else {
                data = await dispatch(fetchRegister(fields))
            }
        } catch (e) {
            console.log(e)
        }
    }
    // если мы авторизованы, то нас автоматически перекинет на главную страницу
    if (isAuth) {
        navigate(USERS_ROUTE)
    }


    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            style={{marginTop: 20}}
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            style={{marginTop: 20}}
                            placeholder="Введите ваш пароль..."
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className="d-flex justify-content-between mt-3">
                            {isLogin ?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTER_ROUTE}
                                                           className="text-decoration-none">Зарегистрируйся!</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}
                                                           className="text-decoration-none">Войдите!</NavLink>
                                </div>}
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </Container>
        </>
    );
};

export default Auth;