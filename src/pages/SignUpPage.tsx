import React, { useState } from "react";
import type { UserFormData } from "../types/Users";
import { createUser } from "../service/userService";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, UserPlus, UserCircle } from "lucide-react";

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
        if (!user.name) newErrors.name = "Name is required";
        else if (user.name.length < 2) newErrors.name = "Name must be at least 2 characters";

        if (!user.email) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) newErrors.email = "Please enter a valid email address";

        if (!user.password) newErrors.password = "Password is required";
        else if (user.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (!user.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
        else if (user.password !== user.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await createUser(user);
            toast.success(`${response.message}`, { position: "top-right", duration: 1500 });
            setUser(initialUser);
            navigate("/");
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
        <div className="flex min-h-screen items-center justify-center bg-green-50 px-3 py-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-600/10"></div>
            <div className="relative w-full max-w-sm space-y-4">
                <div className="rounded-xl border border-green-200/50 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
                    <div className="text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
                            <UserCircle className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-2xl font-extrabold text-transparent">
                            Create Account
                        </h2>
                        <p className="mt-1 text-xs text-gray-600">create an account and get started today</p>
                    </div>

                    <form
                        onSubmit={submit}
                        className="mt-6 space-y-4"
                    >
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block text-xs font-semibold text-gray-800"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={inputHandler}
                                    placeholder="Enter your full name"
                                    className={`block w-full rounded-lg border py-2.5 pr-3 pl-10 transition-all duration-200 ${
                                        errors.name
                                            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500"
                                            : "border-gray-200 bg-green-50/50 focus:border-green-500 focus:ring-green-500"
                                    } focus:ring-opacity-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none`}
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-xs font-semibold text-gray-800"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={inputHandler}
                                    placeholder="Enter your email"
                                    className={`block w-full rounded-lg border py-2.5 pr-3 pl-10 transition-all duration-200 ${
                                        errors.email
                                            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500"
                                            : "border-gray-200 bg-green-50/50 focus:border-green-500 focus:ring-green-500"
                                    } focus:ring-opacity-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none`}
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-xs font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={inputHandler}
                                    placeholder="Create a password"
                                    className={`block w-full rounded-lg border py-2.5 pr-3 pl-10 transition-all duration-200 ${
                                        errors.password
                                            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500"
                                            : "border-gray-200 bg-green-50/50 focus:border-green-500 focus:ring-green-500"
                                    } focus:ring-opacity-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none`}
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs font-medium text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1 block text-xs font-semibold text-gray-800"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={inputHandler}
                                    placeholder="Confirm your password"
                                    className={`block w-full rounded-lg border py-2.5 pr-3 pl-10 transition-all duration-200 ${
                                        errors.confirmPassword
                                            ? "border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500"
                                            : "border-gray-200 bg-green-50/50 focus:border-green-500 focus:ring-green-500"
                                    } focus:ring-opacity-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="mt-1 text-xs font-medium text-red-600">{errors.confirmPassword}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3">
                            <button
                                type="submit"
                                className="group relative flex w-full transform justify-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:from-green-600 hover:to-green-700 hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                disabled={loading}
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                {loading ? "Creating Account..." : "Create Account"}
                            </button>
                        </div>

                        <div className="border-t border-green-200 pt-4 text-center">
                            <p className="text-xs text-gray-700">
                                Already have an account?{" "}
                                <Link
                                    to="/"
                                    className="font-semibold text-green-600 transition duration-200 hover:text-green-800 hover:underline focus:underline focus:outline-none"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
