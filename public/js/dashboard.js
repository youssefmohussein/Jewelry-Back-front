// Handle Edit Role
function editRole(userId) {
    const newRole = prompt("Enter new role (admin/customer):");
    if (newRole && (newRole === 'admin' || newRole === 'customer')) {
        fetch(`/dashboard/users/${userId}/edit`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: newRole }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Role updated successfully');
            location.reload(); // Reload the page to see the updated roles
        })
        .catch(err => {
            alert('Error updating role');
        });
    } else {
        alert("Invalid role");
    }
}

// Handle Delete User
function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`/dashboard/users/${userId}/delete`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert('User deleted successfully');
            location.reload(); // Reload the page to remove the deleted user
        })
        .catch(err => {
            alert('Error deleting user');
        });
    }
}
