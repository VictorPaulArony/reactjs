import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

//useEffect – For Side Effects (e.g., API calls)
const UseEffectHook = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(users => setUsers(users))
    }, [])

    return (
        <div>
            <h1>UseEffectHook</h1>
            <h3>useEffect without async</h3>
            <ol>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ol>
        </div>

    );
}



export default UseEffectHook