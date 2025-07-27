import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import toast from "react-hot-toast";

import { getOverdueBooks, updateOverdueBookSt } from "../service/issueBookService";
import type { IssueBook } from "../types/IssuBook";
import { getBookById } from "../service/bookService";
import { getReaderById } from "../service/readerService";
import emailjs from "@emailjs/browser";

const OverduePage = () => {
    const [overdueBooks, setOverdueBooks] = useState<(IssueBook & { bookDetails?: { title: string }; readerDetails?: { name: string } })[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOverdueBooks();

                // For each overdue book, fetch book details and reader details
                const enrichedData = await Promise.all(
                    data.map(async (issue) => {
                        let bookDetails, readerDetails;

                        try {
                            bookDetails = await getBookById(issue.book);
                        } catch (err) {
                            console.error("Failed to fetch book details for:", issue.book, err);
                        }

                        try {
                            readerDetails = await getReaderById(issue.reader);
                        } catch (err) {
                            console.error("Failed to fetch reader details for:", issue.reader, err);
                        }

                        return {
                            ...issue,
                            bookDetails,
                            readerDetails,
                        };
                    }),
                );

                setOverdueBooks(enrichedData);
            } catch (error) {
                 toast.error(`No Data is Available`, {
                     duration: 3000,
                     position: "top-right",
                 });
            }
        };
        fetchData();
    }, []);

    const updateOverdueStatus = async (Bid: string) => {
        const overdueBook = overdueBooks.find((book) => book.id === Bid);
        if (!overdueBook) return;

        try {
            const response = await updateOverdueBookSt(Bid);

            // Email params with fetched names/titles
            const emailParams = {
                reader_name: overdueBook.readerDetails?.name || "Reader",
                reader_email: overdueBook.readerDetails?.email || overdueBook.readerEmail || "",
                book_title: overdueBook.bookDetails?.title || "Book",
                due_date: overdueBook.dueDate.split("T")[0],
            };

            await emailjs.send("service_gfhp8ni", "template_94998z6", emailParams, "4lxpD2m7qljd42vBx");

            setOverdueBooks((prev) => prev.filter((book) => book.id !== Bid));
            toast.success(response.message, {
                position: "top-right",
                duration: 3000,
            });
        } catch (error: any) {
            toast.error(`${error.response?.data?.message || error.message}`, {
                position: "top-right",
                duration: 3000,
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-white px-4 py-12">
            <h1 className="mb-8 text-4xl font-bold tracking-wide text-green-800 uppercase">Overdue Books</h1>

            {overdueBooks.length === 0 ? (
                <div className="mt-10 flex flex-col items-center justify-center text-center">
                    <div className="mb-4 text-6xl">
                        📚<i className="fa-solid fa-thumbs-up text-green-500"></i>
                    </div>
                    <h2 className="mb-2 text-2xl font-semibold text-gray-800">No Overdue Books Found</h2>
                    <p className="max-w-md text-gray-500">
                        Great job! All books are returned on time. Please check back later to see if any books become overdue.
                    </p>
                </div>
            ) : (
                <div className="w-full max-w-6xl rounded-lg border border-green-300 bg-white p-6 shadow-xl">
                    <Table className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                        <TableCaption className="mt-2 text-sm text-gray-500">A list of your recent Overdue Books</TableCaption>

                        <TableHeader>
                            <TableRow className="bg-gray-100 text-sm text-gray-700">
                                <TableHead className="px-4 py-3 text-left">ID</TableHead>
                                <TableHead className="px-4 py-3 text-left">Reader Name</TableHead>

                                <TableHead className="px-4 py-3 text-left">Book Name</TableHead>

                                <TableHead className="px-4 py-3 text-left">Issued Date</TableHead>
                                <TableHead className="px-4 py-3 text-left">Due Date</TableHead>
                                <TableHead className="px-4 py-3 text-center">Mark as notified</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 bg-white text-sm text-gray-800">
                            {overdueBooks.map((book, index) => (
                                <TableRow
                                    key={book.id}
                                    className="hover:bg-gray-50"
                                >
                                    <TableCell className="px-4 py-3 font-medium">{book.id}</TableCell>
                                    <TableCell className="px-4 py-3 font-medium text-blue-600">
                                        <div>
                                            <div className="font-semibold">{book.readerDetails?.name || "N/A"}</div>
                                            <div className="text-xs text-gray-500">ID: {book.readerDetails?.id || "N/A"}</div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-4 py-3">
                                        <div>
                                            <div className="font-semibold">{book.bookDetails?.title || "N/A"}</div>
                                            <div className="text-xs text-gray-500">ID: {book.book || "N/A"}</div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-4 py-3 font-semibold text-green-600">{book.lendingDate.split("T")[0]}</TableCell>
                                    <TableCell className="px-4 py-3 font-semibold text-red-600">{book.dueDate.split("T")[0]}</TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                onClick={() => updateOverdueStatus(book.id)}
                                                className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-500"
                                                title="Mark as notified"
                                            >
                                                <i className="fa-solid fa-marker"></i>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default OverduePage;
