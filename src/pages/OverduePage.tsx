import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableFooter, TableCell } from "../components/ui/table";
import toast from "react-hot-toast";

import { getOverdueBooks, updateOverdueBookSt } from "../service/issueBookService";
import type { IssueBook } from "../types/IssuBook";

const OverduePage = () => {
    const [overdueBooks, setOverdueBooks] = useState<IssueBook[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOverdueBooks();
                setOverdueBooks(data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const updateOverdueStatus = async (Bid: string) => {
        try {
            const response = await updateOverdueBookSt(Bid);
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
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
            <h1 className="mb-8 text-4xl font-semibold text-green-800 uppercase">Overdue Books</h1>

            <div className="w-full max-w-6xl rounded-lg border border-green-300 bg-white p-6 shadow-xl">
                <Table className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                    <TableCaption className="mt-2 text-sm text-gray-500">A list of your recent Overdue Books</TableCaption>

                    {/* Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gray-100 text-sm text-gray-700">
                            <TableHead className="px-4 py-3 text-left">#</TableHead>
                            <TableHead className="px-4 py-3 text-left">Reader Name</TableHead>
                            <TableHead className="px-4 py-3 text-left">Reader ID</TableHead>
                            <TableHead className="px-4 py-3 text-left">Book Name</TableHead>
                            <TableHead className="px-4 py-3 text-left">Book ID</TableHead>
                            <TableHead className="px-4 py-3 text-left">Issued Date</TableHead>
                            <TableHead className="px-4 py-3 text-left">Due Date</TableHead>

                            <TableHead className="px-4 py-3 text-center">Mark as overdue</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 bg-white text-sm text-gray-800">
                        {overdueBooks.map((book, index) => (
                            <TableRow
                                key={book.id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 font-medium">{index + 1}</TableCell>
                                <TableCell className="px-4 py-3">{book.readerName}</TableCell>
                                <TableCell className="px-4 py-3 text-blue-600 hover:underline">{book.reader}</TableCell>
                                <TableCell className="px-4 py-3">{book.bookTitle}</TableCell>
                                <TableCell className="px-4 py-3">{book.book}</TableCell>
                                <TableCell className="px-4 py-3 font-semibold text-green-600">{book.lendingDate.split("T")[0]}</TableCell>
                                <TableCell className="px-4 py-3 font-semibold text-red-600">{book.dueDate.split("T")[0]}</TableCell>

                                <TableCell className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            onClick={() => updateOverdueStatus(book.id)}
                                            className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-500"
                                            title="Edit"
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
        </div>
    );
};

export default OverduePage;
