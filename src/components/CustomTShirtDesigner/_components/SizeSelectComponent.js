"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export default function SizeSelectComponent({
  control,
  sizes,
  setValue,
  errors,
}) {
  const [sizeAndQuantities, setSizeAndQuantities] = useState([]);

  // Set initial sizeAndQuantities for the form
  useEffect(() => {
    if (sizes?.length > 0) {
      // Initialize the quantity fields for each size to undefined (no default quantity)
      const initialSizeAndQuantities = sizes?.map((size) => ({
        size: size,
        quantity: undefined,
        selected: false,
      }));

      setSizeAndQuantities(initialSizeAndQuantities);

      // Initialize form values with empty quantity
      setValue("sizeAndQuantities", initialSizeAndQuantities);
    }
  }, [sizes, setValue]);

  const handleCheckboxChange = (index, value) => {
    const updatedSizes = [...sizeAndQuantities];
    updatedSizes[index].selected = value;
    setSizeAndQuantities(updatedSizes);

    // Filter selected sizes
    const filterSelectedSizes = sizeAndQuantities
      .filter((item) => item.selected)
      .map((item) => ({ size: item.size, quantity: Number(item.quantity) }));

    // Update form value when checkbox is changed
    setValue(`sizeAndQuantities`, filterSelectedSizes);
  };

  const handleQuantityChange = (index, value) => {
    const updatedSizes = [...sizeAndQuantities];
    updatedSizes[index].quantity = value;
    setSizeAndQuantities(updatedSizes);

    // Filter selected sizes
    const filterSelectedSizes = sizeAndQuantities
      .filter((item) => item.selected)
      .map((item) => ({ size: item.size, quantity: Number(item.quantity) }));

    // Update form value when quantity is changed
    setValue(`sizeAndQuantities`, filterSelectedSizes);
  };

  if (sizes?.length < 1) {
    return null;
  }

  return (
    <div>
      <label htmlFor="sizeAndQuantities" className="mb-2 block font-medium">
        Select Size and Quantity
      </label>

      <section className="space-y-4">
        <div>
          {sizeAndQuantities?.map((item, index) => (
            <div key={item.size}>
              <div className="flex flex-col items-center gap-4 p-2 lg:flex-row">
                {/* Sizes checkbox */}
                <div className="flex-center-start w-[80px] gap-2">
                  <Checkbox
                    id={item.size}
                    checked={item.selected}
                    onCheckedChange={(value) =>
                      handleCheckboxChange(index, value)
                    }
                  ></Checkbox>

                  <label htmlFor={item.size} className="cursor-pointer text-lg">
                    {item.size}
                  </label>
                </div>

                {/** Quantity input appears only if the size is selected */}
                {item.selected && (
                  <Input
                    type="number"
                    value={item.quantity || ""}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    placeholder={"Enter quantity for size: " + item.size}
                    className="my-2 w-full rounded-xl border border-primary-black/50 lg:w-1/4"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {errors.sizeAndQuantities && (
        <p className="mt-1 text-danger">Size and quantity is required</p>
      )}
    </div>
  );
}
