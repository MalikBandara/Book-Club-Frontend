import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableFooter, TableCell } from "../components/ui/table";
import type { Readers } from "../types/Readers";
import { Link } from "react-router-dom";
import { deleteExReader, getReader } from "../service/readerService";
import toast from "react-hot-toast";

const ReaderPage = () => {
    const [readers, setReaders] = useState<Readers[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredReaders = [...readers]
        .sort((a, b) => b.id.localeCompare(a.id)) // Sort descending by id (latest first)
        .filter(
            (reader) =>
                reader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                reader.memberShipId.toLowerCase().includes(searchTerm.toLowerCase()),
        );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getReader();
                setReaders(data);
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    const deleteReader = async (readerId: string) => {
        try {
            if (!readerId) {
                toast.error("No Reader Found in id ");
            }

            const resp = await deleteExReader(readerId);
            setReaders((pre) => pre.filter((reader) => reader.id !== readerId));
            toast.success(resp.message, {
                position: "top-right",
                duration: 3000,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
            <div className="mb-6 text-center">
                <i className="fa-solid fa-book-open-reader text-3xl text-green-600"></i>
                <h1 className="text-2xl font-semibold text-green-800">Readers page</h1>
                <p className="text-sm text-gray-500">A list of all Readers in the library</p>
            </div>

            <div className="mb-4 w-full max-w-3xl">
                <input
                    type="text"
                    placeholder="Search by name, email or membership ID..."
                    className="w-full rounded border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-300 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="w-full max-w-6xl rounded-lg border border-green-300 bg-white p-6 shadow-xl">
                <Link
                    to="/addReader"
                    className="mb-6 inline-flex items-center gap-2 rounded bg-green-700 px-4 py-2 font-medium text-white shadow-md transition duration-300 hover:scale-105 hover:bg-green-800 hover:shadow-lg"
                >
                    Add Reader <i className="fa-solid fa-user-plus"></i>
                </Link>

                <Table className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                    <TableCaption className="mt-2 text-sm text-gray-500">Total Readers: {readers.length}</TableCaption>

                    {/* Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gray-100 text-sm text-gray-700">
                            <TableHead className="px-4 py-3 text-left">ID</TableHead>
                            <TableHead className="px-4 py-3 text-left">Name</TableHead>
                            <TableHead className="px-4 py-3 text-left">Email</TableHead>
                            <TableHead className="px-4 py-3 text-left">Phone</TableHead>
                            <TableHead className="px-4 py-3 text-left">Address</TableHead>
                            <TableHead className="px-4 py-3 text-left">Membership Id</TableHead>

                            <TableHead className="px-4 py-3 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 bg-white text-sm text-gray-800">
                        {filteredReaders.map((reader, index) => (
                            <TableRow
                                key={reader.id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 font-medium">{reader.id}</TableCell>
                                <TableCell className="px-4 py-3">{reader.name}</TableCell>
                                <TableCell className="px-4 py-3 text-blue-600 hover:underline">
                                    <i className="fa-solid fa-envelope pe-3"></i>
                                    {reader.email}
                                </TableCell>
                                <TableCell className="px-4 py-3">
                                    <i className="fa-solid fa-phone pe-3"></i>
                                    {reader.phone}
                                </TableCell>
                                <TableCell className="px-4 py-3">{reader.address}</TableCell>
                                <TableCell className="px-4 py-3 font-semibold text-green-600">{reader.memberShipId}</TableCell>

                                <TableCell className="px-4 py-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        <Link to={`/updateReader/${reader.id}`}>
                                            <Button
                                                className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-500"
                                                title="Edit"
                                            >
                                                <i className="fa-regular fa-pen-to-square text-sm"></i>
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => deleteReader(reader.id)}
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

export default ReaderPage;
