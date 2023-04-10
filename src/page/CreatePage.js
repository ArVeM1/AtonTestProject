import React, {useState} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import CreateUser from "../components/modals/CreateUser";
import CardUser from "../components/CardUser";
import Notification from "../components/Notification";

const CreatePage = () => {
    const [userVisible, setUserVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [visibleNotification, setVisibleNotification] = useState(false);
    const [messageNotification, setMessageNotification] = useState('');
    // Получаем данные модального окна и сохраняем объект в массив
    const createUser = (newUser) => {
        setUsers([...users, newUser])
        setVisibleNotification(true)
        setMessageNotification(`Данные сохранены. ID: ${newUser.id}`)
    }
    // Получаем данные модального окна и проходимся filter по массиву и убираем из него нужный объект
    const deleteUser = (user) => {
        setUsers(users.filter(u => u.id !== user.id))
        setVisibleNotification(true)
        setMessageNotification(`Данные удалены`)
    }
    // Получаем данные модального окна и редактируем объект в массиве
    const handleEdit = (index, newData) => {
        const updatedData = [...users];
        updatedData[index] = newData;
        setUsers([...updatedData])
        setVisibleNotification(true)
        setMessageNotification(`Данные обновлены`)
    }

    // Скрываем уведомление
    setTimeout(() => {
        setVisibleNotification(false)
    }, 1000)


    return (
        <Container className="d-flex flex-column">
            <Button
                className="mt-3 p-2"
                onClick={() => setUserVisible(true)}
            >
                Create User</Button>
            <CreateUser
                show={userVisible}
                onHide={() => setUserVisible(false)}
                create={createUser}
            />

            <div className="d-flex flex-wrap justify-content-center">
                {users.map((item, id) =>
                    <Card style={{width: '18rem'}} key={item.id} className="m-3">
                        <CardUser

                            id={id}
                            user={item}
                            deleteItem={deleteUser}
                            editItem={handleEdit}
                        />
                    </Card>
                )}
            </div>

            {visibleNotification && (
                <Notification message={messageNotification}/>
            )}
        </Container>
    );
};

export default CreatePage;