"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";

const Header = ({ links, selectedCode, setSelectedCode }) => {
  console.log(links);

  useEffect(() => {
    if (links.length) {
      setSelectedCode(links[0].code);
    }
  }, [links]);

  const onSelectLink = (code: string) => {
    setSelectedCode(code);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytic for link </h1>
      <div className="flex border rounded-2xl shadow-md p-10 divide-x-2">
        <div className="pr-5">
          {" "}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex justify-between items-center"
              asChild
            >
              <Button
                variant="outline"
                className="flex justify-between items-center w-40"
              >
                <p>{selectedCode}</p>
                <span>-</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>All link's code</DropdownMenuLabel>
              {links?.map(({ code }) => (
                <DropdownMenuItem key={code} onClick={() => onSelectLink(code)}>
                  {code}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <p className="text-lg px-5">
            Total clicks:
            <span className="text-xl font-bold">123</span>
          </p>
        </div>

        <div>
          <p className="text-lg px-5">
            Unique users:
            <span className="text-xl font-bold">12</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
