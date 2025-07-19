import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableFooter,
  TableCell,
} from "../components/ui/table";

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
    <div className="min-h-screen flex flex-col  items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Reader Page</h1>
      <div className="w-full max-w-6xl bg-white rounded shadow-md p-6 ">
        <Link
          to="/addReader"
          className="mb-6 inline-flex items-center gap-2 px-3 py-2 text-white bg-sky-600 rounded hover:bg-sky-700 transition duration-200 font-medium shadow-md"
        >
          Add Reader <i className="fa-solid fa-user-plus"></i>
        </Link>

        <Table className="w-full border rounded-md">
          <TableCaption className="text-gray-500 text-sm mt-2">
            A list of your recent readers
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-sky-500 text-gray-800 ">
              <TableHead className="w-[120px] text-white">Id</TableHead>
              <TableHead className="w-[120px] text-white">Name</TableHead>
              <TableHead className="text-center text-white">Email</TableHead>
              <TableHead className="text-center text-white">Phone</TableHead>
              <TableHead className="text-center text-white">Address</TableHead>
              <TableHead className="text-center text-white">
                Membership Id
              </TableHead>
              <TableHead className="text-center text-white">
                Borrowed Books
              </TableHead>
              <TableHead className="text-center text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readers.map((reader, index) => {
              return (
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="text-center p-4">{index + 1}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs  font-semibold text-green-700 bg-green-100 rounded text-center">
                      {reader.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{reader.email}</TableCell>
                  <TableCell className="text-center">{reader.phone}</TableCell>
                  <TableCell className="text-center">
                    {reader.address}
                  </TableCell>
                  <TableCell className="text-center ">
                    {reader.memberShipId}
                  </TableCell>
                  <TableCell className="text-center ">
                    {reader.borrowedBooks}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Link to={`/updateReader/` + reader.id}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3">
                        <i className="fa-regular fa-pen-to-square text-1xl "></i>
                      </Button>
                    </Link>

                    <Button
                      onClick={() => deleteReader(reader.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3"
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

export default ReaderPage;
