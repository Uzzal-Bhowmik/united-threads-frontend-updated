"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { Tag } from "antd";
import { getTableTagColor } from "@/utils/getTableTagColor";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Loader } from "lucide-react";
import pantoneToHex from "@/utils/pantoneToHex";

export default function OrderContainer({ orderId }) {
  // ================ Get single order details ================
  const { data: orderRes, isLoading } = useGetSingleOrderQuery(orderId, {
    skip: !orderId,
  });

  const order = orderRes?.data || {};

  if (isLoading) {
    return (
      <div className="mx-auto w-max">
        <Loader className="animate-spin" size={30} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[75vh] flex-col items-center gap-y-10 lg:w-full lg:flex-row lg:gap-x-20">
      {/* Left */}
      <div className="w-full lg:w-[60%]">
        <Link
          href="/user/shop-history"
          className="flex-center mb-10 h-8 w-8 rounded-full border border-primary-black transition-all duration-300 ease-in-out hover:bg-primary-black hover:text-white"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <div className="flex flex-col items-start justify-between gap-y-3 lg:flex-row lg:items-center lg:gap-y-0">
            <h3 className="text-lg font-bold md:text-2xl">
              Order ID: <span className="text-orange-400">#{order?._id}</span>
            </h3>

            {/* Order Status Button */}
            <Tag
              color={getTableTagColor(order?.status)}
              style={{ fontWeight: "bold", fontSize: "1rem" }}
              size="large"
            >
              {order?.status}
            </Tag>
          </div>

          <div className="text-muted-foreground mt-5 space-y-1 font-medium">
            <p className="flex items-center justify-between">
              <span className="w-1/2 font-semibold">Date:</span>
              {order?.createdAt &&
                format(order?.createdAt, "dd MMM yyyy, hh:mm a")}
            </p>
            <p className="flex items-center justify-between">
              <span className="w-1/2 font-semibold">Contact No:</span>
              {order?.user?.contact}
            </p>

            <p className="flex items-center justify-between">
              <span className="w-1/2 font-semibold">Shipping Address:</span>
              <span>
                {order?.houseNo && `${order?.houseNo},`}{" "}
                {order?.area && `${order?.area},`} {order?.city}, {order?.state}
                , {order?.country}
              </span>
            </p>
          </div>
        </div>

        {/* Color and payment Status */}
        <div className="flex-center-start mt-20 flex-wrap gap-x-10">
          <div className="flex-center-start gap-x-3 text-xl font-semibold">
            <h4>Color: </h4>
            <div className="flex-center-start gap-x-2">
              <div
                className="h-6 w-6 rounded-full border shadow-md"
                style={{
                  backgroundColor:
                    order?.orderType === "QUOTE"
                      ? order?.color
                      : pantoneToHex(order?.color),
                }}
              />

              <p>
                {order?.orderType === "QUOTE"
                  ? order?.quote?.pantoneColor
                  : order?.color}
              </p>
            </div>
          </div>

          {/* Payment status */}
          <div className="flex-center-start gap-x-5 text-xl font-semibold">
            <h4>Payment: </h4>
            <Tag color={getTableTagColor(order?.paymentStatus)}>
              {order?.paymentStatus}
            </Tag>
          </div>

          {/* Size and quantities for shop order */}
          {order?.orderType === "SHOP" && (
            <>
              <div className="flex-center-start gap-x-5 text-xl font-semibold">
                <h4>Quantity: </h4>

                {order?.quantity}
              </div>

              <div className="flex-center-start gap-x-5 text-xl font-semibold">
                <h4>Size: </h4>

                {order?.size}
              </div>
            </>
          )}
        </div>

        {/* Size and quantities for quote order */}
        {order?.orderType === "QUOTE" && (
          <div className="mt-8">
            <h4 className="text-xl font-semibold">Size & Quantities</h4>

            <div className="mt-2 flex flex-row flex-wrap gap-4">
              {order?.quote?.sizesAndQuantities?.map((item) => (
                <Tag
                  color="geekblue"
                  key={item._id}
                  className="!text-base !font-semibold"
                >
                  {item.size} - {item.quantity}pcs
                </Tag>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-5 bg-primary-black" />

        {/* Subtotal */}
        <div className="flex-center-between text-2xl font-bold text-primary-black">
          <h4>Subtotal: </h4>
          <h4>
            $
            {order?.orderType === "QUOTE"
              ? order?.amount
              : (Number(order?.amount) * Number(order?.quantity)).toFixed(2)}
          </h4>
        </div>
      </div>

      {/* Right */}
      <div className="h-[400px] w-full md:w-1/2 lg:w-1/3">
        <div className="mx-auto h-full max-w-max rounded-xl bg-gray-300">
          <Carousel className="h-full">
            <CarouselContent className="h-full">
              {order?.product?.images?.length > 0 ? (
                <>
                  {order?.product?.images?.map((img) => (
                    <CarouselItem
                      key={img}
                      className="flex h-[400px] items-center"
                    >
                      <Image
                        src={img?.url}
                        alt="product image"
                        width={1200}
                        height={1200}
                        className="mx-auto h-auto w-auto"
                      />
                    </CarouselItem>
                  ))}
                </>
              ) : (
                <>
                  {[order?.quote?.backSide, order?.quote?.frontSide]?.map(
                    (img) => (
                      <CarouselItem
                        key={img}
                        className="flex h-[400px] items-center"
                      >
                        <Image
                          src={img}
                          alt="product image"
                          width={1200}
                          height={1200}
                          className="mx-auto max-w-max"
                        />
                      </CarouselItem>
                    ),
                  )}
                </>
              )}
            </CarouselContent>

            <div className="hidden lg:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
