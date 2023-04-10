import React, {useEffect, useState} from 'react';
import {Spinner, Table, Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../redux/slices/users";
import UserItem from "../components/UserItem";
import {getPagesArrays} from "../utils/pages";
import "../styles/style.css"
import Notification from "../components/Notification";

const Home = () => {
    const dispatch = useDispatch()
    const {users} = useSelector((state) => state.users)
    const [page, setPage] = useState(1);
    let pageArray = getPagesArrays(users.items.total_pages);
    const [elapsedTime, setElapsedTime] = useState(null);
    const isUsersLoading = users.status === "loading";

    // При смене страницы будут подгруаться нужные нам данные
    useEffect(() => {
        const startTime = performance.now();
        dispatch(fetchUsers(page));
        const elapsedTime = performance.now() - startTime;
        setElapsedTime(elapsedTime);
    }, [page])

    // loader
    // Пока мы грузим пользователей, будет показана закгрузка
    if (isUsersLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation={'grow'}/>
            </div>
        )
    }
    // Скрытие уведомления
    setTimeout(() => {
        setElapsedTime(null)
    }, 5000)

    return (
        <>
            <Table striped bordered hover>

                <thead className="stick">
                <tr>
                    <th>id</th>
                    <th>Image</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Delete</th>
                    <th>Info</th>
                </tr>
                </thead>
                <tbody>
                {(isUsersLoading ? [...Array(5)] : users.items).data?.map((obj, id) =>
                    isUsersLoading ? (
                        <UserItem key={id} isLoading={true}/>
                    ) : (
                        <UserItem
                            key={obj.id}
                            id={obj.id}
                            avatar={obj.avatar}
                            email={obj.email}
                            firstName={obj.first_name}
                            lastName={obj.last_name}
                        />
                    )
                )}
                </tbody>
            </Table>
            <div className="mt-3 d-flex">
                <Pagination>
                    {pageArray.map(p =>
                        <Pagination.Item onClick={() => setPage(p)} key={p} active={p === page}>
                            {p}
                        </Pagination.Item>
                    )}
                </Pagination>
            </div>
            {elapsedTime && (
                <Notification message={`Данные получены за ${elapsedTime.toFixed(2)} мс`}/>
            )}
        </>
    );
};

export default Home;