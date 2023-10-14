import React from "react";
import styles from "@/pages/product/index.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Bread() {
  const router = useRouter();

  const path = router.pathname.split("/")[1];

  const pathname =
    path == "product"
      ? "嗑零食"
      : path == "user"
      ? "使用者"
      : path == "post"
      ? "食記"
      : "餐廳";
  // console.log(pathname);

  return (
    <>
      <div className={styles.bread + " mb-2 ms-2"}>
        <a href="/">
          <span className="icon-home"></span>
        </a>
        <span className="icon-arrow-s-right"></span>
        <a href={"/" + path}>{pathname}</a>
      </div>
    </>
  );
}
