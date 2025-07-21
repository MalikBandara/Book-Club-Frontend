import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import type { Books } from "../types/Books";
import { deleteExistingBook, getBook } from "../service/bookService";

const BookPage = () => {
    const [books, setBooks] = useState<Books[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBook();
                setBooks(data);
            } catch (error) {
                console.error("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const deleteBook = async (bookId: string) => {
        if (!bookId) {
            toast.error("No Book Found in id");
            return;
        }
        try {
            const res = await deleteExistingBook(bookId);
            setBooks((prev) => prev.filter((book) => book.id !== bookId));
            toast.success(`${res.message}`, {
                position: "top-right",
                duration: 3000,
            });
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-semibold text-green-700">Book Page</h1>
                <p className="text-sm text-gray-500">A list of all books in the library</p>
            </div>

            <div className="w-full max-w-6xl rounded-lg border border-green-300 bg-white p-6 shadow-xl">
                <Link
                    to="/addBook"
                    className="mb-6 inline-flex items-center gap-2 rounded bg-green-700 px-4 py-2 font-medium text-white shadow-md transition duration-300 hover:scale-105 hover:bg-green-800 hover:shadow-lg"
                >
                    Add Book <i className="fa-solid fa-book"></i>
                </Link>

                <Table className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                    <TableCaption className="mt-2 text-sm text-gray-500">Total Books: {books.length}</TableCaption>

                    {/* Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gray-100 text-sm text-gray-700">
                            <TableHead className="px-4 py-3 text-left">Id</TableHead>
                            <TableHead className="px-4 py-3 text-left">Title</TableHead>
                            <TableHead className="px-4 py-3 text-left">Author</TableHead>
                            <TableHead className="px-4 py-3 text-left">Publisher</TableHead>
                            <TableHead className="px-4 py-3 text-left">Publish Date</TableHead>
                            <TableHead className="px-4 py-3 text-left">Category</TableHead>
                            <TableHead className="px-4 py-3 text-left">Status</TableHead>
                            <TableHead className="px-4 py-3 text-left">ISBN</TableHead>
                            <TableHead className="px-4 py-3 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 bg-white text-sm text-gray-800">
                        {books.map((book, index) => (
                            <TableRow
                                key={book.id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 font-medium">{index + 1}</TableCell>
                                <TableCell className="px-4 py-3">{book.title}</TableCell>
                                <TableCell className="px-4 py-3">{book.author}</TableCell>
                                <TableCell className="px-4 py-3">{book.publisher}</TableCell>
                                <TableCell className="px-4 py-3">{book.publishDate?.split("T")[0]}</TableCell>
                                <TableCell className="px-4 py-3">{book.category}</TableCell>
                                <TableCell className="px-4 py-3">{book.status}</TableCell>
                                <TableCell className="px-4 py-3">{book.isbn}</TableCell>
                                <TableCell className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <Link to={`/updateBook/${book.id}`}>
                                            <Button
                                                className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-500"
                                                title="Edit"
                                            >
                                                <i className="fa-regular fa-pen-to-square text-sm"></i>
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => deleteBook(book.id)}
                                            className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-500"
                                            title="Delete"
                                        >
                                            <i className="fa-solid fa-trash text-sm"></i>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BookPage;
