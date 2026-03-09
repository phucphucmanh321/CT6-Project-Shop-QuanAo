import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://api.lehuuminhquan.id.vn/users/${id}`)
      .then(res => setUser(res.data));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Detail</h2>

      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserDetail;
