"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import ShadePendingModal from "./ShadePendingModal";
import { useGetQuotesQuery } from "@/redux/api/quoteApi";
import { format } from "date-fns";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import pantoneToHex from "@/utils/pantoneToHex";
import TableLoaderWithEmpty from "@/components/TableLoaderWithEmpty/TableLoaderWithEmpty";

const TABLE_HEADERS = [
  "Quote ID",
  "Product",
  "Category",
  // "Quantity",
  // "Size",
  "Pantone",
  "Quote Created",
  "Action",
];

export default function ShadePendingTable() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const query = {};
  query["quoteStatus"] = "pending";
  const [selectedQuote, setSelectedQuote] = useState({});

  // ================== Pagination ===============
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  query["page"] = currentPage;
  query["limit"] = pageSize;

  // ================== Get Pending Quotes =================
  const { data: pendingQuotesRes, isLoading } = useGetQuotesQuery(query);
  const pendingQuotes = pendingQuotesRes?.data || [];
  const meta = pendingQuotesRes?.data?.meta || {};

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-lightGray">
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className="whitespace-nowrap text-lg font-semibold text-primary-black"
                style={{ padding: "14px" }}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* ======== Show loading when fetching or empty if no pending quotes found ======== */}
          <TableLoaderWithEmpty isLoading={isLoading} data={pendingQuotes} />

          {/* =========== Pending Quotes =========== */}
          {!isLoading &&
            pendingQuotes?.length > 0 &&
            pendingQuotes.map((quote) => (
              <TableRow
                key={quote?._id}
                className="border-b border-primary-black/15"
              >
                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  #{quote?._id}
                </TableCell>
                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  {quote?.name}
                </TableCell>
                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  {quote?.category?.name}
                </TableCell>

                <TableCell className="flex w-max items-center gap-x-2 whitespace-nowrap py-5 font-medium">
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
                    format(quote?.createdAt, "dd-MMM-yyyy, hh:mm a")}
                </TableCell>

                <TableCell className="w-max whitespace-nowrap py-5 font-medium">
                  <div className="flex-center-start gap-x-4">
                    <div>
                      <button
                        onClick={() => {
                          setShowOrderModal(!showOrderModal);
                          setSelectedQuote(quote);
                        }}
                      >
                        <EyeIcon size={20} color="#292929" />
                      </button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {pendingQuotes?.length > 9 && (
        <div className="ms-auto mt-8 w-max">
          <CustomPagination
            total={meta?.total}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}

      {/* Quote Details Modal */}
      <ShadePendingModal
        quote={selectedQuote}
        open={showOrderModal}
        setOpen={setShowOrderModal}
      />
    </>
  );
}
