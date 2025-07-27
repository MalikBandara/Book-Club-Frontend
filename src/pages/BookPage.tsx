import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import type { Books } from "../types/Books";
import { deleteExistingBook, getBook } from "../service/bookService";

const BookPage = () => {
    const [books, setBooks] = useState<Books[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBook();
                setBooks(data);
            } catch (error) {
                toast.error(`No Data is Available`, {
                    duration: 3000,
                    position: "top-right",
                });
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
        } catch (error : any) {
            toast.error(`${error.response?.data?.message || error.message}`, {
                duration: 3000,
                position: "top-right",
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
            <div className="mb-6 text-center">
                <i className="fa-solid fa-book text-3xl text-green-600"></i>
                <h1 className="text-2xl font-semibold text-green-700">Book Page</h1>
                <p className="text-sm text-gray-500">A list of all books in the library</p>
            </div>

            <div className="mb-4 w-full max-w-3xl">
                <input
                    type="text"
                    placeholder="Search by title, author, publisher, category or ISBN..."
                    className="w-full rounded border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-300 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                            <TableHead className="px-4 py-3 text-left">ID</TableHead>
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
                        {filteredBooks.map((book, index) => (
                            <TableRow
                                key={book.id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 font-medium">{book.id}</TableCell>
                                <TableCell className="px-4 py-3">{book.title}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <i className="fa-solid fa-pen pe-3"></i>
                                    {book.author}
                                </TableCell>
                                <TableCell className="px-4 py-3">{book.publisher}</TableCell>
                                <TableCell className="px-4 py-3">{book.publishDate?.split("T")[0]}</TableCell>
                                <TableCell className="px-4 py-3">{book.category}</TableCell>
                                <TableCell
                                    className={`mt-3 inline-block rounded-full text-xs font-medium ${book.status === "Available" ? "bg-green-100 text-green-700" : ""} ${book.status === "Issued" ? "bg-yellow-100 text-yellow-700" : ""} ${book.status === "overdue" ? "bg-red-300 text-red-700" : ""} `}
                                >
                                    {book.status}
                                </TableCell>
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
