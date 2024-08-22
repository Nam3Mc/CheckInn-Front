"use client";
import DetailFather from "@/components/detailComponents/detailFather";
import { IRoom } from "@/utils/interfaces/interfaces";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { name: string } }) => {
  const [detailRoom, setDetailRoom] = useState<Partial<IRoom>>({});

  console.log("detail room", detailRoom);
  return (
    <div className="h-screen">
      <DetailFather></DetailFather>
    </div>
  );
};

export default page;
