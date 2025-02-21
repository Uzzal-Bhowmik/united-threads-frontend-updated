"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Check } from "lucide-react";
import { useGetQuotesQuery } from "@/redux/api/quoteApi";
import { format } from "date-fns";
import QuoteApprovedModal from "./QuoteApprovedModal";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import { Button } from "@/components/ui/button";
import pantoneToHex from "@/utils/pantoneToHex";
import TableLoaderWithEmpty from "@/components/TableLoaderWithEmpty/TableLoaderWithEmpty";

const TABLE_HEADERS = [
  "Quote ID",
  "Product",
  "Category",
  "Pantone",
  "Quote Created",
  "Action",
];

// const ORDER_STATUS = ["All", "Pending", "Shipped", "Delivered"];

export default function ShadeApprovedTable() {
  const [showApprovedQuoteModal, setShowApprovedQuoteModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState({});
  // const [selectedStatus, setSelectedStatus] = useState("All");

  const query = {};
  query["quoteStatus"] = "processing";

  // ================== Pagination ===============
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  query["page"] = currentPage;
  query["limit"] = pageSize;
  query["isAccepted"] = false;

  // ================== Get Pending Quotes =================
  const { data: approvedQuotesRes, isLoading } = useGetQuotesQuery(query);
  const approvedQuotes = approvedQuotesRes?.data || [];
  const meta = approvedQuotesRes?.data?.meta || {};

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-lightGray hover:bg-lightGray">
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className="whitespace-nowrap text-lg font-semibold text-primary-black"
                style={{ paddingBlock: "14px" }}
              >
                {header !== "Status" && header}

                {header === "Status" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex-center-start gap-x-3">
                      Status <ChevronsUpDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {ORDER_STATUS.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => setSelectedStatus(status)}
                        >
                          {selectedStatus === status && (
                            <Check className="mr-1" size={16} />
                          )}

                          <button
                            className={selectedStatus !== status && "ml-4"}
                          >
                            {status}
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody style={{ padding: "14px" }}>
          {/* ======== Show loading or empty if no pending quotes ======== */}
          <TableLoaderWithEmpty isLoading={isLoading} data={approvedQuotes} />

          {!isLoading &&
            approvedQuotes?.length > 0 &&
            approvedQuotes?.map((quote) => (
              <TableRow
                key={quote?._id}
                className="border-b border-primary-black/15"
              >
                <TableCell className="py-5 font-medium">
                  #{quote?._id}
                </TableCell>
                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  {quote?.name}
                </TableCell>
                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  {quote?.category?.name}
                </TableCell>

                <TableCell className="flex w-max items-center gap-x-2 whitespace-nowrap py-8 font-medium">
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{
                      backgroundColor: pantoneToHex(quote?.pantoneColor),
                    }}
                  />

                  {quote?.pantoneColor}
                </TableCell>

                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  {quote?.createdAt &&
                    format(quote?.createdAt, "dd-MM-yyyy, hh:mm a")}
                </TableCell>

                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  <div className="flex-center-start gap-x-4">
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowApprovedQuoteModal(!showApprovedQuoteModal);
                          setSelectedQuote(quote);
                        }}
                        className="group gap-x-2"
                      >
                        View Details
                        <AnimatedArrow />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {approvedQuotes?.length > 9 && (
        <div className="ms-auto mt-8 w-max">
          <CustomPagination
            total={meta?.total}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {/* Order Modal */}
      <QuoteApprovedModal
        open={showApprovedQuoteModal}
        setOpen={setShowApprovedQuoteModal}
        quote={selectedQuote}
      />
    </>
  );
}
