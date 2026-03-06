import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { ReactNode } from "react";

export function BreadcrumbsBlock({ linkChain }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {linkChain.map((i, index) => {
          const LinkWrap = ({ children }: { children: ReactNode }) =>
            i.link ? <Link href={i.link}>{children}</Link> : <>{children}</>;
          return (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <LinkWrap>{i.name}</LinkWrap>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {index !== linkChain.length - 1 && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
