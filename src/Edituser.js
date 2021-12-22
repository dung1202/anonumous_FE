import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";
import jwt_decode from "jwt-decode";
import {
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-scroll";
import { getUserById, updateUser } from "./Axios";

export default function Edituser(props) {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [id, setid] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [ward, setward] = useState("");
  const [detail, setdetail] = useState("");
  const [ten, setten] = useState("");
  const [gmail, setgmail] = useState("");
  const [sinhNhat, setsinhNhat] = useState("");
  const [dienThoai, setdienThoai] = useState("");
  const [diaChi, setdiaChi] = useState("");
  const gotoCart = () => {
    navigate("/cart");
  };
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      const userID = jwt_decode(token)._id;
      setid(userID);
      getUserById(userID).then((res) => {
        const user = res.data;
        setAvatar(user.photoUrl);
        setPhone(user.phone);
        setgender(user.gender);
        const Address =
          user.address.detail +
          " " +
          user.address.ward +
          " " +
          user.address.district +
          " " +
          user.address.city;
        setcity(user.address.city);
        setdistrict(user.address.district);
        setward(user.address.ward);
        setdetail(user.address.detail);
        setdob(user.dob);
        setToken(token);
        setten(user.username);
        setgmail(user.email);
        setsinhNhat(user.dob);
        setdienThoai(user.phone);
        setdiaChi(Address);
      });
    }
  }, [token]);

  const changeFile = (e) => {
    setFile(e.target.files[0]);
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

  const gotoHome = () => {
    navigate("/");
  };

  const gotoProfile = () => {
    navigate("/profile");
  };

  const updatedata = (e) => {
    e.preventDefault();
    let body = {
      id,
      phone,
      address: {
        city,
        detail,
        ward,
        district,
      },
      dob,
      gender,
    };
    updateUser(body).then((res) => {
      navigate("/profile")
    });
  };
  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const date = new Date(sinhNhat);
  const day = validateNiceNumber(date.getDate());
  const month = validateNiceNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  const ngay = (item) => {
    const a = new Date(item);
    const b = validateNiceNumber(a.getDate());
    const c = validateNiceNumber(a.getMonth() + 1);
    const d = a.getFullYear();
    const ok = `${d}-${c}-${b}`;
    return ok;
  };
  return (
    <div>
      {token ? (
        <div>
          <div className="windown layer1">
            <div className="header" id="header_top">
              <div className="ok1">
                <img
                  src="menu.png"
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
                      <img className="layer" src="Layer.png" alt="" />
                    </div>
                    <div className="text_header1" onClick={gotoHome}>
                      Trang Chủ
                    </div>
                    <div className="text_header1" onClick={gotoProduct}>
                      Sản Phẩm
                    </div>
                    <div className="text_header1">Tin Tức</div>
                    <div style={{ display: "flex" }}>
                      <div className="text_header1">Hỏi đáp</div>
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
                  <div style={{ display: "flex" }} onClick={gotoCart}>
                    <OverlayTrigger
                      key="bottom"
                      placement="bottom"
                      overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
                    >
                      <img className="shop" src="Shop.png" alt="" />
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
                      <img
                        className="shop shop1"
                        onClick={gotoProfile}
                        src={Avatar}
                        alt=""
                      />
                    </OverlayTrigger>
                  </div>
                </div>
              </div>

              <div className="ok2">
                <div
                  className="text_header text_header_first"
                  onClick={gotoHome}
                >
                  Trang Chủ
                </div>
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
                <div style={{ display: "flex" }} onClick={gotoCart}>
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
                  >
                    <img className="shop" src="Shop.png" alt="" />
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
                    <img
                      className="shop shop1"
                      onClick={gotoProfile}
                      src={Avatar}
                      alt=""
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            <div className="user">
              <div className="userTitleContainer">
                <h1 className="userTitle">Chỉnh sửa thông tin người dùng</h1>
              </div>
              <div className="userContainer">
                <div className="userShow">
                  <div className="userShowTop">
                    <img src={Avatar} alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">{ten}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Thông tin người dùng</span>
                    <div className="userShowInfo">
                      <PermIdentity className="userShowIcon" />
                      <span className="userShowInfoTitle">{ten}</span>
                    </div>
                    <div className="userShowInfo">
                      <CalendarToday className="userShowIcon" />
                      <span className="userShowInfoTitle">{`${day}/${month}/${year}`}</span>
                    </div>
                    <span className="userShowTitle">Thông tin liên hệ</span>
                    <div className="userShowInfo">
                      <PhoneAndroid className="userShowIcon" />
                      <span className="userShowInfoTitle">{dienThoai}</span>
                    </div>
                    <div className="userShowInfo">
                      <MailOutline className="userShowIcon" />
                      <span className="userShowInfoTitle">{gmail}</span>
                    </div>
                    <div className="userShowInfo">
                      <LocationSearching className="userShowIcon" />
                      <span className="userShowInfoTitle">{diaChi}</span>
                    </div>
                  </div>
                </div>
                <div className="userUpdate">
                  <span className="userUpdateTitle">Thông tin chỉnh sửa</span>
                  <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label>Giới tính</label>
                        <input
                          type="text"
                          value={gender}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 123 456 67"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 123 456 67"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Thành phố/Tỉnh</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setcity(e.target.value)}
                          placeholder="Thành phố/Tỉnh"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Quận/Huyện</label>
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setdistrict(e.target.value)}
                          placeholder="Quận/Huyện"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Phường/Xã</label>
                        <input
                          type="text"
                          value={ward}
                          onChange={(e) => setward(e.target.value)}
                          placeholder="Phường/Xã"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Số nhà</label>
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) => setdetail(e.target.value)}
                          placeholder="Số nhà"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Sinh nhật</label>
                        <input
                          type="date"
                          value={ngay(dob)}
                          onChange={(e) => {
                            setdob(new Date(e.target.value));
                          }}
                          placeholder="Số nhà"
                          className="userUpdateInput"
                        />
                      </div>
                    </div>
                    <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                        <img className="userShowImg1" src={Avatar} />
                        <label htmlFor="file">
                          <Publish className="userUpdateIcon" />
                        </label>
                        <input
                          id="file"
                          onChange={changeFile}
                          accept="image/png, image/jpeg"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                      <button className="userUpdateButton" onClick={updatedata}>
                        Cập nhật
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

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
                <div className="menu" onClick={gotoHome}>
                  Trang Chủ
                </div>
                <div className="menu" onClick={gotoProduct}>
                  Sản Phẩm
                </div>
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

          <div
            className="layer3"
            style={{ zIndex: scrollTop > 40 ? "2" : "0" }}
          >
            <div className="on_top1">
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
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
