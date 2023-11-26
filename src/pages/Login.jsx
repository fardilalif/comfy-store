import { useDispatch } from "react-redux";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, SubmitBtn } from "../components";
import { loginUser } from "../features/user/userSlice.js";
import { customFetch } from "../utils/index.jsx";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("Login successfully");
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("Welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error. please try again");
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="LOGIN" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          GUEST USER
        </button>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};
export default Login;
