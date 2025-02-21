import Image from "next/image";
import { Button } from "@/components/ui/button";
import ModalWrapper from "@/components/shared/ModalWrapper/ModalWrapper";
import { Tag } from "antd";
import { Badge } from "@/components/ui/badge";
import { useAcceptQuoteByCustomerMutation } from "@/redux/api/quoteApi";
import { errorToast, successToast } from "@/utils/customToast";
import { Loader } from "lucide-react";
import pantoneToHex from "@/utils/pantoneToHex";
import { useRouter } from "next/navigation";

export default function QuoteApprovedModal({ open, setOpen, quote }) {
  const router = useRouter();

  // ================ Accept quote api handler ===================
  const [acceptQuote, { isLoading: isAccepting }] =
    useAcceptQuoteByCustomerMutation();

  const handleAcceptQuote = async () => {
    try {
      const acceptQuoteRes = await acceptQuote(quote?._id).unwrap();

      if (acceptQuoteRes?.success) {
        // Accepted quote becomes an Order
        // so, proceed to order/shopping history page

        successToast("Quote accepted");
        router.push("/user/shop-history");
      }
    } catch (error) {
      errorToast(error?.data?.message || error?.error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="mb-10">
        <div className="flex flex-col items-center gap-x-5 gap-y-5 lg:flex-row">
          <div className="h-[320px] lg:w-1/2">
            <Image
              src={quote?.frontSide}
              alt="user uploaded front design"
              height={1200}
              width={1200}
              className="mx-auto block h-full w-auto rounded-lg border border-primary-black/50 p-2"
            />
            <h3 className="text-center font-medium text-green-500/75">
              Front Design
            </h3>
          </div>

          <div className="h-[320px] lg:w-1/2">
            <Image
              src={quote?.backSide}
              alt="user uploaded back design"
              height={1200}
              width={1200}
              className="mx-auto block h-full w-auto rounded-lg border border-primary-black/50 p-2"
            />
            <h3 className="text-center font-medium text-green-500/75">
              Back Design
            </h3>
          </div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-6 gap-x-16">
        <div>
          <h4 className="mb-1 text-lg font-medium">Product</h4>
          <h5 className="text-lg font-extrabold text-black">{quote?.name}</h5>
        </div>

        <div>
          <h4 className="mb-1 text-lg font-medium">Category</h4>
          <h5 className="text-lg font-extrabold text-black">
            {quote?.category?.name}
          </h5>
        </div>

        <div>
          <h4 className="mb-1 text-lg font-medium">Approved Size & Quantity</h4>

          <div className="flex flex-row flex-wrap gap-2">
            {quote?.sizesAndQuantities?.map((item) => (
              <Tag
                color="geekblue"
                key={item._id}
                className="!text-sm !font-semibold"
              >
                {item.size} - {item.quantity}pcs
              </Tag>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-1 text-lg font-medium">Pantone Color</h4>
          <h5 className="flex items-center justify-center gap-x-2 text-lg font-extrabold text-black lg:justify-start">
            <div
              className="h-5 w-5 rounded-full"
              style={{
                backgroundColor: pantoneToHex(quote?.pantoneColor),
              }}
            />
            <p>{quote?.pantoneColor}</p>
          </h5>
        </div>
      </div>

      <div>
        <h4 className="mb-1 text-lg font-medium">Material Preferences</h4>
        <h5 className="break-all rounded-lg bg-slate-100 p-2 text-lg font-extrabold text-black">
          {quote?.materialPreferences}
        </h5>
      </div>

      <div className="col-span-2 mt-4">
        <h4 className="mb-1 text-lg font-medium">
          Comment from United Threads
        </h4>
        <h5 className="rounded-lg bg-slate-100 p-2 text-lg font-extrabold text-black">
          {quote?.comment || "N/A"}
        </h5>
      </div>

      <div className="flex-center-between mt-10 rounded-full border border-primary-black p-2">
        <h4 className="text-lg font-semibold">Estimated Total Amount</h4>
        <Badge
          variant="success"
          className="rounded-full py-1 text-base font-bold"
        >
          ${Number(quote?.price)?.toFixed(2)}
        </Badge>
      </div>

      <Button
        disabled={isAccepting}
        className="primary-button text group mt-5 w-full rounded-full py-6"
        onClick={handleAcceptQuote}
      >
        {isAccepting ? (
          <Loader size={26} className="animate-spin" />
        ) : (
          <>Accept Quote</>
        )}
      </Button>
    </ModalWrapper>
  );
}
