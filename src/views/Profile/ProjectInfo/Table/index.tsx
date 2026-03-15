import { removeLink } from "@/api/links";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/lib/axiosConfig";
import { copy } from "@/lib/utils";
import { IEvent } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy, Database } from "lucide-react";
import { FC } from "react";

const linkCreator = (code: string) =>
  BASE_URL.replace("/api", "") + "/link/info/" + code;

interface TableDemoProps {
  links: {
    id: string;
    code: string;
    events: IEvent[];
  }[];
  projectId: string;
}
const TableDemo: FC<TableDemoProps> = ({ links, projectId }) => {
  console.log(links);
  const queryClient = useQueryClient();
  const { mutate: onRemoveLink } = useMutation({
    mutationFn: removeLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links", projectId],
        exact: true,
      });
    },
  });

  const onRemove = (linkId: string) => {
    onRemoveLink(linkId);
  };

  return (
    <div className="border shadow-md mt-4 rounded-md p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Short link</TableHead>
            <TableHead className="w-auto text-center">Click</TableHead>
            <TableHead className="text-center w-[90px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {!!links?.length && (
          <TableBody>
            {links?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {linkCreator(item.code)}
                  <Button
                    variant="ghost"
                    onClick={() => copy(linkCreator(item.code))}
                  >
                    <Copy />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  {item.events.length}
                </TableCell>

                <TableCell className="text-end">
                  <Button
                    variant="destructive"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}

        {!links?.length && (
          <TableRow>
            <TableCell colSpan={3} className="h-[140px]">
              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Database className="w-8 h-8 opacity-60" />
                <p className="text-sm">Empty data</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </div>
  );
};

export default TableDemo;
