import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableFooter, TableCell } from "../components/ui/table";
import type { Readers } from "../types/Readers";
import { Link } from "react-router-dom";
import { deleteExReader, getReader } from "../service/readerService";
import toast from "react-hot-toast";

const ReaderPage = () => {
    const [readers, setReaders] = useState<Readers[]>([]);

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
            <h1 className="mb-8 text-4xl font-semibold text-green-800 uppercase">Reader Page</h1>

            <div className="w-full max-w-6xl rounded-lg border border-green-300 bg-white p-6 shadow-xl">
                <Link
                    to="/addReader"
                    className="mb-6 inline-flex items-center gap-2 rounded bg-black px-4 py-2 font-medium text-white shadow-md transition duration-300 hover:scale-105 hover:bg-green-800 hover:shadow-lg"
                >
                    Add Reader <i className="fa-solid fa-user-plus"></i>
                </Link>

                <Table className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                    <TableCaption className="mt-2 text-sm text-gray-500">A list of your recent readers</TableCaption>

                    {/* Table Header */}
                    <TableHeader>
                        <TableRow className="bg-gray-100 text-sm text-gray-700">
                            <TableHead className="px-4 py-3 text-left">Id</TableHead>
                            <TableHead className="px-4 py-3 text-left">Name</TableHead>
                            <TableHead className="px-4 py-3 text-left">Email</TableHead>
                            <TableHead className="px-4 py-3 text-left">Phone</TableHead>
                            <TableHead className="px-4 py-3 text-left">Address</TableHead>
                            <TableHead className="px-4 py-3 text-left">Membership Id</TableHead>
                            <TableHead className="px-4 py-3 text-left">Borrowed Books</TableHead>
                            <TableHead className="px-4 py-3 text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 bg-white text-sm text-gray-800">
                        {readers.map((reader, index) => (
                            <TableRow
                                key={reader.id}
                                className="hover:bg-gray-50"
                            >
                                <TableCell className="px-4 py-3 font-medium">{index + 1}</TableCell>
                                <TableCell className="px-4 py-3">{reader.name}</TableCell>
                                <TableCell className="px-4 py-3 text-blue-600 hover:underline">{reader.email}</TableCell>
                                <TableCell className="px-4 py-3">{reader.phone}</TableCell>
                                <TableCell className="px-4 py-3">{reader.address}</TableCell>
                                <TableCell className="px-4 py-3 font-semibold text-green-600">{reader.memberShipId}</TableCell>
                                <TableCell className="px-4 py-3">
                                    {/* Badge-style */}
                                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                        {reader.borrowedBooks}
                                    </span>
                                </TableCell>
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
