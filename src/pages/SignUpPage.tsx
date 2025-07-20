import React, { useState } from "react";
import type { UserFormData } from "../types/Users";
import { createUser } from "../service/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// create initial state for user form
// create useState for user form
// add name and value for input fields
// create inputHandler function to handle input changes
// and create submit function and call other functions using this

const SignupPage = () => {
    const initialUser: UserFormData = {
        name: "",
        email: "",
        password: "",
    };

    const [user, setUser] = useState<UserFormData>(initialUser);

    const navigate = useNavigate();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("User data submitted:", user);

        try {
            const response = await createUser(user);
            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 1500,
            });
            setUser(initialUser);
            navigate("/"); // redirect to login page after successful signup
        } catch (error: any) {
            toast.error(`${error.response?.data?.message || error.message}`, {
                position: "top-right",
                duration: 3000,
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={submit}
                className="w-full max-w-sm rounded bg-white p-8 shadow-md"
            >
                <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>

                <label
                    htmlFor="name"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Full Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={inputHandler}
                    placeholder="John Doe"
                    className="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={inputHandler}
                    placeholder="you@example.com"
                    className="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <label
                    htmlFor="password"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={inputHandler}
                    placeholder="Enter your password"
                    className="mb-6 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <button
                    type="submit"
                    className="w-full rounded bg-green-600 py-2 text-white transition hover:bg-green-700"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
