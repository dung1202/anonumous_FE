import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Homecss.css";
import ReactHtmlParser from "react-html-parser";
import {
  Carousel,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Form,
  Row,
  Col,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProduct, getUserById, Login, getNews, checkToken } from "./Axios";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import * as Scroll from "react-scroll";
export default function Home(props) {
  console.log(props.soluong);
  const navigate = useNavigate();
  const [array, setarray] = useState([]);
  const [err, seterr] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () =>
    setPasswordShown(!passwordShown ? true : false);
  const [month_3] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [sold, setsold] = useState([]);
  const [giam, setgiam] = useState([]);
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");

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

  const [news, setnews] = useState([]);

  const [Product_is_hot, setProduct_is_hot] = useState([]);
  const [Product_uu_dai, setProduct_uu_dai] = useState([]);
  useEffect(() => {
    getNews(1).then((res) => {
      let mang = [];
      for (let i = 0; i < res.data.data.length; i++) {
        if (i <= 4) {
          mang.push(res.data.data[i]);
        } else {
          break;
        }
      }
      console.log(res.data.data);
      setnews(mang);
    });
    getProduct().then((res) => {
      const mang = [];
      const gia = [];
      // console.log(res.data);
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
      let d1 = 0;
      let d2 = 0;
      let d3 = 0;
      let mangis = [];
      let manguu = [];
      let mangA = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].is_hot && d1 <= 4) {
          mangis.push(res.data[i]);
          d1++;
        }
        if (res.data[i].discountPrice && d2 <= 4) {
          manguu.push(res.data[i]);
          d2++;
        }
        if (res.data[i].in_slider && d3 <= 4) {
          mangA.push(res.data[i]);

          d3++;
        }
        if (d1 === 5 && d2 === 5 && d3 === 5) {
          setProduct_is_hot(mangis);
          setProduct_uu_dai(manguu);
          setarray(mangA);
          break;
        }
      }
    });
  }, []);

  const [show_acc, setShow_acc] = useState(false);

  const handle_accClose = () => {
    setShow_acc(false);
    seterr("");
  };
  const handle_accShow = () => setShow_acc(true);

  const ok = (item) => {
    return (
      <Carousel.Item>
        <Link to={"/detail-product/" + item._id}>
          <img className="d-block w-100" src={item.img} alt="" />
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
        <div className="hover1">
          <img className="img_pro" src={item.img} alt="" />
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
          <div className="listedPrice">
            {phay(item.listedPrice)}
            <div className="d">đ</div>
          </div>
        </div>
      </Link>
    );
  };

  const duct = (item, index) => {
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
        <div className="hover1">
          <img className="img_pro" src={item.img} alt="" />
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
    // console.log(item)
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
        <img src={anh} className="sao" alt=""></img>
        <img src={anh1} className="sao" alt=""></img>
        <img src={anh2} className="sao" alt=""></img>
        <img src={anh3} className="sao" alt=""></img>
        <img src={anh4} className="sao" alt=""></img>
      </div>
    );
  };
  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const map_news = (item, index) => {
    // getUserById(item.creator_id).then((res) => {
    //   item.avater = res.data.avatar;
    // });
    const date = new Date(item.createdAt);
    const day = validateNiceNumber(date.getDate());
    const month = validateNiceNumber(date.getMonth());
    const ok = month_3[month];

    let string_name = "";
    let d = 0;
    for (let i = 0; i < item.title.length; i++) {
      if (d <= 5) {
        if (item.title[i] === " ") d++;
        if (d < 11) string_name += item.title[i];
      } else {
        string_name += "...";
        break;
      }
    }
    return (
      <div className="news">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "10px" }}>
                {/* {item.avatar ? (
                  
                ) : null} */}
                <img src={item.avatar} className="avatar_news" alt="" />
              </div>
              <div style={{ marginRight: "5px" }}>
                <div className="user_news" style={{ fontWeight: "600" }}>
                  {item.creator}
                </div>
                <div className="user_news">
                  {ok} {day}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div className="content">
                  {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
                </div>
                <div className="cont">
                  {/* {ReactHtmlParser(item.content)} */}
                </div>
                {/* <div className="hastack">{item.hastack.map(map_hastack)}</div> */}
              </div>
            </div>
          </div>
          {/* <img className="img_news" src={item.img} alt="" /> */}
        </div>
      </div>
    );
  };

  const map_hastack = (item) => {
    return <div className="map_hastack">{item}</div>;
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

  const gotoProduct = () => {
    navigate("/product");
  };
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
  return (
    <div>
      <div className="windown layer1">
        <div className="header" id="header_top">
          <div className="ok1">
            <img
              src="/menu.png"
              className="menu1"
              onClick={handleShow}
              alt=""
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
                  <img className="layer" src="/Layer.png" alt="" />
                </div>
                <div className="text_header1">Trang Chủ</div>
                <div className="text_header1" onClick={gotoProduct}>
                  Sản Phẩm
                </div>
                <div className="text_header1">Tin Tức</div>
                <div style={{ display: "flex" }}>
                  <div className="text_header1">Hỏi đáp</div>
                  {/* <div className="text_header1 Us1">Us</div> */}
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
          <div>
            <div className="ok" style={{ display: "flex", flex: "1" }}>
              <div>
                <img
                  className="logo"
                  src="/logo-removebg-preview (1).png"
                  alt=""
                />
              </div>
              <div style={{ width: "80px", opacity: "0.8" }}>
                <img className="logo-chu" src="/logo-chu.png" alt="" />
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
                      // onClick={handle_accShow}
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
            <div className="text_header text_header_first">Trang chủ</div>
            <div className="text_header" onClick={gotoProduct}>
              Sản phẩm
            </div>
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
              <img className="layer" src="/Layer.png" alt="" />
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
                    // onClick={handle_accShow}
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

        <div className="slider_container">
          <Carousel>{array.map(ok)}</Carousel>
        </div>

        <div className="chu_gt" id="sp_hot">
          <div className="list">
            <div>Sản phẩm nổi bật</div>
          </div>
          <div className="bonus" onClick={gotoProduct}>
            Xem thêm ->
          </div>
        </div>

        <div className="product1">{Product_is_hot.map(pro)}</div>

        <div className="chu_gt" id="uu_dai">
          <div className="list">
            <div>Ưu đãi dành cho bạn</div>
          </div>
          <div className="bonus" onClick={gotoProduct}>
            Xem thêm ->
          </div>
        </div>

        <div className="product1">{Product_uu_dai.map(duct)}</div>

        <div className="chu_gt" id="top_news">
          <div className="list">
            <div>Tin Tức</div>
          </div>
          <div className="bonus">Xem thêm -></div>
        </div>
        <div className="news-moom">{news.map(map_news)}</div>
        <div className="newslettler">
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label style={{ color: "black" }} column sm={10}>
                <div style={{ fontSize: "1.3rem" }}>Cập nhật tin tức</div>
                <div style={{ fontSize: "0.7rem" }}>
                  Đăng ký để nhận các ưu đãi khuyến mại mới nhất từ Voucher
                  Hunter
                </div>
              </Form.Label>
              <Col sm={9}>
                <div style={{ display: "flex" }}>
                  <Form.Control
                    style={{ width: "45vw" }}
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    style={{
                      width: "90px",
                      textAlign: "center",
                      backgroundColor: "rgb(251, 38, 38)",
                      borderColor: "rgb(251, 38, 38)",
                      color: "#ffffff",
                      outline: "none",
                      cursor: "pointer",
                      borderRadius: "0px 10px 10px 0px",
                    }}
                    value="ĐĂNG KÝ"
                    readOnly={true}
                  />
                </div>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div className="footer1">
          <div className="footer_flex">Menu</div>
          <div className="footer_flex">Thanh Toán</div>
          <div className="footer_flex">Đối tác liên kết</div>
          <div className="footer_flex">Mobile app</div>
        </div>

        <div className="footer2">
          <div style={{ flex: "1", cursor: "pointer" }}>
            <div className="menu">Trang chủ</div>
            <div className="menu" onClick={gotoProduct}>
              Sản phẩm
            </div>
            <div className="menu">Tin tức</div>
            <div className="menu us">
              <div>Hỏi đáp</div>
              {/* <div style={{ marginLeft: "2px" }}>us</div> */}
            </div>
          </div>
          <div className="footer_flex">
            <img src="/tt1.png" className="img_footer" alt="" />
            <div>
              <img src="/tt2.png" className="img_footer_1" alt="" />
            </div>
          </div>
          <div className="footer_flex"></div>
          <div className="footer_flex">
            <img src="/app1.png" className="img_footer app" alt="" />
            <div>
              <img src="/app2.png" className="img_footer app" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="layer2" style={{ zIndex: scrollTop > 40 ? "2" : "0" }}>
        <div className="on_top">
          <Scroll.Link activeClass="active" to="header_top">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">Lên đầu trang</Tooltip>}
              >
                <img src="/onTop.png" alt="" />
              </OverlayTrigger>
            </div>
          </Scroll.Link>
          <Scroll.Link activeClass="active" to="sp_hot">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">Sản phẩm nổi bật</Tooltip>}
              >
                <img src="/pie.png" alt="" />
              </OverlayTrigger>
            </div>
          </Scroll.Link>
          <Scroll.Link activeClass="active" to="uu_dai">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Tooltip id="tooltip-right">Ưu đãi dành cho bạn</Tooltip>
                }
              >
                <img src="/fire.png" alt="" />
              </OverlayTrigger>
            </div>
          </Scroll.Link>
          <Scroll.Link activeClass="active" to="top_news">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">Tin Tức</Tooltip>}
              >
                <img src="/newspaper.png" alt="" />
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
