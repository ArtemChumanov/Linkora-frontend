import React from "react";

const Statistic = () => {
  return (
    <div className="mt-15">
      <h2 className="text-2xl font-bold">Powerful insights and statistic</h2>
      <p>Understand your autience and optimize your companies</p>
      <div className="w-full flex items-start gap-8 mt-8">
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-between  gap-4">
            <div className="grow bg-amber-50 shadow-2xl p-5">
              <h3 className="text-3xl">1000k</h3>
              <p>Total click</p>
            </div>

            <div className="grow bg-amber-50 shadow-2xl p-5">
              <h3 className="text-3xl">1000k</h3>
              <p>Total click</p>
            </div>

            <div className="grow bg-amber-50 shadow-2xl p-5">
              <h3 className="text-3xl">1000k</h3>
              <p>Total click</p>
            </div>
          </div>

          <div className="flex flex-col w-full h-70 gap-5 grow bg-amber-50 shadow-2xl"></div>
        </div>
        <div className="w-full h-[400px] border">image</div>
      </div>
    </div>
  );
};

export default Statistic;
