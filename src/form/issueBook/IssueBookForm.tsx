import { Button } from "../../components/ui/button";
import { getBook } from "../../service/bookService";
import { getAllIssueBooks, issueNewBook } from "../../service/issueBookService";
import { getReader } from "../../service/readerService";
import type { Books } from "../../types/Books";
import type { IssueBookFormData } from "../../types/IssuBook";
import type { Readers } from "../../types/Readers";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import IssueBookPage from "../../pages/IssueBookPage";
import { useNavigate } from "react-router-dom";

const IssueBookForm = () => {
    const [readers, setReaders] = useState<Readers[]>([]);
    const [books, setBooks] = useState<Books[]>([]);
    const [selectedReaderId, setSelectedReaderId] = useState<string>("");
    const [selectedBookId, setSelectedBookId] = useState<string>("");
    const [formData, setFormData] = useState<IssueBookFormData>({
        book: "",
        reader: "",
        dueDate: "",
        lendingDate: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const books = await getBook();
                const readers = await getReader();
                setBooks(books);
                setReaders(readers);
            } catch (error) {
                console.error("Error fetching books or readers:", error);
            }
        };

        fetchData();
    }, []);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedBookId || !selectedReaderId || !formData.dueDate) {
            toast.error("Please select a book, reader, and due date");
            return;
        }

        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

        const lendBook: IssueBookFormData = {
            book: selectedBookId,
            reader: selectedReaderId,
            dueDate: formData.dueDate,
            lendingDate: today,
        };

        try {
            await issueNewBook(lendBook);
            navigate("/admin-dashboard/books");
            toast.success("Book issued successfully");

            // Reset form
            setSelectedBookId("");
            setSelectedReaderId("");
            setFormData({ book: "", reader: "", dueDate: "", lendingDate: "" });
        } catch (error) {
            toast.error("Failed to issue book");
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-lg">
                    <div className="mb-4">
                        <label
                            htmlFor="readerDropdown"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Select Reader
                        </label>
                        <select
                            id="readerDropdown"
                            value={selectedReaderId}
                            onChange={(e) => setSelectedReaderId(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">-- Select Reader --</option>
                            {readers.map((reader) => (
                                <option
                                    key={reader.id}
                                    value={reader.id}
                                >
                                    {reader.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="bookDropdown"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Select Book
                        </label>
                        <select
                            id="bookDropdown"
                            value={selectedBookId}
                            onChange={(e) => setSelectedBookId(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">-- Select Book --</option>
                            {books.map((book) => (
                                <option
                                    key={book.id}
                                    value={book.id}
                                >
                                    {book.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={inputHandler}
                        />
                    </div>

                    {selectedReaderId && selectedBookId && (
                        <div className="mt-4 rounded border border-green-200 bg-green-50 p-2 text-sm text-green-700">
                            Issuing book <strong>{books.find((b) => b.id === selectedBookId)?.title}</strong> to reader{" "}
                            <strong>{readers.find((r) => r.id === selectedReaderId)?.name}</strong>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="mt-5"
                    >
                        Issue Book
                    </Button>
                </div>
            </form>
            <IssueBookPage />
        </div>
    );
};

export default IssueBookForm;
