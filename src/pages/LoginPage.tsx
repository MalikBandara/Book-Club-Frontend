import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/authService.ts";
import { useAuth } from "../context/useAuth.ts";
import toast from "react-hot-toast";
import { Shield, Mail, Lock, Library } from "lucide-react";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { login: authenticate } = useAuth();

    const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const loginResponse = await loginUser(formData);
                if (loginResponse !== null) {
                    toast.success("Login successfully");
                    authenticate(loginResponse.accessToken);
                    navigate("/admin-dashboard");
                }
            } catch (error) {
                toast.error("Login failed. Please check your credentials.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-green-100 px-3 py-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-600/10"></div>
            <div className="relative w-full max-w-sm space-y-4">
                <div className="rounded-xl border border-green-200/50 bg-white/80 p-6 shadow-2xl backdrop-blur-md">
                    <div className="text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
                            <Library className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="bg-gray-600 bg-clip-text font-serif text-4xl text-transparent">Admin Login</h2>
                        <p className="mt-1 text-xs text-gray-600">Sign in to your staff account</p>
                    </div>
                    <form
                        className="mt-6 space-y-4"
                        onSubmit={handleSubmit}
                    >
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
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`block w-full rounded-lg border py-2.5 pr-3 pl-9 transition-all duration-200 ${
                                        errors.email
                                            ? "border-yellow-300 bg-red-50/50 focus:border-yellow-500 focus:ring-yellow-500"
                                            : "border-gray-200 bg-green-50/50 focus:border-gray-500 focus:ring-gray-500"
                                    } focus:ring-opacity-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
                        </div>

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
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`block w-full rounded-lg border py-2.5 pr-3 pl-9 transition-all duration-200 ${
                                        errors.password
                                            ? "border-yellow-300 bg-red-50/50 focus:border-yellow-500 focus:ring-yellow-500"
                                            : "border-gray-200 bg-green-50/50 focus:border-gray-500 focus:ring-gray-500"
                                    } focus:ring-opacity-50 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-1 focus:outline-none`}
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-xs font-medium text-red-600">{errors.password}</p>}
                        </div>

                        <div className="pt-3">
                            <button
                                type="submit"
                                className="group relative flex w-full transform justify-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-green-800 hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <Shield className="mr-2 h-4 w-4" />
                                Sign in to Admin Panel
                            </button>
                        </div>

                        <div className="border-t border-green-200 pt-4 text-center">
                            <p className="text-xs text-gray-700">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-gray-600 transition duration-200 hover:text-gray-800 hover:underline focus:underline focus:outline-none"
                                >
                                    Create new account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
