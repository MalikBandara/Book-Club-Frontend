import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import type { IssueBook } from "../types/IssuBook";
import { getAllIssueBooks, updateIssueBook } from "../service/issueBookService";
import { getBookById } from "../service/bookService";
import { getReaderById } from "../service/readerService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReturnBookPage = () => {
    const [issueBook, setIssueBook] = useState<
        (IssueBook & {
            bookDetails?: { title: string };
            readerDetails?: { name: string };
        })[]
    >([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllIssueBooks();

                // Filter only "pending" or "overdue" books
                const filteredData = data.filter((book) => book.status?.toLowerCase() === "pending" || book.status?.toLowerCase() === "overdue");

                // Enrich each issue with bookDetails and readerDetails
                const enrichedData = await Promise.all(
                    filteredData.map(async (issue) => {
                        let bookDetails;
                        let readerDetails;

                        try {
                            bookDetails = await getBookById(issue.book);
                        } catch (err) {
                            console.error("Failed to fetch book:", issue.book, err);
                        }

                        try {
                            readerDetails = await getReaderById(issue.reader);
                        } catch (err) {
                            console.error("Failed to fetch reader:", issue.reader, err);
                        }

                        return {
                            ...issue,
                            bookDetails,
                            readerDetails,
                        };
                    }),
                );

                // Sort so that 'pending' entries come first
                const sortedData = enrichedData.sort((a, b) => {
                    const isPendingA = a.status?.toLowerCase() === "pending" || a.status?.toLowerCase() === "overdue";
                    const isPendingB = b.status?.toLowerCase() === "pending" || b.status?.toLowerCase() === "overdue";

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

    const filteredIssueBooks = issueBook.filter(
        (book) =>
            book.bookDetails?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.readerDetails?.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const updateBookStatus = async (bookId: string) => {
        try {
            if (!bookId) {
                toast.error("No Book Found in ID");
                return;
            }

            const response = await updateIssueBook(bookId); // Axios PUT/PATCH request
            navigate("/admin-dashboard/issueBook");

            toast.success(`${response.message}`, {
                position: "top-right",
                duration: 3000,
            });

            // Update returned book in the local state
            setIssueBook((prev) =>
                prev.map((issue) =>
                    issue.book === bookId && (issue.status === "pending" || issue.status === "overdue") ? { ...issue, status: "returned" } : issue,
                ),
            );
        } catch (error: any) {
            console.log("Return error:", error);

            const errorMessage = error?.response?.data?.message || error?.message || "Failed to update book status";

            toast.error(errorMessage, {
                position: "top-right",
                duration: 4000,
            });

            if (errorMessage.toLowerCase().includes("overdue")) {
                toast("Redirecting to Overdue Page...", { icon: "⚠️" });
                setTimeout(() => {
                    navigate("/admin-dashboard/overdueBook");
                }, 2000);
            }
        }
    };

    return (
        <div className="flex min-h-screen items-start justify-center px-4 py-10">
            <div className="flex w-full max-w-6xl flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                    <i className="fa-solid fa-book-open text-3xl text-green-600"></i>
                    <h1 className="text-2xl font-semibold text-green-800">Return Book page</h1>
                    <p className="text-sm text-gray-500">A list of all books issued to readers</p>
                </div>

                <div className="mb-4 flex w-full max-w-3xl">
                    <input
                        type="text"
                        placeholder="Search by title, Reader Name..."
                        className="w-full rounded border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-300 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Table className="w-full overflow-hidden rounded-lg border shadow-sm">
                    <TableCaption className="mt-2 text-sm text-gray-500">Total issued: {issueBook.length}</TableCaption>

                    <TableHeader>
                        <TableRow className="bg-gray-100 text-sm text-gray-700">
                            <TableHead className="px-4 py-3">#</TableHead>
                            <TableHead className="px-4 py-3">Title</TableHead>
                            <TableHead className="px-4 py-3">Reader</TableHead>
                            <TableHead className="px-4 py-3">Lending Date</TableHead>
                            <TableHead className="px-4 py-3">Due Date</TableHead>
                            <TableHead className="px-4 py-3">Status</TableHead>
                            <TableHead className="px-4 py-3 text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {filteredIssueBooks.map((book) => (
                            <TableRow
                                key={book.id}
                                className="transition-colors hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 font-medium">{book.id}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <div>
                                        <div className="font-semibold">{book.bookDetails?.title || "N/A"}</div>
                                        <div className="text-xs text-gray-500">ID: {book.book || "N/A"}</div>
                                    </div>
                                </TableCell>

                                <TableCell className="px-4 py-3 font-medium text-blue-600">
                                    <div>
                                        <div className="font-semibold">{book.readerDetails?.name || "N/A"}</div>
                                        <div className="text-xs text-gray-500">ID: {book.readerDetails?.id || "N/A"}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-4 py-3">{book.lendingDate.split("T")[0]}</TableCell>
                                <TableCell className={`px-4 py-3 ${book.status === "overdue" ? "text-red-600" : ""}`}>
                                    {book.dueDate.split("T")[0]}
                                </TableCell>

                                <TableCell className="px-4 py-3">
                                    <span
                                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                            book.status === "returned"
                                                ? "bg-green-100 text-green-700"
                                                : book.status === "pending"
                                                  ? "bg-yellow-100 text-yellow-700"
                                                  : book.status === "overdue"
                                                    ? "bg-red-300 text-red-700"
                                                    : ""
                                        }`}
                                    >
                                        {book.status}
                                    </span>
                                </TableCell>

                                <TableCell className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        {(book.status === "pending" || book.status === "overdue") && (
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
