import Login from "./Login";

const Navigation = () => {
  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
        <ul className="list-unstyled fs-5">

          <li className="m-3"><i className="mx-2 bi bi-house"></i>Home</li>
          <li className="m-3"><i className="mx-2 bi bi-eyeglasses"></i>Get Task Details</li>
          <li className="m-3"><i className="mx-2 bi bi-plus-square"></i>Create Task</li>
          <li className="m-3"><i className="mx-2 bi bi-pencil-square"></i>Update Task</li>
          <li className="m-3"><i className="mx-2 bi bi-trash3"></i>Delete Task</li>
          <li className="m-3"><i className="mx-2 bi bi-heart"></i>Favourite</li>
          <li className="m-3"><i className="mx-2 bi bi-person-square"></i>Profile</li>
          <li className="m-3"><i className="mx-2 bi bi-box-arrow-in-right"></i>Login Account</li>
          <li className="m-3"><i className="mx-2 bi bi-person-plus-fill"></i>Register Account</li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <Login />
      </div>

    </div>
  );
};

export default Navigation;