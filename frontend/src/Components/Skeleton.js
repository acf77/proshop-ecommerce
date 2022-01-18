import React from "react";

export default function Skeleton() {
  const productSkeleton = () => {
    <div className="productSk">
      <div className="productTitleSk"></div>
      <div className="productReviewSk"></div>
      <div className="productPriceSk"></div>
    </div>;
  };

  return productSkeleton;
}
