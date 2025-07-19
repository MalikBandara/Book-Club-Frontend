import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import type { BookFormData } from "../types/Books";
import { createBook } from "../service/bookService";

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

    const [book, setBook] = useState(initialBook);

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
        <div className="flex min-h-screen w-full items-center justify-center bg-sky-50 px-4">
            <div className="w-full max-w-md rounded-[10px] bg-white p-8 shadow-lg">
                <Link to="/admin-dashboard/books">
                    <Button className="mb-5 bg-gray-600 hover:bg-gray-500">
                        <i className="fa-solid fa-backward mr-2"></i> Back
                    </Button>
                </Link>

                <h3 className="mb-6 text-center text-2xl font-semibold text-gray-800 uppercase">Add New Book</h3>

                <form
                    onSubmit={submitForm}
                    className="space-y-4"
                >
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={book.title}
                            onChange={inputHandler}
                            placeholder="Enter title"
                        />
                    </div>

                    <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                            type="text"
                            id="author"
                            name="author"
                            value={book.author}
                            onChange={inputHandler}
                            placeholder="Enter author"
                        />
                    </div>

                    <div>
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input
                            type="text"
                            id="publisher"
                            name="publisher"
                            value={book.publisher}
                            onChange={inputHandler}
                            placeholder="Enter publisher"
                        />
                    </div>

                    <div>
                        <Label htmlFor="publishDate">Publish Date</Label>
                        <Input
                            type="date"
                            id="publishDate"
                            name="publishDate"
                            value={book.publishDate}
                            onChange={inputHandler}
                        />
                    </div>

                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                            type="text"
                            id="category"
                            name="category"
                            value={book.category}
                            onChange={inputHandler}
                            placeholder="Enter category"
                        />
                    </div>

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Input
                            type="text"
                            id="status"
                            name="status"
                            value={book.status}
                            onChange={inputHandler}
                            placeholder="Enter status (Available/Issued)"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-sky-500 text-white hover:bg-sky-600"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
