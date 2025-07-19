import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableFooter, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";

import type { Books } from "../types/Books";
import { deleteExistingBook, getBook } from "../service/bookService";
import toast from "react-hot-toast";

const BookPage = () => {
    const [books, setBooks] = useState<Books[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBook();
                setBooks(data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const deleteBook = async (bookId: string) => {
        if (!bookId) {
            toast.error("No Book Found in id ");
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
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
            <h1 className="mb-8 text-4xl font-bold text-gray-800">Book Page</h1>
            <div className="w-full max-w-6xl rounded bg-white p-6 shadow-md">
                <Link
                    to="/addBook"
                    className="mb-6 inline-flex items-center gap-2 rounded bg-sky-600 px-3 py-2 font-medium text-white shadow-md transition duration-200 hover:bg-sky-700"
                >
                    Add Books<i className="fa-solid fa-book"></i>
                </Link>

                <Table className="w-full rounded-md border">
                    <TableCaption className="mt-2 text-sm text-gray-500">A list of your recent books</TableCaption>
                    <TableHeader>
                        <TableRow className="bg-sky-500 text-gray-800">
                            <TableHead className="w-[120px] text-white"></TableHead>
                            <TableHead className="w-[120px] text-white">Title</TableHead>
                            <TableHead className="w-[120px] text-white">Author</TableHead>
                            <TableHead className="text-center text-white">Publisher</TableHead>
                            <TableHead className="text-center text-white">Publish Date</TableHead>
                            <TableHead className="text-center text-white">Category</TableHead>
                            <TableHead className="text-center text-white">Status</TableHead>
                            <TableHead className="text-center text-white">ISBN</TableHead>
                            <TableHead className="text-center text-white">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {books.map((book, index) => {
                            return (
                                <TableRow className="hover:bg-gray-50">
                                    <TableCell className="p-4 text-center">{index + 1}</TableCell>
                                    <TableCell>
                                        <span className="inline-block rounded bg-green-100 px-2 py-1 text-center text-xs font-semibold text-green-700">
                                            {book.title}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">{book.author}</TableCell>
                                    <TableCell className="text-center">{book.publisher}</TableCell>
                                    <TableCell className="text-center">{book.publishDate?.split("T")[0]}</TableCell>
                                    <TableCell className="text-center">{book.category}</TableCell>
                                    <TableCell className="text-center">{book.status}</TableCell>
                                    <TableCell className="text-center">{book.isbn}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link to={`/updateBook/` + book.id}>
                                            <Button className="bg-blue-600 px-3 text-white hover:bg-blue-700">
                                                <i className="fa-regular fa-pen-to-square text-1xl"></i>
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={() => deleteBook(book.id)}
                                            className="bg-red-600 px-3 text-white hover:bg-red-700"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter></TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default BookPage;
