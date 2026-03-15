import AuthPopup from "@/components/popups/AuthPopup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex items-start mt-20">
      <div className="flex flex-col w-full gap-5">
        <h1 className="font-bold text-5xl ">
          Shorten, Share & Track <br />
          Your links
        </h1>
        <p className="text-lg">
          Create short link an monitor theit perfomance with powerful analytics
        </p>

        <div className="flex w-full h-[50px] max-w-lg items-stretch rounded-md border border-input bg-background focus-within:ring-1 focus-within:ring-ring">
          <Input
            placeholder="Enter email"
            className="border-0 rounded-none h-[50px] rounded-l-md focus-visible:ring-0"
          />
          <Button type="submit" className="h-[50px] rounded-none rounded-r-md">
            Send
          </Button>
        </div>
      </div>
      <div className="w-full h-[400px] border">
        {" "}
        <AuthPopup param="login" />{" "}
      </div>
    </div>
  );
};

export default Hero;
