import React, { useState } from "react";
import type { UserFormData } from "../types/Users";
import { createUser } from "../service/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const initialUser: UserFormData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    interface FormErrors {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }

    const [errors, setErrors] = useState<FormErrors>({});
    const [user, setUser] = useState<UserFormData>(initialUser);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!user.name) {
            newErrors.name = "Name is required";
        } else if (user.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!user.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!user.password) {
            newErrors.password = "Password is required";
        } else if (user.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!user.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (user.password !== user.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await createUser(user);
            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 1500,
            });
            setUser(initialUser);
            navigate("/"); // Navigate to login or home
        } catch (error: any) {
            toast.error(`${error.response?.data?.message || error.message}`, {
                position: "top-right",
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={submit}
                className="w-full max-w-sm rounded bg-white p-8 shadow-md"
            >
                <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>

                {/* Name */}
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 mb-1 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.name && <p className="mb-2 text-sm text-red-600">{errors.name}</p>}

                {/* Email */}
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 mb-1 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.email && <p className="mb-2 text-sm text-red-600">{errors.email}</p>}

                {/* Password */}
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 mb-1 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.password && <p className="mb-2 text-sm text-red-600">{errors.password}</p>}

                {/* Confirm Password */}
                <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={inputHandler}
                    placeholder="Confirm your password"
                    className="mt-1 mb-1 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.confirmPassword && <p className="mb-4 text-sm text-red-600">{errors.confirmPassword}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full rounded bg-green-600 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
