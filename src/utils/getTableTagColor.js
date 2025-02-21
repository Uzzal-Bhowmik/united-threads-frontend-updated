export const getTableTagColor = (status) => {
  switch (status) {
    case "PENDING":
      return "blue";
    case "SHIPPED":
      return "purple";
    case "DELIVERED":
      return "green";
    case "CANCELED":
      return "red";
    case "PAID":
      return "green";
    case "UNPAID":
      return "red";
    default:
      return "bg-red-500";
  }
};
