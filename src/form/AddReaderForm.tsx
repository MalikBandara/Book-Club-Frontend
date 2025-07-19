import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createReader } from "../service/readerService";
import type { ReaderFormData } from "../types/Readers";

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

    const [reader, setReader] = useState(initialReader);

    const navigate = useNavigate();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReader({ ...reader, [name]: value });
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createReader(reader);
            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 3000,
            });

            setReader(initialReader); // reset form
            navigate("/admin-dashboard/readers"); // redirect to home
        } catch (error: any) {
            console.error("Failed to create reader:", error);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-sky-50 px-4">
            <div className="w-full max-w-md rounded-[10px] bg-white p-8 shadow-lg">
                <Link
                    to="/admin-dashboard/readers"
                    className="mb-4 flex items-center"
                >
                    <Button className="mb-5 bg-gray-600 hover:bg-gray-500">
                        <i className="fa-solid fa-backward mr-2"></i> Back
                    </Button>
                </Link>

                <h3 className="mb-6 text-center text-2xl font-semibold text-gray-800 uppercase">Add New Reader</h3>

                <form
                    className="space-y-4"
                    onSubmit={submitForm}
                >
                    <div>
                        <Label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
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
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
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
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="phone"
                            className="mb-3 block text-sm font-medium text-gray-700"
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
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="address"
                            className="mb-3 block text-sm font-medium text-gray-700"
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
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="membershipId"
                            className="mb-3 block text-sm font-medium text-gray-700"
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
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-md bg-sky-500 py-2 text-white transition duration-200 hover:bg-sky-600"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddReader;
