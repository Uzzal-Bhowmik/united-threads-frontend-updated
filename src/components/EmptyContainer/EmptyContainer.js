import { Empty } from "antd";
import React from "react";

export default function EmptyContainer({ className, message }) {
  return (
    <div className={className}>
      <div>
        <Empty description={message || "No data"} className="!font-medium" />
      </div>
    </div>
  );
}
