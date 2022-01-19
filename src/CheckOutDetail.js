import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Cartcss.css";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
import { OverlayTrigger, Tooltip, Offcanvas } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Scroll from "react-scroll";
import { getUserById } from "./Axios";
// import { Data } from "./Data";
export default function CheckOutDetail(props) {
  // const [Data1, setData1] = useState(Data);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  // const [sl, setsl] = useState([]);
  // const [Tong, setTong] = useState([]);
  // const [tien, settien] = useState(0);
  // const [cart, setcart] = useState([]);

  useEffect(() => {
    console.log(props.ttInvoice);
    let Token = localStorage.getItem("accessToken");
    if (Token) {
      try {
        const userID = jwt_decode(Token)._id;
        getUserById(userID).then((res) => {
          setToken(Token);
          setAvatar(res.data.photoUrl);
        });
        // getCart().then((res) => {
        //   setcart(res.data.cart.items);
        //   let mang = [];
        //   let tong = [];
        //   res.data.cart.items.map((item) => {
        //     mang.push(item.quantity);
        //     tong.push(
        //       item.product_id.discountPrice
        //         ? item.product_id.discountPrice * item.quantity
        //         : item.product_id.listedPrice * item.quantity
        //     );
        //     return <div></div>;
        //   });
        //   // setsl(mang);
        //   setTong(tong);
        // });
      } catch (error) {
        setToken("");
        setAvatar("");
      }
    }
  }, [token, props.ttInvoice]);

  const [, setShow_acc] = useState(false);
  const handle_accShow = () => setShow_acc(true);

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
        <img src={anh} className="sao1" alt=""></img>
        <img src={anh1} className="sao1" alt=""></img>
        <img src={anh2} className="sao1" alt=""></img>
        <img src={anh3} className="sao1" alt=""></img>
        <img src={anh4} className="sao1" alt=""></img>
      </div>
    );
  };

  // useEffect(() => {
  //   let tong = 0;
  //   for (let i = 0; i < Tong.length; i++) {
  //     tong += Tong[i];
  //   }
  //   // settien(tong);
  // }, [Tong]);

  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );

  const map_cart = (item, index) => {
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
      <div className="sp1">
        <div className="soluong">{index + 1}.</div>

        <div style={{ flex: "1.3" }}>
          <Link to={"/detail-product/" + item.product_id._id}>
            <img className="img_cart" alt="" src={item.product_id.img} />
          </Link>
        </div>

        <div style={{ flex: "3" }}>
          <div className="ten_cart">
            <Link to={"/detail-product/" + item.product_id._id}>
              {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
            </Link>
          </div>
          <div>{sao(item.product_id.vote)}</div>
        </div>
        <div style={{ flex: "1.5" }}>
          {item.product_id.discountPrice > 0 ? (
            <div className="discount">
              <div style={{ display: "flex" }}>
                {phay(item.product_id.discountPrice)}
                <div className="d">đ</div>
              </div>
            </div>
          ) : (
            <div className="discount">
              {phay(item.product_id.listedPrice)}
              <div className="d">đ</div>
            </div>
          )}
        </div>
        <div style={{ flex: "1.5" }}>
          <input
            style={{ borderRadius: "10px" }}
            className="input_sl"
            type="text"
            readOnly={true}
            value={`x${item.quantity}`}
          ></input>
        </div>
        <div className="thanhTien">
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

  const gotoCart = () => {
    navigate("/cart");
  };

  const gotoProfile = () => {
    navigate("/profile");
  };
  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const ngaDate = new Date(props.ttInvoice.createdAt);
  const ngay = validateNiceNumber(ngaDate.getDate());
  const thang = validateNiceNumber(ngaDate.getMonth() + 1);
  const nam = ngaDate.getFullYear();

  return (
    <div>
      <Helmet>
        <title>{`Chi tiết đơn hàng`}</title>
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
            <div className="userTitleContainer">
              <h1 className="userTitle">Chi tiết đơn hàng</h1>
            </div>

            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="cart"
            >
              <div className="ttI">
                <div className="display">
                  <div>Thời gian mua:</div>
                  <div
                    style={{ marginLeft: "10px" }}
                  >{`${ngay}/${thang}/${nam}`}</div>
                </div>
                <div className="display">
                  <div>ID đơn hàng:</div>
                  <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                    {props.ttInvoice._id}
                  </div>
                </div>

                <div className="display">
                  <div>Địa chỉ:</div>
                  <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                    {props.ttInvoice.deliveryAddress}
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
                      props.ttInvoice.totalDiscountPrice
                        ? props.ttInvoice.totalDiscountPrice
                        : props.ttInvoice.totalListPrice
                    )}
                  </div>
                </div>
                <div className="display">
                  <div>Trạng thái:</div>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontWeight: "600",
                      color: "orange",
                    }}
                  >
                    {props.ttInvoice.status === "delivered"
                      ? "Đặt hàng thành công"
                      : "Đang xử lý..."}
                  </div>
                </div>
                {props.ttInvoice.log}
              </div>

              <div style={{ width: "800px" }}>
                <div>{props.ttInvoice.products.map(map_cart)}</div>
                <div
                  className="display"
                  style={{
                    backgroundColor: "white",
                    marginLeft: "0px",
                    padding: "10px",
                  }}
                >
                  <div>Ghi chú:</div>
                  <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                    {props.ttInvoice.note}
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
        </div>
      ) : null}
    </div>
  );
}
