import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createReader } from "../service/readerService";
import type { ReaderFormData } from "../types/Readers";

const AddReader = () => {


  // for loading ui 
  // const [loading, setLoading] = useState(false);


  const initialReader: ReaderFormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
    memberShipId: "",
  };

  const [reader, setReader] = useState(initialReader);
  
  const navigate = useNavigate();


  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReader({ ...reader, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createReader(reader);
      toast.success("Reader created successfully!", {
        position: "top-right",
        duration: 3000,
      });

      setReader(initialReader); // reset form
      navigate("/"); // redirect to home
    } catch (error: any) {
      console.error("Failed to create reader:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-sky-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-[10px] shadow-lg p-8 w-full max-w-md">
        <Link to="/">
          <Button className="bg-gray-600 hover:bg-gray-500 mb-5">
            <i className="fa-solid fa-backward mr-2"></i> Back
          </Button>
        </Link>

        <h3 className="text-2xl font-semibold text-gray-800 mb-6 uppercase text-center">
          Add New Reader
        </h3>

        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={reader.name}
              onChange={inputHandler}
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={reader.email}
              onChange={inputHandler}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Phone Number
            </Label>
            <Input
              type="number"
              id="phone"
              name="phone"
              value={reader.phone}
              onChange={inputHandler}
              placeholder="Enter phone number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <Label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Address
            </Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={reader.address}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter Address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <Label
              htmlFor="membershipId"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Membership ID
            </Label>
            <Input
              type="text"
              id="memberShipId"
              name="memberShipId"
              value={reader.memberShipId}
              onChange={inputHandler}
              placeholder="Enter Membership ID"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition duration-200"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddReader;
