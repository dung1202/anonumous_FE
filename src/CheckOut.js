import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Cartcss.css";
import jwt_decode from "jwt-decode";
import {
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Form,
  Row,
  Col,
  Tabs,
  Tab,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Scroll from "react-scroll";
import { getUserById, createInvoice } from "./Axios";
export default function CheckOut(props) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [sl, setsl] = useState([]);
  const [checkBox, setcheckBox] = useState([]);
  const [checkBoxAll, setcheckBoxAll] = useState(false);
  const [Tong, setTong] = useState([]);
  const [tien, settien] = useState(0);
  const [checkOut, setCheckOut] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [muatc, setmuatc] = useState(false);
  const [cart, setcart] = useState([]);

  useEffect(() => {
      console.log(props.muaDo);
    let token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const userID = jwt_decode(token)._id;
        setcart(props.mua)
        getUserById(userID).then((res) => {
          const user = res.data;
          setAvatar(user.photoUrl);
          const Address =
            user.address.detail +
            " " +
            user.address.ward +
            " " +
            user.address.district +
            " " +
            user.address.city;
          setPhone(user.phone);
          setAddress(Address);
          setToken(token);
        });
        let tong = 0;
        for (let i = 0; i < cart.length; i++) {
          let k = cart.product_id.discountPrice
            ? cart.product_id.discountPrice * cart.quantity
            : cart.product_id.listedPrice * cart.quantity;
          tong += k;
        }
        settien(tong);
      } catch (error) {
        setToken("");
        setAvatar("");
      }
    }
  }, []);

  const [, setShow_acc] = useState(false);
  const handle_accShow = () => setShow_acc(true);

  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
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

  const thanhtoan = (item, index) => {
    let string_name = "";
    let d = 0;
    for (let i = 0; i < item.product_id.name.length; i++) {
      if (d <= 5) {
        if (item.product_id.name[i] === " ") d++;
        if (d < 11) string_name += item.product_id.name[i];
      } else {
        string_name += "...";
        break;
      }
    }
    return (
      <div className="sptt">
        <div className="ten_cart">
          {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
        </div>
        <div className="thanhTienTT">
          {phay(
            item.product_id.discountPrice > 0
              ? item.product_id.discountPrice * item.quantity
              : item.product_id.listedPrice * item.quantity
          )}
          <div className="d">đ</div>
        </div>
      </div>
    );
  };
  const mua = (tt) => {
    let body = {
      note: "ASDAWD",
      deliveryAddress: address,
      paymentMethod: tt,
      items: cart,
    };
    createInvoice(body).then((res) => {
      // console.log(res.data);
      setmuatc(true);
    });
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
                          src="acc.png"
                          alt=""
                        />
                      )}
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
                <div style={{ display: "flex" }}>
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
                        src="acc.png"
                        alt=""
                      />
                    )}
                  </OverlayTrigger>
                </div>
              </div>
            </div>

            <div>
              {/* <div>{cart.map(thanhtoan)}</div> */}
              <hr></hr>
              <div className="sptt">
                <div>Tổng</div>
                <div className="thanhTienToTT">
                  {phay(tien)}
                  <div className="d">đ</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>SĐT: </div>
                <input
                  style={{
                    outline: "none",
                    border: "0px",
                    borderBottom: "1px solid red",
                  }}
                  value={phone}
                  placeholder="Số điện thoại"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <div>Địa chỉ: </div>
                <input
                  style={{
                    outline: "none",
                    border: "0px",
                    borderBottom: "1px solid red",
                  }}
                  value={address}
                  placeholder="Địa chỉ"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <Tabs
                defaultActiveKey="cod"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="cod" title="Tiền mặt">
                  <div onClick={() => mua("COD")}>Mua hàng</div>
                </Tab>
                <Tab eventKey="paylay" title="Paylay">
                  <div onClick={() => mua("PAYPAL")}>Mua hàng</div>
                </Tab>
                <Tab eventKey="stripe" title="Stripe">
                  <div onClick={() => mua("STRIPE")}>Mua hàng</div>
                </Tab>
              </Tabs>
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
              <Scroll.Link activeClass="active" to="header_top">
                <div className="img_left">
                  <OverlayTrigger
                    key="right"
                    placement="right"
                    overlay={<Tooltip id="tooltip-right">To the top</Tooltip>}
                  >
                    <img src="onTop.png" alt="" />
                  </OverlayTrigger>
                </div>
              </Scroll.Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
