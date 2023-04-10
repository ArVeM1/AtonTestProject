import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import Notification from "../Notification";

const CreateUser = ({show, onHide, create}) => {

    const [user, setUser] = useState({firstName: '', lastName: '', age: 0})
    // Вписываем данные с формы и отправляем данные наверх
    // Скрываем модальное окно
    const addNewUser = () => {
        const newUser = {
            ...user,
            id: Date.now()
        }
        create(newUser)
        setUser({firstName: '', lastName: '', age: 0})
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить нового пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите имя"}
                        value={user.firstName}
                        onChange={e => setUser({...user, firstName: e.target.value})}
                    />
                    <Form.Control
                        placeholder={"Введите фамилию"}
                        className="mt-3"
                        value={user.lastName}
                        onChange={e => setUser({...user, lastName: e.target.value})}
                    />
                    <Form.Control
                        placeholder={"Введите возраст"}
                        className="mt-3"
                        type="number"
                        value={user.age}
                        onChange={e => setUser({...user, age: +e.target.value})}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addNewUser}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUser;