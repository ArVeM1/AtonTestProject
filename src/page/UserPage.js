import React, {useEffect} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import axios from "../axios";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const { id } = useParams();

    // Делаем запрос
    // Получаем нужного нам пользователя по его id
    useEffect(() => {
        axios
            .get(`/users/${id}`)
            .then((res) => {
                setData(res.data.data)
                setIsLoading(false)
            })
            .catch((err) => {
                alert("Error user page")
            })
    }, [])

    // Пока идет запрос, пользователю будет показана загрузка
    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation={'grow'}/>
            </div>
        )
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <Image width={200} height={200} src={data.avatar}/>
                </Col>
                <Col md={3}>
                    <Row>
                        <h2>{data.first_name} {data.last_name}</h2>
                        <div>{data.email}</div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default UserPage;