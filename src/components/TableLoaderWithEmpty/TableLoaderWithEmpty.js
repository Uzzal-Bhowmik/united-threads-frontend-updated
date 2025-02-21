import { Loader } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import EmptyContainer from "../EmptyContainer/EmptyContainer";

export default function TableLoaderWithEmpty({ isLoading, data }) {
  return (
    <>
      {/* ======== Show loading when fetching ======== */}
      {isLoading && (
        <TableRow className="!h-48">
          <TableCell colSpan={8}>
            <Loader className="mx-auto animate-spin" size={30} />
          </TableCell>
        </TableRow>
      )}

      {/* ============ Show empty if no pending quotes found =========== */}
      {!isLoading && data?.length === 0 && (
        <TableRow className="!h-48">
          <TableCell colSpan={8}>
            <EmptyContainer message="No data found" />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
