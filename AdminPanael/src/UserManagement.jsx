import React from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Viewer" },
];

function UserManagement() {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>USER MANAGEMENT</h3>
      </div>

      <div className='user-table-container'>
        <table className='user-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className='action-btn edit'><BsPencilSquare /></button>
                  <button className='action-btn delete'><BsTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default UserManagement;
