import React, { useEffect, useState } from 'react';
import UserTile from './UserTile';
import DetailsButton from './DetailsButton';

function List() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/auth/getEmployee') // Replace with your backend URL
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching user data:', error));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Details</h1>
            {users.length > 0 ? (
                users.map((users) => <UserTile key={users.id} User={users} />)
            ) : (
                <p>Loading user details...</p>
            )}
                <DetailsButton child={"Add Employee"} to={"/"}/>

        </div>
    );
}

export default List;
