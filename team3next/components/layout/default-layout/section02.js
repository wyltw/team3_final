import React from "react";
import Card from "../card";
import Link from "next/link";

export default function Section02() {
  return (
    <>
      <div className="container mt-5">
        <h4 className="h4-title mb-4">台北市食記</h4>
        <div className="row row-cols-1 row-cols-md-3 container mx-auto">
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
        <Link href={"/"} className="middle grey fs18b mt-5">
          看更多
        </Link>
      </div>
    </>
  );
}