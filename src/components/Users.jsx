import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const loadedUsers = use(usersPromise);
  const [users, setUsers] = useState(loadedUsers)
  console.log(loadedUsers);

  const handleAddUser = (e) => {
    e.preventDefault()
    const password = e.target.password.value;
    const email = e.target.email.value;
    const user ={password, email}
    console.log(user);

    fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log("data after post", data);
        const newUsers = [...users, data]
        setUsers(newUsers)
        e.target.reset()
        
    })
    
  }

  const handleDelete = () => {
    
  }

  return (
    <div>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <form onSubmit={handleAddUser} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50"
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center text-gray-600">
              Don't have an account yet?
              <a
                rel="noopener noreferrer"
                href="#"
                className="hover:underline text-violet-600"
              >
                Sign up
              </a>
              .
            </p>
          </div>
        </form>
      </div>
      <div>
        Users : {users.length}
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <button onClick={handleDelete} className="btn bg-blue-400">X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
