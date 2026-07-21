import { useEffect, useState } from "react";
import { getUsers } from "../firebase/db";
import "./AdminPage.css";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function UserTable({ users }) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Last login</th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <tr key={u.uid}>
            <td>{u.email}</td>
            <td>{u.displayName ?? "—"}</td>
            <td>{u.lastLogin?.toDate?.().toLocaleString("en-GB") ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminPage({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) getUsers().then(setUsers);
  }, [user]);

  if (user?.email !== ADMIN_EMAIL) {
    return <div className="admin-page"><p className="admin-denied">Access denied.</p></div>;
  }

  return (
    <div className="admin-page">
      <h1>Registered users ({users.length})</h1>
      <UserTable users={users} />
    </div>
  );
}
