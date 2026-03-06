import React from "react";
import Image from "next/image";
const Benefits = () => {
  return (
    <div className="flex justify-between  mt-15">
      <div className="flex flex-col items-center gap-2  bg-amber-50 shadow-2xl p-10">
        <Image
          src="/home/data-analytic.svg"
          width={40}
          height={40}
          alt="icon"
        />
        <h3 className="text-2xl">Easy link shortering</h3>
        <p>Quickly shorten any URL with one click</p>
      </div>

      <div className="flex flex-col items-center gap-2  bg-amber-50 shadow-2xl p-10">
        <Image
          src="/home/data-analytic.svg"
          width={40}
          height={40}
          alt="icon"
        />
        <h3 className="text-2xl">Easy link shortering</h3>
        <p>Quickly shorten any URL with one click</p>
      </div>

      <div className="flex flex-col items-center gap-2  bg-amber-50 shadow-2xl p-10">
        <Image
          src="/home/data-analytic.svg"
          width={40}
          height={40}
          alt="icon"
        />
        <h3 className="text-2xl">Easy link shortering</h3>
        <p>Quickly shorten any URL with one click</p>
      </div>
    </div>
  );
};

export default Benefits;
