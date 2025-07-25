import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Users, BookOpen, BookCopy, Clock } from "lucide-react"; // Lucide icons
import { getReader } from "../service/readerService";
import { getBook } from "../service/bookService";
import { getAllIssueBooks, getOverdueBooks } from "../service/issueBookService";
import type { Value } from "react-calendar/dist/shared/types.js";

type OverdueBook = {
    _id: string;
    title: string;
    issuedDate: string;
    dueDate: string;
    readerName: string;
};

type CalendarValue = Date | Date[] | null;

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: React.ElementType; color: string }) => (
    <div className={`rounded-xl p-5 text-white shadow-md ${color}`}>
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-lg">{title}</h2>
                <p className="text-3xl font-bold">{value}</p>
            </div>
            <Icon className="h-10 w-10 opacity-70" />
        </div>
    </div>
);

const DashboardHome = () => {
    // Stats states
    const [readerTotal, setReaderTotal] = useState(0);
    const [bookTotal, setBookTotal] = useState(0);
    const [issuedBooks, setIssuedBooks] = useState(0);
    const [overdueCount, setOverdueCount] = useState(0);

    // Overdue books details for card list
    const [overdueBooks, setOverdueBooks] = useState<OverdueBook[]>([]);

    // Calendar state
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        // Fetch stats and overdue books
        const fetchStatsAndOverdue = async () => {
            try {
                const readers = await getReader();
                setReaderTotal(readers.length);

                const books = await getBook();
                setBookTotal(books.length);

                const issued = await getAllIssueBooks();
                setIssuedBooks(issued.length);

                const overdue = await getOverdueBooks();
                setOverdueCount(overdue.length);

                // Transform IssueBook[] -> OverdueBook[]
                const transformed = overdue.map((book) => ({
                    _id: book.id,
                    title: book.bookTitle || "Unknown",
                    issuedDate: book.lendingDate || "N/A",
                    dueDate: book.dueDate || "N/A",
                    readerName: book.readerName || "N/A",
                }));
                setOverdueBooks(transformed);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchStatsAndOverdue();
    }, []);

    const onDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        } else if (Array.isArray(value)) {
            const firstDate = value.find((v): v is Date => v instanceof Date);
            if (firstDate) setSelectedDate(firstDate);
        }
    };

    return (
        <div className="space-y-8 p-6">
            {/* Welcome */}
            <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800">
                    <i className="fa-solid fa-book-open pe-3 text-green-500"></i> Welcome, Admin!
                </h1>
                <p className="mt-2 text-gray-600">Here’s a quick overview of what's happening in your Book Club system today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Readers"
                    value={readerTotal}
                    icon={Users}
                    color="bg-indigo-500"
                />
                <StatCard
                    title="Books Available"
                    value={bookTotal}
                    icon={BookOpen}
                    color="bg-green-500"
                />
                <StatCard
                    title="Books Issued Overall"
                    value={issuedBooks}
                    icon={BookCopy}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Overdue Returns"
                    value={overdueCount}
                    icon={Clock}
                    color="bg-red-500"
                />
            </div>

            {/* Calendar + Overdue Books Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Calendar */}
                <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                    <h3 className="mb-6 flex items-center text-2xl font-semibold text-gray-700">
                        <i className="fa-solid fa-calendar me-4 text-2xl text-blue-500"></i>
                        Calendar
                    </h3>
                    <div className="rounded-xl border border-gray-300 p-3 shadow-inner">
                        <Calendar
                            onChange={onDateChange}
                            value={selectedDate}
                            className="w-full text-gray-800"
                        />
                    </div>
                </div>

                {/* Overdue Books List */}
                <div className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800">
                        <i className="fa-solid fa-hourglass-end me-5"></i> Overdue Books
                    </h3>
                    <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                        {overdueBooks.length > 0 ? (
                            overdueBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className="rounded-lg border border-red-300 bg-red-50 p-4"
                                >
                                    <p className="font-semibold text-red-700">{book.title}</p>
                                    <p className="text-sm text-gray-700">Reader: {book.readerName}</p>
                                    <p className="text-sm text-gray-700">Due: {book.dueDate}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No overdue books</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
