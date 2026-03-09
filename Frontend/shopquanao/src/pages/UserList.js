import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://api.lehuuminhquan.id.vn/users").then((res) => setUsers(res.data));
    }, []);

    return (
        <div>
            <h2>Danh sách Users</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/users/${user.id}`}>Xem</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
