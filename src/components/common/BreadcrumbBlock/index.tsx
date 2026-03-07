import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FC, ReactNode } from "react";

interface Props {
  linkChain: {
    name: string;
    link: string | null;
  }[];
}

const BreadcrumbsBlock: FC<Props> = ({ linkChain }) => {
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
};

export default BreadcrumbsBlock;
