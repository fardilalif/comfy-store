import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("Account created successfully");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="REGISTER" />
        </div>
        <p className="text-center">
          Already a member?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>{" "}
        </p>
      </Form>
    </section>
  );
};
export default Register;
