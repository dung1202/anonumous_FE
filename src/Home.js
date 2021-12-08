import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Homecss.css";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
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
import { Link } from "react-scroll";
import { getslider, getUserById, Login } from "./Axios";
export default function Home() {
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
  const [array_vote, setarray_vote] = useState([]);
  const [sold, setsold] = useState([]);
  const [giam, setgiam] = useState([]);
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      try {
        const userID = jwt_decode(token)._id;
        console.log(userID);
        getUserById(userID).then((res) => {
          const user = res.data;
          console.log(user);
          setAvatar(user.photoUrl);
          setToken(token);
        });
      } catch (error) {
        setToken("");
        setAvatar("");
      }
    }
  }, [token]);

  const [news] = useState([
    {
      title: "tên news",
      avatar: "kem.jpg",
      img: "anh3.png",
      creator: "Anonymous",
      createdAt: Date.now(),
      hastack: ["#cloudcomputing", "#aws", " #certification", "#programming"],
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in voluptate illum pariatur dicta sequi saepe veniam. Soluta optio obcaecati nulla minus natus incidunt, dolor aspernatur eligendi velit quia rerum!",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur",
      avatar: "kem.jpg",
      img: "anh3.png",
      creator: "Anonymous",
      createdAt: Date.now(),
      hastack: ["#cloudcomputing", "#aws", " #certification", "#programming"],
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in voluptate illum pariatur dicta sequi saepe veniam. Soluta optio obcaecati nulla minus natus incidunt, dolor aspernatur eligendi velit quia rerum!",
    },
    {
      title:
        "Accusamus in voluptate illum pariatur dicta sequi saepe veniam. Soluta optio obcaecati nulla minus natus incidunt, dolor aspernatur eligendi velit quia rerum!",
      avatar: "kem.jpg",
      img: "anh3.png",
      creator: "Anonymous",
      createdAt: Date.now(),
      hastack: ["#cloudcomputing", "#aws", " #certification", "#programming"],
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus in voluptate illum pariatur dicta sequi saepe veniam. Soluta optio obcaecati nulla minus natus incidunt, dolor aspernatur eligendi velit quia rerum!",
    },
  ]);

  const [Product] = useState([
    {
      name: "kem",
      listedPrice: 9000,
      discountPrice: 7000,
      img: "kem.jpg",
      sold: 1234,
      vote: [
        {
          number: 5,
        },
        {
          number: 5,
        },
      ],
    },
    {
      name: "kem",
      listedPrice: 9000,
      discountPrice: 7000,
      img: "kem.jpg",
      sold: 1234,
      vote: [
        {
          number: 5,
        },
        {
          number: 4,
        },
      ],
    },
    {
      name: "kem",
      listedPrice: 9000,
      discountPrice: 7000,
      img: "kem.jpg",
      sold: 1234,
      vote: [
        {
          number: 5,
        },
        {
          number: 3,
        },
      ],
    },
    {
      name: "kem",
      listedPrice: 9000,
      discountPrice: 7000,
      img: "kem.jpg",
      sold: 0,
      vote: [
        {
          number: 5,
        },
        {
          number: 2,
        },
      ],
    },
    {
      name: "Accusamus in voluptate",
      listedPrice: 90000000,
      discountPrice: 7000,
      img: "kem.jpg",
      sold: 12734,
      vote: [
        {
          number: 5,
        },
        {
          number: 1,
        },
      ],
    },
    {
      name: "Accusamus in voluptate illum pariatur",
      listedPrice: 9000,
      discountPrice: 7000,
      img: "kem.jpg",
      sold: 123,
      vote: [
        {
          number: 5,
        },
        {
          number: 0,
        },
      ],
    },
  ]);

  useEffect(() => {
    getslider().then((res) => {
      setarray(res.data.listphotos);
    });
    const number = [];
    const mang = [];
    const gia = [];
    Product.map((item) => {
      let tong = 0;
      let q = "";
      let ok = 0;
      let giamgia = 0;
      item.vote.map((V) => {
        tong = tong + V.number;
        return <div></div>;
      });
      number.push(tong / item.vote.length);

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
    setarray_vote(number);
    setgiam(gia);
  }, [Product]);

  const [show_acc, setShow_acc] = useState(false);

  const handle_accClose = () => {
    setShow_acc(false);
    seterr("");
  };
  const handle_accShow = () => setShow_acc(true);

  const ok = (item) => {
    return (
      <Carousel.Item>
        <img className="d-block w-100" src={item} alt="" />
      </Carousel.Item>
    );
  };

  const pro = (item, index) => {
    if (index <= 4) {
      let string_name = "";
      let d = 0;
      for (let i = 0; i < item.name.length; i++) {
        if (d <= 3) {
          if (item.name[i] === " ") d++;
          if (d < 4) string_name += item.name[i];
        } else {
          string_name += "...";
          break;
        }
      }
      return (
        <div className="hover1">
          <img className="img_pro" src={item.img} alt="" />

          <div style={{ padding: "1vw 1vw 0vw 1vw" }}>
            <div className="name_pro">
              {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
            </div>
            <div className="sl">
              <div>{sao(array_vote[index])}</div>
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
      );
    }
  };

  const duct = (item, index) => {
    if (index <= 4) {
      let string_name = "";
      let d = 0;
      for (let i = 0; i < item.name.length; i++) {
        if (d <= 3) {
          if (item.name[i] === " ") d++;
          if (d < 4) string_name += item.name[i];
        } else {
          string_name += "...";
          break;
        }
      }
      return (
        <div className="hover1">
          <img className="img_pro" src={item.img} alt="" />
          <div style={{ padding: "1vw 1vw 0vw 1vw" }}>
            <div className="name_pro">
              {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
            </div>
            <div className="sl">
              <div>{sao(array_vote[index])}</div>
              <div>
                {sold[index] === "0" ? "" : <div>Đã bán {sold[index]}</div>}
              </div>
            </div>
          </div>

          <div className="discountPrice">
            <div style={{ display: "flex" }}>
              {phay(item.discountPrice)}
              <div className="d">đ</div>
            </div>
            <div className="giam">-{giam[index]}%</div>
          </div>
        </div>
      );
    }
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
    if (item === 0) anh = "saorong.png";
    if (item > 0 && item < 1) anh = "saoxin.png";
    if (item >= 1) anh = "saodac.png";
    let anh1 = "";
    if (item < 2) anh1 = "saorong.png";
    if (item > 1 && item < 2) anh1 = "saoxin.png";
    if (item >= 2) anh1 = "saodac.png";
    let anh2 = "";
    if (item < 3) anh2 = "saorong.png";
    if (item > 2 && item < 3) anh2 = "saoxin.png";
    if (item >= 3) anh2 = "saodac.png";
    let anh3 = "";
    if (item < 4) anh3 = "saorong.png";
    if (item > 3 && item < 4) anh3 = "saoxin.png";
    if (item >= 4) anh3 = "saodac.png";
    let anh4 = "";
    if (item < 5) anh4 = "saorong.png";
    if (item > 4 && item < 5) anh4 = "saoxin.png";
    if (item >= 5) anh4 = "saodac.png";
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
    const date = new Date(item.createdAt);
    const day = validateNiceNumber(date.getDate());
    const month = validateNiceNumber(date.getMonth());
    const ok = month_3[month];
    let string_content = "";
    let d = 0;
    for (let i = 0; i < item.content.length; i++) {
      if (d <= 20) {
        if (item.content[i] === " ") d++;
        if (d < 21) string_content += item.content[i];
      } else {
        string_content += "...";
        break;
      }
    }

    let string_name = "";
    d = 0;
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
                  {string_content.charAt(0).toUpperCase() +
                    string_content.slice(1)}
                </div>
                <div className="hastack">{item.hastack.map(map_hastack)}</div>
              </div>
            </div>
          </div>
          <img className="img_news" src={item.img} alt="" />
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

  const submit = () => {
    const body = {
      username,
      password,
    };
    if (
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
            <img src="menu.png" className="menu1" onClick={handleShow} alt="" />

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
                  <img className="layer" src="Layer.png" alt="" />
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
                  src="./logo-removebg-preview (1).png"
                  alt=""
                />
              </div>
              <div style={{ width: "80px", opacity: "0.8" }}>
                <img className="logo-chu" src="./logo-chu.png" alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="ok1">
              <div style={{ display: "flex" }}>
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
                >
                  <img className="shop" src="Shop.png" alt="" />
                </OverlayTrigger>
                <div className="donhang">999</div>
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
                      src="acc.png"
                      alt=""
                    />
                  )}
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="ok2">
            <div className="text_header text_header_first">Trang Chủ</div>
            <div className="text_header" onClick={gotoProduct}>
              Sản Phẩm
            </div>
            <div className="text_header">Tin Tức</div>
            <div className="text_header">Hỏi đáp</div>
            {/* <div className="Us">Us</div> */}
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
              <img className="layer" src="Layer.png" alt="" />
            </div>
            <div style={{ display: "flex" }}>
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
              >
                <img className="shop" src="Shop.png" alt="" />
              </OverlayTrigger>
              <div className="donhang">100</div>
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
                    src="acc.png"
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

        <div className="product1">{Product.map(pro)}</div>

        <div className="chu_gt" id="uu_dai">
          <div className="list">
            <div>Ưu đãi dành cho bạn</div>
          </div>
          <div className="bonus" onClick={gotoProduct}>
            Xem thêm ->
          </div>
        </div>

        <div className="product1">{Product.map(duct)}</div>

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
            <div className="menu">Trang Chủ</div>
            <div className="menu">Sản Phẩm</div>
            <div className="menu">Tin Tức</div>
            <div className="menu us">
              <div>Hỏi đáp</div>
              {/* <div style={{ marginLeft: "2px" }}>us</div> */}
            </div>
          </div>
          <div className="footer_flex">
            <img src="tt1.png" className="img_footer" alt="" />
            <div>
              <img src="tt2.png" className="img_footer_1" alt="" />
            </div>
          </div>
          <div className="footer_flex"></div>
          <div className="footer_flex">
            <img src="app1.png" className="img_footer app" alt="" />
            <div>
              <img src="app2.png" className="img_footer app" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="layer2" style={{ zIndex: scrollTop > 40 ? "2" : "0" }}>
        <div className="on_top">
          <Link activeClass="active" to="header_top">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">To the top</Tooltip>}
              >
                <img src="onTop.png" alt="" />
              </OverlayTrigger>
            </div>
          </Link>
          <Link activeClass="active" to="sp_hot">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">Sản phẩm nổi bật</Tooltip>}
              >
                <img src="pie.png" alt="" />
              </OverlayTrigger>
            </div>
          </Link>
          <Link activeClass="active" to="uu_dai">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={
                  <Tooltip id="tooltip-right">Ưu đãi dành cho bạn</Tooltip>
                }
              >
                <img src="fire.png" alt="" />
              </OverlayTrigger>
            </div>
          </Link>
          <Link activeClass="active" to="top_news">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">Tin Tức</Tooltip>}
              >
                <img src="newspaper.png" alt="" />
              </OverlayTrigger>
            </div>
          </Link>
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
          <div className="signup-redirect" >
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
