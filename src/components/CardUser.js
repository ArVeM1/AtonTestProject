import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import UpdateUser from "./modals/UpdateUser";

const CardUser = ({deleteItem, editItem, user, id}) => {
    const [editVisible, setEditVisible] = useState(false)

    return (
        <>

            <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Age: {user.age}</Card.Subtitle>
                <Button onClick={() => setEditVisible(true)}>Edit</Button>
                <UpdateUser
                    onEdit={editItem}
                    index={id}
                    show={editVisible}
                    onHide={() => setEditVisible(false)}
                />
                <Button
                    className="m-lg-2"
                    variant={"danger"}
                    onClick={() => deleteItem(user)}
                >
                    Delete</Button>
            </Card.Body>


        </>
    );
};

export default CardUser;