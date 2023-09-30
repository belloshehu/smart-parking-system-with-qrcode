import React, { useEffect, useState } from "react";
import { Space } from "./Space";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

type SpaceType = {
  _id: string;
  id: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const SpaceList = async () => {
  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState<SpaceType[]>([]);

  useEffect(() => {
    const getSpaces = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/space");
        const spaceData = await data.spaces;
        setSpaces(spaceData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSpaces();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="text-xl animate-spin" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-0 md:px-20 w-full gap-8 my-5">
      {spaces.map((space) => (
        <Space key={space._id} space={space} />
      ))}
    </div>
  );
};

export default SpaceList;
