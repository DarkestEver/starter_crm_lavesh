import { HiChevronLeft } from "react-icons/hi";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    route: string;
};

const CMSBackButton = ({route}: Props) => {
  const navigate = useNavigate();

  return (
    <>
    <div className="mt-[-15px] ml-[-10px]">
      <button onClick={() => navigate(`${route}`)} className="px-1 py-1 text-center text-black font-bold border rounded-full">
        <HiChevronLeft size={25} />
      </button>
    </div>
    </>
  )
};

export default CMSBackButton;
