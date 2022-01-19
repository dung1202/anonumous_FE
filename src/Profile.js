import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profilecss.css";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import {
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Scroll from "react-scroll";
import { getUserById } from "./Axios";

export default function Proflie(props) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [Invoice, setInvoice] = useState([]);

  const gotoCart = () => {
    navigate("/cart");
  };

  const [showXoaAll, setShowXoaAll] = useState(false);

  const handleCloseXoaAll = () => setShowXoaAll(false);
  const handleShowXoaAll = () => setShowXoaAll(true);
  useEffect(() => {
    let Token = localStorage.getItem("accessToken");
    if (Token) {
      const userID = jwt_decode(Token)._id;
      getUserById(userID).then((res) => {
        const user = res.data;
        setAvatar(user.photoUrl);
        setusername(user.username);
        setemail(user.email);
        setphone(user.phone);
        setgender(user.gender);
        setdob(user.dob);
        const Address =
          user.address.detail +
          " " +
          user.address.ward +
          " " +
          user.address.district +
          " " +
          user.address.city;
        setAddress(Address);
        setToken(Token);
      });
    }
    // getInvoice().then((res)=>{
    //   console.log(res.data);
    // })
    fetch("https://voucherhunter.herokuapp.com/auth/invoice", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.data.reverse();
        console.log(json.data);
        setInvoice(json.data);
      });
  }, [token]);

  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );

  const gotoEdit = () => {
    navigate("/edit");
  };

  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

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

  const logout = () => {
    localStorage.setItem("accessToken", "");
    props.dangxuat();
    navigate("/");
  };

  const edit = () => {
    navigate("/");
  };

  const chuyen = (detail) => {
    props.sangDT(detail);
    navigate("/detail-checkout");
  };

  const hienInvoice = (item, index) => {
    console.log(item.paymentStatus);
    let status =
      item.status === "delivered" ? "Đặt hàng thành công" : "Đang xử lý...";
    // console.log(item.products[0].product_id.img);
    let ten_sp = "";

    item.products.map((e) => {
      // console.log(e.product_id.name);
      ten_sp = ten_sp + e.product_id.name + ", ";
      return <></>;
    });
    const ngaDate = new Date(item.createdAt);
    const ngay = validateNiceNumber(ngaDate.getDate());
    const thang = validateNiceNumber(ngaDate.getMonth() + 1);
    const nam = ngaDate.getFullYear();
    return (
      <div className="invoice_to" onClick={() => chuyen(item)}>
        <div style={{ display: "flex" }}>
          <img
            alt=""
            src={item.products[0].product_id.img}
            className="anh_invoice"
          />
          <div>
            <div className="display">
              <div>Trạng thái:</div>
              <div
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                  color: "orange",
                }}
              >
                {status}
              </div>
            </div>

            <div className="display">
              <div>Tên các sản phẩm:</div>
              <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                {ten_sp}
              </div>
            </div>

            <div className="display">
              <div>Số lượng sản phẩm:</div>
              <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                {item.products.length}
              </div>
            </div>

            <div className="display">
              <div>Số tiền thanh toán:</div>
              <div
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                  color: "red",
                }}
              >
                {numberFormat.format(
                  item.totalDiscountPrice
                    ? item.totalDiscountPrice
                    : item.totalListPrice
                )}
              </div>
            </div>
            <div className="display">
              <div>Ghi chú:</div>
              <div style={{ marginLeft: "10px" }}>{item.note}</div>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "10px" }}>{`${ngay}/${thang}/${nam}`}</div>
      </div>
    );
  };

  const date = new Date(dob);
  const day = validateNiceNumber(date.getDate());
  const month = validateNiceNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  return (
    <div>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      {token ? (
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
                      <img
                        className="shop shop1"
                        // onClick={handle_accShow}
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
                      // onClick={handle_accShow}
                      src={Avatar}
                      alt=""
                    />
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            <div className="container_profile">
              <div style={{ width: "20vw" }}>
                <img alt="" src={Avatar} className="anh_profile" />
                <div className="name_profile">{username}</div>
              </div>

              <div style={{ margin: "2vh 2vw 0px 2vw", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <OverlayTrigger
                    key="bottom"
                    onClick={edit}
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-bottom">Sửa</Tooltip>}
                  >
                    <img
                      className="shop shop1"
                      onClick={gotoEdit}
                      src="/edit.png"
                      alt=""
                    />
                  </OverlayTrigger>
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={<Tooltip id="tooltip-bottom">Đăng xuất</Tooltip>}
                  >
                    <img
                      className="shop shop1"
                      onClick={handleShowXoaAll}
                      src="/signout.png"
                      alt=""
                    />
                  </OverlayTrigger>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="dinhdanh">
                    <div className="ten_tieude">Ngày sinh:</div>
                    <div className="noidung_tieude">{`${day}/${month}/${year}`}</div>
                  </div>
                  <div className="dinhdanh">
                    <div className="ten_tieude">Giới tính:</div>
                    <div className="noidung_tieude">{gender}</div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="dinhdanh">
                    <div className="ten_tieude">Email:</div>
                    <div className="noidung_tieude">{email}</div>
                  </div>
                  <div className="dinhdanh">
                    <div className="ten_tieude">Số điện thoại:</div>
                    <div className="noidung_tieude">{phone}</div>
                  </div>
                </div>
                <div className="dinhdanh">
                  <div className="ten_tieude">Địa chỉ:</div>
                  <div className="noidung_tieude">{address}</div>
                </div>
                <div
                  className="dinhdanh"
                  style={{
                    justifyContent: "center",
                    marginTop: "10px",
                    fontSize: "1.25rem",
                  }}
                >
                  <div className="ten_tieude">Tổng số tiền bạn đã chi:</div>
                  <div className="noidung_tieude">
                    {numberFormat.format(
                      Invoice.map(
                        (item) => item.totalDiscountPrice
                      ).reduceRight((a, b) => a + b, 0)
                    )}
                  </div>
                </div>
                <div className="dinhdanh">
                  <div className="noidung_tieude">
                    {Invoice.map(hienInvoice)}
                  </div>
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

          <div
            className="layer3"
            style={{ zIndex: scrollTop > 40 ? "2" : "0" }}
          >
            <div className="on_top1">
              <Scroll.Link activeClass="active" to="header_top">
                <div className="img_left">
                  <OverlayTrigger
                    key="right"
                    placement="right"
                    overlay={<Tooltip id="tooltip-right">To the top</Tooltip>}
                  >
                    <img src="/onTop.png" alt="" />
                  </OverlayTrigger>
                </div>
              </Scroll.Link>
            </div>
          </div>
          <Modal show={showXoaAll} onHide={handleCloseXoaAll}>
            <Modal.Header closeButton>
              <Modal.Title>Bạn có muốn đăng xuất không? </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseXoaAll}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  logout();
                }}
              >
                Đăng xuất
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
