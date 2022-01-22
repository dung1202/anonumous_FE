import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckOut.css";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import {
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Tabs,
  Tab,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Scroll from "react-scroll";
import { getUserById, createInvoice, deleteCart } from "./Axios";
export default function CheckOut(props) {
  const navigate = useNavigate();
  const [checktt, setchecktt] = useState(false);
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setcart] = useState([]);
  const [email, setemail] = useState("");
  const [paylay, setpaylay] = useState("");
  const [showMua, setShowMua] = useState(false);
  const [note, setnote] = useState("");
  const [TTtien, setTTtien] = useState("");
  const handleCloseMua = () => setShowMua(false);
  const handleShowMua = () => setShowMua(true);

  useEffect(() => {
    let Token = localStorage.getItem("accessToken");
    if (Token) {
      try {
        const userID = jwt_decode(Token)._id;
        setcart(props.muaDo);
        setTTtien(props.muaDo);
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
          setemail(user.email);
          setToken(Token);
        });
      } catch (error) {
        setToken("");
        setAvatar("");
      }
    }
  }, [token, props.muaDo]);

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
    deleteCart().then((res) => {
      props.them();
    });
    navigate("/product");
  };

  const gotoHome = () => {
    navigate("/");
  };

  const gotoNews = () => {
    navigate("/news");
  };

  const gotoProfile = () => {
    deleteCart().then((res) => {
      props.them();
    });
    navigate("/profile");
  };
  const gotoCart = () => {
    navigate("/cart");
  };

  const thanhtoan = (item, index) => {
    if (index < cart.length - 1) {
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
          <div>
            <img className="img_cart" alt="" src={item.product_id.img} />
          </div>
          <div className="ten_cart">
            {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
          </div>
          <div>x{item.quantity}</div>
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
    }
  };
  const mua = (tt) => {
    TTtien.pop();
    setchecktt(true);
    TTtien.map((item) => {
      item.product_id = item.product_id._id;
      return <></>;
    });
    let body = {
      note,
      deliveryAddress: address,
      paymentMethod: tt,
      items: TTtien,
    };
    createInvoice(body)
      .then((res) => {
        handleShowMua();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Hóa đơn</title>
      </Helmet>
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
                    <div className="text_header1" onClick={gotoNews}>Tin Tức</div>
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
                <div className="text_header" onClick={gotoNews}>Tin Tức</div>
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
            {cart.length > 0 ? (
              <div className="hoadon">
                <div className="tenhd">Xác nhận mua hàng</div>
                <div>{checktt ? "" : cart.map(thanhtoan)}</div>
                <hr></hr>
                <div className="sptt">
                  <div>Tổng</div>
                  <div className="thanhTienToTT">
                    {phay(cart[cart.length - 1])}
                    <div className="d">đ</div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Email: </div>
                  <input
                    style={{
                      outline: "none",
                      border: "0px",
                      borderBottom: "1px solid red",
                      marginBottom: "10px",
                    }}
                    value={email}
                    placeholder="Email"
                    readOnly={true}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>SĐT: </div>
                  <input
                    style={{
                      outline: "none",
                      border: "0px",
                      borderBottom: "1px solid red",
                    }}
                    value={phone}
                    placeholder="Số điện thoại"
                    readOnly={true}
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
                    readOnly={true}
                  />
                </div>
                <div>Ghi chú:</div>
                <textarea
                  style={{
                    outline: "none",
                    // border: "0px",
                    border: "1px solid black",
                    width: "100%",
                    resize: "none",
                  }}
                  value={note}
                  placeholder="Ghi chú"
                  // resize="none"
                  onChange={(e) => setnote(e.target.value)}
                />

                <Tabs
                  defaultActiveKey="cod"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="cod" title="Tiền mặt">
                    <div>
                      <div onClick={() => mua("COD")} className="kingpin">
                        Mua hàng
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="paylay" title="Paylay" disabled>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Nhập số tài khoản</div>
                        <input
                          style={{
                            outline: "none",
                            border: "0px",
                            borderBottom: "1px solid red",
                          }}
                          placeholder="Số tài khoản"
                          value={paylay}
                          onChange={(e) => setpaylay(e.target.value)}
                        />
                      </div>

                      <div onClick={() => mua("PAYPAL")} className="kingpin">
                        Mua hàng
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="stripe" title="Stripe" disabled>
                    <div>
                      <div onClick={() => mua("STRIPE")} className="kingpin">
                        Mua hàng
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            ) : (
              <div
                className="hoadon"
                style={{ marginBottom: "200px", display: "flex" }}
              >
                <div>"Chúng tôi cần bạn xác nhận lại"</div>
                <div
                  onClick={gotoCart}
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Đến giỏ hàng
                </div>
              </div>
            )}

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
                <div className="menu" onClick={gotoNews} >Tin Tức</div>
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
          <Modal show={showMua} onHide={handleCloseMua}>
            <Modal.Header closeButton>
              <Modal.Title>Cảm ơn bạn đã mua hàng</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="primary" onClick={gotoProduct}>
                Tiếp tục mua hàng
              </Button>
              <Button variant="primary" onClick={gotoProfile}>
                Xem hóa đơn
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
