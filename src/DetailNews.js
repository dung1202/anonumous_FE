import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Detailcss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

import {
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Modal,
  Button,
} from "react-bootstrap";
import * as Scroll from "react-scroll";
import { getUserById, Login, getNews, getNewsById, checkToken } from "./Axios";
export default function DetailNews(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [show, setShow] = useState(false);
  const [scrollTop, setScrollTop] = useState();
  const [sp, setsp] = useState("");
  const [Product_is_hot, setProduct_is_hot] = useState([]);
  const [err, seterr] = useState("");
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () =>
    setPasswordShown(!passwordShown ? true : false);
  const gotoCart = () => {
    if (Avatar) navigate("/cart");
    else {
      setShow_acc(true);
    }
  };
  const submit = () => {
    const body = {
      username,
      password,
    };
    if (username.length === 0 || password === 0) {
      seterr("Phải nhập đủ tên đăng nhập và mật khẩu");
    } else if (
      username.length < 8 ||
      username.length > 30 ||
      password.length > 30 ||
      password.length < 8
    ) {
      seterr("Tên đăng nhập hoặc mật khẩu sai");
    } else {
      Login(body).then((res) => {
        if (res.data.message !== "Login successfully!") {
          seterr("Tên đăng nhập hoặc mật khẩu sai");
        } else if (res.data.message === "Login successfully!") {
          setToken(res.data.accessToken);
          props.them();
          localStorage.setItem("accessToken", res.data.accessToken);
          setShow_acc(false);
          seterr("");
        }
      });
    }
  };
  const gotoRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    let Token = localStorage.getItem("accessToken");
    if (Token) {
      try {
        const userID = jwt_decode(Token)._id;
        checkToken().then((res) => {
          if (res.data.message === "Token is valid") {
            getUserById(userID).then((res) => {
              const user = res.data;
              setAvatar(user.photoUrl);
              setToken(Token);
            });
          }
        });
      } catch (error) {
        setToken("");
        setAvatar("");
      }
    }
  }, [token]);
  useEffect(() => {
    getNews(1).then((res) => {
      setProduct_is_hot(res.data.data);
    });
  }, []);
  const [show_acc, setShow_acc] = useState(false);

  const handle_accClose = () => {
    setShow_acc(false);
    seterr("");
  };
  const handle_accShow = () => setShow_acc(true);

  const gotoHome = () => {
    navigate("/");
  };

  const gotoNews = () => {
    navigate("/news");
  };

  const gotoProfile = () => {
    navigate("/profile");
  };

  useEffect(() => {
    getNewsById(params.id).then((res) => {
      setsp(res.data.data[0]);
      console.log(res.data);
    });
    window.scrollTo(10, 0);
  }, [params.id]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const gotoProduct = () => {
    navigate("/product");
  };

  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const pro = (item, index) => {
    if (index < 5) {
      const date = new Date(item.createdAt);
      const day = validateNiceNumber(date.getDate());
      const ok = validateNiceNumber(date.getMonth() + 1);
      const nam = date.getFullYear();

      let string_name = "";
      let d = 0;
      for (let i = 0; i < item.title.length; i++) {
        if (d <= 9) {
          if (item.title[i] === " ") d++;
          if (d < 11) string_name += item.title[i];
        } else {
          string_name += "...";
          break;
        }
      }
      return (
        <Link to={"/detail-news/" + item._id}>
          <div className="news">
            <div style={{ marginRight: "10px" }}>
              <img src={item.image} className="avatar_news" alt="" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "5px" }}>
                    <div className="user_news" style={{ fontWeight: "600" }}>
                      {item.creator}
                    </div>
                    <div className="user_news">
                      {day}/{ok}/{nam}
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <div className="content">
                      {string_name.charAt(0).toUpperCase() +
                        string_name.slice(1)}
                    </div>
                    <div className="cont">
                      {/* {ReactHtmlParser(item.content)} */}
                    </div>
                    {/* <div className="hastack">{item.tags.map(map_hastack)}</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
  };

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return (
    <div>
      <Helmet>
        <title>{sp.title}</title>
      </Helmet>
      <div className="windown layer1">
        <div className="header" id="header_top">
          <div className="ok1">
            <img
              alt=""
              src="/menu.png"
              className="menu1"
              onClick={handleShow}
            />

            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <input
                    style={{ marginTop: "17px" }}
                    className="input"
                    type="text"
                    placeholder="Search"
                  />
                  <img alt="" className="layer" src="/Layer.png" />
                </div>
                <div className="text_header1" onClick={gotoHome}>
                  Trang chủ
                </div>
                <div className="text_header1" onClick={gotoProduct}>
                  Sản phẩm
                </div>
                <div className="text_header1" onClick={gotoNews}>
                  Tin Tức
                </div>
                <div style={{ display: "flex" }}>
                  <div className="text_header1">Hỏi đáp</div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
          <div>
            <div
              className="ok"
              style={{ display: "flex", flex: "1" }}
              onClick={gotoHome}
            >
              <div>
                <img
                  alt=""
                  className="logo"
                  src="/logo-removebg-preview (1).png"
                />
              </div>
              <div style={{ width: "80px", opacity: "0.8" }}>
                <img alt="" className="logo-chu" src="/logo-chu.png" />
              </div>
            </div>
          </div>
          <div>
            <div className="ok1">
              <div style={{ display: "flex" }} onClick={gotoCart}>
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
                >
                  <img className="shop" src="/Shop.png" alt="" />
                </OverlayTrigger>
                <div className="donhang">
                  {props.soluong ? props.soluong : 0}
                </div>
              </div>
              <div>
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom">
                      {Avatar ? "Profile" : "Sign In"}
                    </Tooltip>
                  }
                >
                  {Avatar ? (
                    <img
                      className="shop shop1"
                      onClick={gotoProfile}
                      src={Avatar}
                      alt=""
                    />
                  ) : (
                    <img
                      className="shop shop1"
                      onClick={handle_accShow}
                      src="/acc.png"
                      alt=""
                    />
                  )}
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="ok2">
            <div className="text_header text_header_first" onClick={gotoHome}>
              Trang chủ
            </div>
            <div className="text_header" onClick={gotoProduct}>
              Sản phẩm
            </div>
            <div className="text_header" onClick={gotoNews}>
              Tin Tức
            </div>
            <div className="text_header">Hỏi đáp</div>
          </div>
          <div className="img_last">
            <div>
              <input
                style={{ marginTop: "17px" }}
                className="input"
                type="text"
                placeholder="Search"
              />
            </div>
            <div>
              <img alt="" className="layer" src="/Layer.png" />
            </div>
            <div style={{ display: "flex" }} onClick={gotoCart}>
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
              >
                <img className="shop" src="/Shop.png" alt="" />
              </OverlayTrigger>
              <div className="donhang">{props.soluong ? props.soluong : 0}</div>
            </div>
            <div>
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-bottom">
                    {Avatar ? "Profile" : "Sign In"}
                  </Tooltip>
                }
              >
                {Avatar ? (
                  <img
                    className="shop shop1"
                    onClick={gotoProfile}
                    src={Avatar}
                    alt=""
                  />
                ) : (
                  <img
                    className="shop shop1"
                    onClick={handle_accShow}
                    src="/acc.png"
                    alt=""
                  />
                )}
              </OverlayTrigger>
            </div>
          </div>
        </div>
        {sp ? (
          <div className="rong">
            <div className="detail_sp">
              <div>
                <div style={{ fontWeight: "600", fontSize: "2rem" }}>
                  {sp.title}
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: sp.content,
                  }}
                ></div>
                <div style={{ marginTop: "20px" }}>Viết bài: {sp.creator}</div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="chu_gt" id="sp_hot">
          <div className="list">
            <div>Tin tức mới nhất</div>
          </div>
          <div className="bonus" onClick={gotoNews}>
            Xem thêm ->
          </div>
        </div>

        <div style={{ padding: "30px 5vw 0px 5vw" }}>
          {Product_is_hot.map(pro)}
        </div>

        <div className="footer1">
          <div className="footer_flex">Menu</div>
          <div className="footer_flex">Thanh Toán</div>
          <div className="footer_flex">Đối tác liên kết</div>
          <div className="footer_flex">Mobile app</div>
        </div>

        <div className="footer2">
          <div style={{ flex: "1", cursor: "pointer" }}>
            <div className="menu" onClick={gotoHome}>
              Trang chủ
            </div>
            <div className="menu" onClick={gotoProduct}>
              Sản phẩm
            </div>
            <div className="menu" onClick={gotoNews}>
              Tin Tức
            </div>
            <div className="menu us">
              <div>Hỏi đáp</div>
            </div>
          </div>
          <div className="footer_flex">
            <img alt="" src="/tt1.png" className="img_footer" />
            <div>
              <img alt="" src="/tt2.png" className="img_footer_1" />
            </div>
          </div>
          <div className="footer_flex"></div>
          <div className="footer_flex">
            <img alt="" src="/app1.png" className="img_footer app" />
            <div>
              <img alt="" src="/app2.png" className="img_footer app" />
            </div>
          </div>
        </div>
      </div>
      <div className="layer3" style={{ zIndex: scrollTop > 40 ? "2" : "0" }}>
        <div className="on_top1">
          <Scroll.Link activeClass="active" to="header_top">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">To the top</Tooltip>}
              >
                <img alt="" src="/onTop.png" />
              </OverlayTrigger>
            </div>
          </Scroll.Link>
        </div>
      </div>
      <Modal show={show_acc} onHide={handle_accClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text_login">Tên đăng nhập: </div>
          <input
            className="login"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            type="text"
            placeholder="Tên đăng nhập"
          />

          <div className="text_login">Mật khẩu: </div>
          <label className="signup-password">
            <input
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  submit();
                }
              }}
              className="login"
              type={passwordShown ? "text" : "password"}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Mật khẩu"
            />
            <FontAwesomeIcon
              className="fa-icons"
              icon={faEye}
              onClick={togglePasswordVisibility}
            />
          </label>
          <div className="check_loi">{err}</div>
          <div className="signup-redirect">
            Bạn chưa có tài khoản?
            <button id="redirect-signin" onClick={gotoRegister}>
              Đăng Ký
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submit}>
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
