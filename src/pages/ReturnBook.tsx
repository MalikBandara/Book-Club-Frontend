import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import type { IssueBook } from "../types/IssuBook";
import { getAllIssueBooks, updateIssueBook } from "../service/issueBookService";
import toast from "react-hot-toast";

const ReturnBookPage = () => {
    const [issueBook, setIssueBook] = useState<IssueBook[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllIssueBooks();

                // Sort so that 'pending' entries come first
                const sortedData = data.sort((a, b) => {
                    const isPendingA = a.status?.toLowerCase() === "pending";
                    const isPendingB = b.status?.toLowerCase() === "pending";

                    if (isPendingA && !isPendingB) return -1;
                    if (!isPendingA && isPendingB) return 1;
                    return 0; // keep order for same statuses
                });

                setIssueBook(sortedData);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);


    const updateBookStatus = async (bookId: string) => {
        try {
            if (!bookId) {
                toast.error("No Book Found in id");
                return;
            }

            const response = await updateIssueBook(bookId);

            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 3000,
            });

            // ✅ Update the returned issue's status in the state
            setIssueBook((prev) =>
                prev.map((issue) => (issue.book === bookId && issue.status === "pending" ? { ...issue, status: "returned" } : issue)),
            );
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update book status");
        }

        console.log(`Updating status for book with ID: ${bookId}`);
    };


    return (
        <div className="flex min-h-screen items-start justify-center px-4 py-10">
            <div className="w-full max-w-6xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Issued Books</h1>
                    <p className="text-sm text-gray-500">A list of all books issued to readers</p>
                </div>

                <Table className="w-full overflow-hidden rounded-lg border shadow-sm">
                    <TableCaption className="mt-2 text-sm text-gray-500">Total issued: {issueBook.length}</TableCaption>

                    {/* Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gray-100 text-sm text-gray-700">
                            <TableHead className="px-4 py-3">#</TableHead>
                            <TableHead className="px-4 py-3">Book</TableHead>
                            <TableHead className="px-4 py-3">Reader</TableHead>
                            <TableHead className="px-4 py-3">Lending Date</TableHead>
                            <TableHead className="px-4 py-3">Due Date</TableHead>
                            <TableHead className="px-4 py-3">Status</TableHead>
                            <TableHead className="px-4 py-3 text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {issueBook.map((book, index) => (
                            <TableRow
                                key={book.id}
                                className="transition-colors hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 font-medium">{index + 1}</TableCell>
                                <TableCell className="px-4 py-3">{book.book}</TableCell>
                                <TableCell className="px-4 py-3 font-medium text-blue-600">{book.reader}</TableCell>
                                <TableCell className="px-4 py-3">{book.lendingDate.split("T")[0]}</TableCell>
                                <TableCell className="px-4 py-3">{book.dueDate.split("T")[0]}</TableCell>

                                {/* Status Badge */}
                                <TableCell className="px-4 py-3">
                                    <span
                                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                            book.status === "returned" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {book.status}
                                    </span>
                                </TableCell>

                                {/* Action Buttons */}
                                <TableCell className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        {book.status === "pending" && (
                                            <Button
                                                onClick={() => updateBookStatus(book.book)}
                                                className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-500"
                                                title="Return Book"
                                            >
                                                Return Book
                                                <i className="fa-regular fa-pen-to-square ml-2 text-sm"></i>
                                            </Button>
                                        )}
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

export default ReturnBookPage;
