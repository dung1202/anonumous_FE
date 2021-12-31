import React, { useState, useEffect } from "react";
import "./Productcss.css";
import { Helmet } from "react-helmet";
import {
  Carousel,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Form,
  Row,
  Col,
  Pagination,
  Modal,
  Button,
} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProduct, Login, getUserById, checkToken } from "./Axios";
import * as Scroll from "react-scroll";

export default function Product(props) {
  const navigate = useNavigate();
  const [Avatar, setAvatar] = useState("");
  const [token, setToken] = useState("");
  const [array, setarray] = useState([]);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [sold, setsold] = useState([]);
  const [giam, setgiam] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [Data, setdata] = useState([]);
  const [err, seterr] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () =>
    setPasswordShown(!passwordShown ? true : false);
  const [show_acc, setShow_acc] = useState(false);

  const handle_accClose = () => {
    setShow_acc(false);
    seterr("");
  };
  const gotoCart = () => {
    if (Avatar) navigate("/cart");
    else {
      setShow_acc(true);
    }
  };
  const handle_accShow = () => setShow_acc(true);
  const submit = () => {
    const body = {
      username,
      password,
    };
    if (username.length === 0 || password === 0) {
      seterr("Phải nhập đủ tên đăng nhập và mật khẩu sai");
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
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const userID = jwt_decode(token)._id;
        checkToken().then((res) => {
          if (res.data.message === "Token is valid") {
            getUserById(userID).then((res) => {
              const user = res.data;
              setAvatar(user.photoUrl);
              setToken(token);
            });
          }
        });
      } catch (error) {
        setToken("");
        setAvatar("");
      }
    }
  }, [token]);
  const gotoRegister = () => {
    navigate("/register");
  };
  useEffect(() => {
    getProduct().then((res) => {
      const mang = [];
      const gia = [];
      setdata(res.data);
      res.data.map((item) => {
        let q = "";
        let ok = 0;
        let giamgia = 0;

        if (item.sold >= 1000) {
          ok = item.sold / 1000;
          ok = ok.toFixed(1);
          q = `${ok}k`;
        } else {
          q = `${item.sold}`;
        }
        mang.push(q);

        giamgia = 100 - (item.discountPrice / item.listedPrice) * 100;
        giamgia = giamgia.toFixed(0);
        if (giamgia === 100 || giamgia > 99.9) giamgia = 99;
        gia.push(giamgia);
        return <div></div>;
      });
      setsold(mang);
      setgiam(gia);
      let d3 = 0;
      let mangA = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].in_slider && d3 <= 4) {
          mangA.push(res.data[i]);

          d3++;
        }
        if (d3 === 5) {
          setarray(mangA);
          break;
        }
      }
    });
  }, []);

  const ok = (item) => {
    return (
      <Carousel.Item>
        <Link to={"/detail-product/" + item._id}>
          <img alt="" className="d-block w-100" src={item.img} />
        </Link>
      </Carousel.Item>
    );
  };

  const pro = (item, index) => {
    let string_name = "";
    let d = 0;
    for (let i = 0; i < item.name.length; i++) {
      if (d <= 5) {
        if (item.name[i] === " ") d++;
        if (d < 6) string_name += item.name[i];
      } else {
        string_name += "...";
        break;
      }
    }
    return (
      <Link to={"/detail-product/" + item._id}>
        <div className="hover">
          <img alt="" className="img_pro1" src={item.img} />

          <div style={{ padding: "1vw 1vw 0vw 1vw" }}>
            <div className="name_pro">
              {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
            </div>
            <div className="sl">
              <div>{sao(item.vote)}</div>
              <div>
                {sold[index] === "0" ? "" : <div>Đã bán {sold[index]}</div>}
              </div>
            </div>
          </div>

          <div
            className={
              item.discountPrice > 0 ? "listedPrice list2" : "listedPrice"
            }
            style={{ color: item.discountPrice > 0 ? "red" : "black" }}
          >
            <div className="flex">
              {phay(
                item.discountPrice > 0 ? item.discountPrice : item.listedPrice
              )}
              <div className="d">đ</div>
            </div>
            {item.discountPrice > 0 ? (
              <div className="giamgia giam">-{giam[index]}%</div>
            ) : null}
          </div>
        </div>
      </Link>
    );
  };

  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  const sao = (item) => {
    let anh = "";
    if (item === 0) anh = "/saorong.png";
    if (item > 0 && item < 1) anh = "/saoxin.png";
    if (item >= 1) anh = "/saodac.png";
    let anh1 = "";
    if (item < 2) anh1 = "/saorong.png";
    if (item > 1 && item < 2) anh1 = "/saoxin.png";
    if (item >= 2) anh1 = "/saodac.png";
    let anh2 = "";
    if (item < 3) anh2 = "/saorong.png";
    if (item > 2 && item < 3) anh2 = "/saoxin.png";
    if (item >= 3) anh2 = "/saodac.png";
    let anh3 = "";
    if (item < 4) anh3 = "/saorong.png";
    if (item > 3 && item < 4) anh3 = "/saoxin.png";
    if (item >= 4) anh3 = "/saodac.png";
    let anh4 = "";
    if (item < 5) anh4 = "/saorong.png";
    if (item > 4 && item < 5) anh4 = "/saoxin.png";
    if (item >= 5) anh4 = "/saodac.png";
    return (
      <div style={{ display: "flex" }}>
        <img alt="" src={anh} className="sao"></img>
        <img alt="" src={anh1} className="sao"></img>
        <img alt="" src={anh2} className="sao"></img>
        <img alt="" src={anh3} className="sao"></img>
        <img alt="" src={anh4} className="sao"></img>
      </div>
    );
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [scrollTop, setScrollTop] = useState();
  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const gotoHome = () => {
    navigate("/");
  };

  const gotoProfile = () => {
    navigate("/profile");
  };
  const [array_product] = useState(() => {
    const dai = Math.ceil(Data.length / 12);
    const mang = [];
    for (let i = 1; i <= dai; i++) {
      mang.push(i);
    }
    return mang;
  });
  const indexOfLastNews = currentPage * 12;
  const indexOfFirstNews = indexOfLastNews - 12;
  const currentTodos = Data.slice(indexOfFirstNews, indexOfLastNews);
  const [list, setlist] = useState(() => {
    let mang = [];
    let k = 5;
    if (array_product.length <= 5) k = array_product.length;
    for (let i = 0; i < k; i++) {
      mang.push(array_product[i]);
    }
    return mang;
  });
  const load = (i) => {
    setcurrentPage(i);
    let dau = 0;
    let cuoi = 0;
    if (i >= 4) {
      if (i >= array_product.length - 1) {
        dau = array_product.length - 5;
        cuoi = array_product.length;
      } else {
        dau = i - 2 - 1;
        cuoi = i + 2;
      }
    } else {
      dau = 0;
      cuoi = 5;
    }
    setlist(array_product.slice(dau, cuoi));
    window.scrollTo(10, 0);
  };
  const wow = (item, index) => {
    return (
      <Pagination.Item
        onClick={() => load(item)}
        active={item === currentPage ? currentPage : null}
      >
        {item}
      </Pagination.Item>
    );
  };

  const trc = () => {
    load(currentPage - 1);
    window.scrollTo(0, 0);
  };
  const sau = () => {
    load(currentPage + 1);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <div className="windown layer1">
        <div className="header" id="header_top">
          <div className="ok1">
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={<Tooltip id="tooltip-bottom">Menu</Tooltip>}
            >
              <img
                alt=""
                src="/menu.png"
                className="menu1"
                onClick={handleShow}
              />
            </OverlayTrigger>

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
                <div className="text_header1">Sản phẩm</div>
                <div className="text_header1">tin tức</div>
                <div className="text_header1">Hỏi đáp</div>
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
            <div className="text_header">Sản phẩm</div>
            <div className="text_header">Tin tức</div>
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
        <div className="menu_product">
          <div className="menu_sp">
            <h6>Danh mục sản phẩm</h6>
            <div className="danhmuc">
              <div>Du lịch</div>
              <div>Đồ ăn</div>
              <div>Điện máy</div>
            </div>
            <hr />
            <h6>Đánh giá</h6>
            <div className="danhmuc">
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "5px" }}>{sao(5)}</div>
                <div style={{ marginLeft: "5px" }}>từ 5 sao</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "5px" }}>{sao(4)}</div>
                <div style={{ marginLeft: "5px" }}>từ 4 sao</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "5px" }}>{sao(3)}</div>
                <div style={{ marginLeft: "5px" }}>từ 3 sao</div>
              </div>
            </div>
            <hr />
            <h6>Giá</h6>
            <div className="danhmuc">
              <div>Dưới 20.0000đ</div>
              <div>Từ 20.0000đ đến 60.000đ</div>
              <div>Từ 60.000đ đến 210.000đ</div>
              <div>Trên 210.0000đ</div>
            </div>
          </div>
          <div className="pro_slide">
            <Carousel>{array.map(ok)}</Carousel>
            <div className="product">{currentTodos.map(pro)}</div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Pagination>
                {currentPage > 1 ? <Pagination.Prev onClick={trc} /> : null}

                {list.map(wow)}

                {currentPage < array_product.length ? (
                  <Pagination.Next onClick={sau} />
                ) : null}
              </Pagination>
            </div>
          </div>
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
            <div className="menu">Sản phẩm</div>
            <div className="menu">Tin tức</div>
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
                overlay={<Tooltip id="tooltip-right">Lên đầu trang</Tooltip>}
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
