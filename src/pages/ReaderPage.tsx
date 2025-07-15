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
import axios from "axios";
import type { Readers } from "../types/Readers";


const ReaderPage = () => {
  const [readers, setReaders] = useState<Readers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/reader");
        setReaders(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Reader Page</h1>
      <div className="w-full max-w-6xl bg-white rounded shadow-md p-6 ">
        <Button className="text-white px-4 mb-5 bg-sky-600">
          Add Reader <i className="fa-solid fa-user-plus"></i>{" "}
        </Button>
        <Table className="w-full border rounded-md">
          <TableCaption className="text-gray-500 text-sm mt-2">
            A list of your recent readers
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-sky-500 text-gray-800 ">
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
            {readers.map((reader , index) =>{
                return (
                  <TableRow className="hover:bg-gray-50">
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs  font-semibold text-green-700 bg-green-100 rounded text-center">
                        {reader.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {reader.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {reader.phone}
                    </TableCell>
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
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3">
                        <i className="fa-regular fa-pen-to-square text-1xl "></i>
                      </Button>

                      <Button className="bg-red-600 hover:bg-red-700 text-white px-3">
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
