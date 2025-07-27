import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getReaderById, updateEXReader } from "../../service/readerService";
import type { ReaderFormData } from "../../types/Readers";

const updateReader = () => {
    const initialReader: ReaderFormData = {
        name: "",
        email: "",
        phone: "",
        address: "",
        memberShipId: "",
    };

    const [reader, setReader] = useState(initialReader);

    const { id } = useParams();
    const navigate = useNavigate();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReader({ ...reader, [name]: value });
    };

    // ✅ Validation Function
    const validate = (data: ReaderFormData): string[] => {
        const errors: string[] = [];

        // Name validation
        if (!data.name.trim()) {
            errors.push("Name is required");
        } else if (data.name.length < 3) {
            errors.push("Name must be at least 3 characters");
        } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
            errors.push("Name can only contain letters and spaces");
        }

        // Email validation
        if (!data.email.trim()) {
            errors.push("Email is required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push("Email is invalid");
        }

        // Phone number validation
        if (!String(data.phone).trim()) {
            errors.push("Phone number is required");
        } else if (!/^\d{10}$/.test(data.phone)) {
            errors.push("Phone number must be exactly 10 digits");
        }

        // Address validation
        if (!data.address.trim()) {
            errors.push("Address is required");
        } else if (data.address.length < 5) {
            errors.push("Address must be at least 5 characters");
        }

        // Membership ID validation
        if (!data.memberShipId.trim()) {
            errors.push("Membership ID is required");
        }

        return errors;
    };

    useEffect(() => {
        const fetchReader = async () => {
            if (!id) return;
            try {
                const fetchReader = await getReaderById(id);
                setReader(fetchReader);
            } catch (error: any) {
                toast.error(`${error.response?.data?.message || error.message}`, {
                    duration: 3000,
                    position: "top-right",
                });
            }
        };
        fetchReader();
    }, [id]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return;

        
        // ✅ Validate before submitting
        const errors = validate(reader);
        if (errors.length > 0) {
            errors.forEach((err) =>
                toast.error(err, {
                    position: "top-right",
                    duration: 3000,
                }),
            );
            return;
        }

        try {
            const response = await updateEXReader(id, reader);
            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 1500,
            });

            setReader(initialReader);
            navigate("/admin-dashboard/readers");
        } catch (error: any) {
            toast.error(`${error.response?.data?.message || error.message}`, {
                duration: 3000,
                position: "top-right",
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

                <h3 className="mb-6 text-center text-2xl font-semibold text-green-800 uppercase">Update Reader</h3>

                <form
                    className="space-y-4"
                    onSubmit={submitForm}
                >
                    <div>
                        <Label
                            htmlFor="name"
                            className="text-green-900"
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
                            className="text-green-900"
                        >
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={reader.email}
                            onChange={inputHandler}
                            placeholder="Enter email"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="phone"
                            className="text-green-900"
                        >
                            Phone
                        </Label>
                        <Input
                            type="text"
                            id="phone"
                            name="phone"
                            value={reader.phone}
                            onChange={inputHandler}
                            placeholder="Enter phone"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="address"
                            className="text-green-900"
                        >
                            Address
                        </Label>
                        <Input
                            type="text"
                            id="address"
                            name="address"
                            value={reader.address}
                            onChange={inputHandler}
                            placeholder="Enter address"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="memberShipId"
                            className="text-green-900"
                        >
                            Membership ID
                        </Label>
                        <Input
                            type="text"
                            id="memberShipId"
                            name="memberShipId"
                            value={reader.memberShipId}
                            onChange={inputHandler}
                            placeholder="Enter membership ID"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-md bg-green-600 py-2 text-white transition duration-200 hover:bg-green-700"
                    >
                        Update Reader
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default updateReader;
