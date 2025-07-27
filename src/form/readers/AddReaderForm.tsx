import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createReader } from "../../service/readerService";
import type { ReaderFormData } from "../../types/Readers";

const AddReader = () => {
    // for loading ui
    // const [loading, setLoading] = useState(false);

    const initialReader: ReaderFormData = {
        name: "",
        email: "",
        phone: "",
        address: "",
        memberShipId: "",
    };

    const [reader, setReader] = useState<ReaderFormData>(initialReader);

    const navigate = useNavigate();

    const validate = (data: ReaderFormData) => {
        const errors: string[] = [];

        // Name: Required, min length, only letters & spaces allowed
        if (!data.name.trim()) {
            errors.push("Name is required");
        } else if (data.name.length < 3) {
            errors.push("Name must be at least 3 characters");
        } else {
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(data.name)) {
                errors.push("Name can only contain letters and spaces");
            }
        }

        // Email: Required + format
        if (!data.email.trim()) {
            errors.push("Email is required");
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                errors.push("Email is invalid");
            }
        }

        // Phone: Required, 10 digits only (no letters)
        if (!data.phone.trim()) {
            errors.push("Phone number is required");
        } else {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(data.phone)) {
                errors.push("Phone number must be exactly 10 digits and numbers only");
            }
        }

        // Address: Required + min length
        if (!data.address.trim()) {
            errors.push("Address is required");
        } else if (data.address.length < 5) {
            errors.push("Address must be at least 5 characters");
        }

        // Membership ID: Required
        if (!data.memberShipId.trim()) {
            errors.push("Membership ID is required");
        }

        return errors;
    };

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReader({ ...reader, [name]: value });
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ✅ Validate before submitting
        const errors = validate(reader);
    if (errors.length > 0) {
        toast.error(
            <div className="text-sm">
                <ul className="list-disc pl-5">
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            </div>,
            {
                position: "top-right",
                duration: 6000,
                style: {
                    background: "#1f1f1f",
                    color: "#fff",
                    maxWidth: "400px",
                    whiteSpace: "pre-line",
                },
            },
        );
        return;
    }
        try {
            const response = await createReader(reader);
            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 1500,
            });

            setReader(initialReader); // reset form
            navigate("/admin-dashboard/readers"); // redirect to home
        } catch (error: any) {
            console.error("Failed to create reader:", error);
            toast.error(`${error.response?.data?.message || error.message}`, {
                position: "top-right",
                duration: 3000,
            });
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-green-100 px-4">
            <div className="w-full max-w-md rounded-[10px] border border-green-200 bg-white/90 p-8 shadow-2xl backdrop-blur-md">
                <Link
                    to="/admin-dashboard/readers"
                    className="mb-4 flex items-center"
                >
                    <Button className="mb-5 bg-green-700 hover:bg-green-600">
                        <i className="fa-solid fa-backward mr-2"></i> Back
                    </Button>
                </Link>

                <h3 className="mb-6 text-center text-2xl font-semibold text-green-800 uppercase">Add New Reader</h3>

                <form
                    className="space-y-4"
                    onSubmit={submitForm}
                >
                    <div>
                        <Label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-green-900"
                        >
                            Name
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={reader.name}
                            onChange={inputHandler}
                            placeholder="Enter name"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-green-900"
                        >
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={reader.email}
                            onChange={inputHandler}
                            placeholder="Enter Email"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="phone"
                            className="mb-3 block text-sm font-medium text-green-900"
                        >
                            Phone Number
                        </Label>
                        <Input
                            type="number"
                            id="phone"
                            name="phone"
                            value={reader.phone}
                            onChange={inputHandler}
                            placeholder="Enter phone number"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="address"
                            className="mb-3 block text-sm font-medium text-green-900"
                        >
                            Address
                        </Label>
                        <Input
                            type="text"
                            id="address"
                            name="address"
                            value={reader.address}
                            onChange={inputHandler}
                            autoComplete="off"
                            placeholder="Enter Address"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="membershipId"
                            className="mb-3 block text-sm font-medium text-green-900"
                        >
                            Membership ID
                        </Label>
                        <Input
                            type="text"
                            id="memberShipId"
                            name="memberShipId"
                            value={reader.memberShipId}
                            onChange={inputHandler}
                            placeholder="Enter Membership ID"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-md bg-green-600 py-2 text-white transition duration-200 hover:bg-green-700"
                    >
                        Add Reader
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddReader;
