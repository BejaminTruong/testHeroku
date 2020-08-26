import React from "react";
import formStyle from "./BTFormInput.module.css";
import Swal from "sweetalert2";
import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import { Howl, Howler } from "howler";
import ugotThat from "./u-got-that-full-version.mp3";
import nope from "./engineer_no01_1.mp3";
import earRape from "./ear-rape-moaning-girl-troll-sound-crappy-long-edition-loudtronix-hq.mp3";
import "animate.css";
export const BTFormInput = () => {
  // Change global volume.
  Howler.volume(1.0);
  const [state, setstate] = useState({
    values: {
      firstName: "",
      lastName: "",
      account: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {
      firstName: "",
      lastName: "",
      account: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  let {
    firstName,
    lastName,
    account,
    email,
    password,
    confirmPassword,
  } = state.values;
  let handleChange = (e) => {
    let { name, value, type } = e.target;
    let updatedValues = { ...state.values, [name]: value };
    var updatedErrors = {
      ...state.errors,
      [name]: value.trim() === "" ? `${name} Không được bỏ trống` : "",
    };
    if (type === "email") {
      let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(value)) {
        updatedErrors[name] = name + " không hợp lệ";
      }
    }
    var updatedState = {
      values: updatedValues,
      errors: updatedErrors,
    };
    setstate(updatedState);
    console.log(state.values);
  };
  const MySwal = withReactContent(Swal);
  let handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    for (let key in state.values) {
      if (state.values[key] === "") {
        valid = false;
        break;
      }
    }
    for (let key in state.errors) {
      if (state.errors[key] !== "") {
        valid = false;
      }
    }
    if (state.values.password !== state.values.confirmPassword) {
      valid = false;
    }
    if (!valid) {
      MySwal.fire({
        showClass: {
          popup: "animate__animated animate__jackInTheBox",
        },
        hideClass: {
          popup: "animate__animated animate__hinge",
        },
        timer: 1500,
        showConfirmButton: false,
        icon: "error",
        text: "NOPE! TRY AGAIN",
        imageUrl:
          "https://media1.tenor.com/images/2bce191d4c082b25287f44cc7a3abdd7/tenor.gif?itemid=12504325",
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: "UNACCEPTABLE",
      });
      // Setup the new Howl.
      const sound2 = new Howl({
        src: nope,
      });
      // Play the sound.
      sound2.play();
      return;
    }
    // Setup the new Howl.
    const sound = new Howl({
      src: ugotThat,
      loop: true,
    });
    MySwal.fire({
      html: (
        <div>
          <p>
            Full Name: {firstName} {lastName}
          </p>
          <p>Account: {account}</p>
          <p>Email: {email}</p>
          <p>Password: {password}</p>
          <p>Password Confirmed: {confirmPassword}</p>
        </div>
      ),
      title: "U GOT THAT",
      backdrop: `
      url("https://media1.tenor.com/images/67f3cde62f1d53330094ba27c59b11e1/tenor.gif?itemid=13248430")
      `,
      imageUrl:
        "https://media1.tenor.com/images/179c35d5d738dc15c3397015c0164509/tenor.gif?itemid=15996122",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "NOICE",
      showClass: {
        popup: "animate__animated animate__lightSpeedInLeft",
      },
      hideClass: {
        popup: "animate__animated animate__lightSpeedOutRight",
      },
    }).then(() => {
      sound.stop();
    });
    // Play the sound.
    sound.play();
    // Change global volume.
    Howler.volume(1.0);
  };

  return (
    <body>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "500px",
          backgroundColor: "#fff",
          padding: "30px",
        }}
      >
        <h2>THÔNG TIN NGƯỜI DÙNG</h2>
        <div className={formStyle.group2}>
          <div style={{ width: "45%" }} className={formStyle.group}>
            <input
              required
              onChange={handleChange}
              type="text"
              name="firstName"
            />
            <label className={formStyle.highlight}>Họ</label>
            <div className={formStyle.bar}></div>
            <small>{state.errors.firstName}</small>
          </div>
          <div style={{ width: "45%" }} className={formStyle.group}>
            <input
              required
              onChange={handleChange}
              type="text"
              name="lastName"
            />
            <label className={formStyle.highlight}>Tên</label>
            <div className={formStyle.bar}></div>
            <small>{state.errors.lastName}</small>
          </div>
        </div>

        <div className={formStyle.group}>
          <input required onChange={handleChange} type="text" name="account" />
          <label className={formStyle.highlight}>Tài Khoản</label>
          <div className={formStyle.bar}></div>
          <small>{state.errors.account}</small>
        </div>
        <div className={formStyle.group}>
          <input required onChange={handleChange} type="email" name="email" />
          <label className={formStyle.highlight}>Email</label>
          <div className={formStyle.bar}></div>
          <small>{state.errors.email}</small>
        </div>
        <div className={formStyle.group2}>
          <div style={{ width: "45%" }} className={formStyle.group}>
            <input
              required
              onChange={handleChange}
              type="password"
              name="password"
            />
            <label className={formStyle.highlight}>Mật Khẩu</label>
            <div className={formStyle.bar}></div>
            <small>{state.errors.password}</small>
          </div>
          <div style={{ width: "45%" }} className={formStyle.group}>
            <input
              required
              onChange={handleChange}
              type="password"
              name="confirmPassword"
            />
            <label className={formStyle.highlight}>Xác Nhận</label>
            <div className={formStyle.bar}></div>
            <small>{state.errors.confirmPassword}</small>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className={formStyle.btnForm + " btn"}>XÁC NHẬN</button>
        </div>
      </form>
      <button
        onClick={() => {
          const sound3 = new Howl({
            src: earRape,
            loop: true,
          });
          sound3.play();
          MySwal.fire({
            title: "TOLD YA :)",
            imageUrl:
              "https://media1.tenor.com/images/15e77aed58f4f90d4f93c11e5a5ab7d2/tenor.gif?itemid=11804143",
            imageHeight: 400,
            imageWidth: 300,
            showClass: {
              popup: "animate__animated animate__rollIn",
            },
            hideClass: {
              popup: "animate__animated animate__rollOut",
            },
          }).then(() => {
            sound3.stop();
          });
        }}
        style={{ position: "absolute", top: "0", right: "0" }}
        className="btn btn-danger"
      >
        I WARNED YOU, DO NOT PRESS THIS BUTTON
      </button>
    </body>
  );
};
