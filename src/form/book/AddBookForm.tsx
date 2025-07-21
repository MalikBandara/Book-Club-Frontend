import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import type { BookFormData } from "../../types/Books";
import { createBook } from "../../service/bookService";

const AddBook = () => {
    // for loading ui
    // const [loading, setLoading] = useState(false);

    const initialBook: BookFormData = {
        title: "",
        author: "",
        publisher: "",
        publishDate: "",
        category: "",
        status: "",
    };

    const [book, setBook] = useState<BookFormData>(initialBook);

    const navigate = useNavigate();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await createBook(book);
            console.log("Book created successfully:", response);
            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 3000,
            });

            setBook(initialBook); // reset form
            navigate("/admin-dashboard/books"); // redirect to home
        } catch (error: any) {
            console.error("Failed to create book:", error);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-green-100 px-4">
            <div className="w-full max-w-md rounded-[10px] border border-green-200 bg-white/90 p-8 shadow-2xl backdrop-blur-md">
                <Link to="/admin-dashboard/books">
                    <Button className="mb-5 bg-green-700 text-white hover:bg-green-600">
                        <i className="fa-solid fa-backward mr-2"></i> Back
                    </Button>
                </Link>

                <h3 className="mb-6 text-center text-2xl font-semibold text-green-800 uppercase">Add New Book</h3>

                <form
                    onSubmit={submitForm}
                    className="space-y-4"
                >
                    <div>
                        <Label
                            htmlFor="title"
                            className="text-green-900"
                        >
                            Title
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={book.title}
                            onChange={inputHandler}
                            placeholder="Enter title"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="author"
                            className="text-green-900"
                        >
                            Author
                        </Label>
                        <Input
                            type="text"
                            id="author"
                            name="author"
                            value={book.author}
                            onChange={inputHandler}
                            placeholder="Enter author"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="publisher"
                            className="text-green-900"
                        >
                            Publisher
                        </Label>
                        <Input
                            type="text"
                            id="publisher"
                            name="publisher"
                            value={book.publisher}
                            onChange={inputHandler}
                            placeholder="Enter publisher"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="publishDate"
                            className="text-green-900"
                        >
                            Publish Date
                        </Label>
                        <Input
                            type="date"
                            id="publishDate"
                            name="publishDate"
                            value={book.publishDate}
                            onChange={inputHandler}
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="category"
                            className="text-green-900"
                        >
                            Category
                        </Label>
                        <Input
                            type="text"
                            id="category"
                            name="category"
                            value={book.category}
                            onChange={inputHandler}
                            placeholder="Enter category"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="status"
                            className="text-green-900"
                        >
                            Status
                        </Label>
                        <Input
                            type="text"
                            id="status"
                            name="status"
                            value={book.status}
                            onChange={inputHandler}
                            placeholder="Enter status (Available/Issued)"
                            className="w-full rounded-md border border-green-300 bg-green-50 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-md bg-green-600 py-2 text-white transition duration-200 hover:bg-green-700"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
