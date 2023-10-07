/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Toggle from "@/components/user/toggle";
import GoogleLogo from "@/components/icons/google-icon";
import AuthContext from "@/hooks/AuthContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  console.log({ router });

  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const inputChange = (e) => {
    const { id, value } = e.target;
    const newVals = { ...formVals, [id]: value };

    setFormVals(newVals);
  };

  // sweetalert設定
  const swalTest1 = Swal.mixin({
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (swalTest1) => {
      swalTest1.addEventListener("mouseenter", Swal.stopTimer);
      swalTest1.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //進來後判斷是否有登入
  useEffect(() => {
    if (auth.user_id && auth.user_email) {
      if (router.query.url) {
        router.push(router.query.url);
      } else {
        router.push("/");
      }
    }
  }, [router, auth.user_email, auth.user_id]);

  const sendForm = (e) => {
    const email_re = /.{8,}/;
    const password_re = /.{4,}/;
    e.preventDefault();

    const newErrors = {};

    if (!email_re.test(formVals.email)) {
      newErrors.email = "請填寫正確的 email";
    }
    if (!password_re.test(formVals.password)) {
      newErrors.password = "請填寫8個字元以上密碼";
    }
    setErrors(newErrors);

    //表示沒有錯誤
    if (Object.keys(newErrors).length === 0) {
      console.log("沒有錯誤");

      fetch("http://localhost:3002/login-jwt", {
        method: "POST",
        body: JSON.stringify(formVals),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((obj) => {
          console.log(obj);
          if (obj.success && obj.data?.email) {
            localStorage.setItem("auth", JSON.stringify(obj.data));

            //登入後跳轉
            setAuth(obj.data);
            console.log("登入成功");
            swalTest1.fire({
              title: "註冊成功",
              icon: "success",
            });
            location.href="/"
          }
        });
    } else {
      console.log("有錯喔");
    }
  };
  return (
    <>
      <div
        className="d-flex "
        style={{ backgroundColor: "#EBD8A9", height: 923 }}>
        <div className="d-block w-100">
          <span className="position-relativ">
            <img
              src="/images/薯哥去背.png"
              height={520}
              width={660}
              className="position-absolute"
              style={{ left: 400, top: 200 }}></img>
          </span>
        </div>
        <div
          className="d-block w-100"
          style={{
            backgroundColor: "white",
            height: 923,
            borderTopLeftRadius: 241,
          }}>
          <div className="container" style={{ marginTop: 100 }}>
            <div className="mt-5 w-100" style={{ paddingLeft: 100 }}>
              <Link href={"/"}>
                <span className="icon-home me-1"></span>
              </Link>
              <span className="icon-arrow-s-right"></span>
              <span>
                <Link href="#" className="text-dark fw-bold ms-1">
                  登入
                </Link>
              </span>
            </div>
            <div className="container mt-5">
              <Toggle></Toggle>
            </div>
            <div className="middle mt-5">
              <form noValidate onSubmit={sendForm}>
                <div className="form-floating mb-4">
                  <span className="form-text">{errors.email}</span>
                  <input
                    type="email"
                    className="form-control border-0 border-bottom rounded-0"
                    id="email"
                    placeholder="請輸入電子郵件"
                    style={{ height: 42, width: 600, color: "#AEAEAE" }}
                    onChange={inputChange}
                    value={formVals.email}
                  />
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control border-0 border-bottom rounded-0"
                    id="password"
                    placeholder="Password"
                    style={{ height: 42, width: 600, color: "#AEAEAE" }}
                    onChange={inputChange}
                    value={formVals.password}
                  />
                  <span className="form-text">{errors.password}</span>
                  <i
                    type="button"
                    className="far fa-eye-slash no-see-eye"
                    style={{ color: "#787878" }}></i>
                </div>
                <div style={{ marginTop: 100 }} className="middle">
                  <button
                    className="btn btn-big middle"
                    type="submit"
                    style={{ height: 60, width: 500, fontSize: 25 }}>
                    登入
                  </button>
                </div>
                <div className="mb-3 hr-sect">或是 第三方 登入</div>
                <div className="row mb-2 mt-3">
                  <div className="col-sm-12 text-start">
                    <div className="d-flex justify-content-center">
                      <GoogleLogo className="rounded-circle img-thumbnail"></GoogleLogo>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <p className="middle mt-3">
                    <span className="bottom-line-g fs-5 grey-ae">
                      沒有帳號？
                      <Link href="/user/register01" className="red-i">
                        註冊
                      </Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Head>
        <title>登入</title>
      </Head>
      <style jsx>
        {`
          .hr-sect {
            display: flex;
            flex-basis: 100%;
            align-items: center;
            color: #aeaeae;
            margin: 80px 0px;
            font-size: 18px;
          }
          .hr-sect:before,
          .hr-sect:after {
            content: "";
            flex-grow: 1;
            background: #cdcdcd;
            height: 1px;
            font-size: 0px;
            line-height: 0px;
            margin: 0px 30px;
          }
          .no-see-eye {
            position: relative;
          }
          .no-see-eye:before {
            position: absolute;
            left: 555px;
            bottom: 35px;
          }
        `}
      </style>
    </>
  );
}
