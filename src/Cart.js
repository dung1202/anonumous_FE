import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cartcss.css";
import jwt_decode from "jwt-decode";
import {
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
import { getUserById, getCart } from "./Axios";
// import { Data } from "./Data";
export default function Cart(props) {
  // const [Data1, setData1] = useState(Data);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [sl, setsl] = useState([]);
  const [checkBox, setcheckBox] = useState([]);
  const [checkBoxAll, setcheckBoxAll] = useState(false);
  const [Tong, setTong] = useState([]);
  const [tien, settien] = useState(0);
  const [showXoa, setShowXoa] = useState(false);

  const handleCloseXoa = () => setShowXoa(false);
  const handleShowXoa = () => setShowXoa(true);

  const [showXoaAll, setShowXoaAll] = useState(false);

  const handleCloseXoaAll = () => setShowXoaAll(false);
  const handleShowXoaAll = () => setShowXoaAll(true);

  const [cart, setcart] = useState([]);

  const input_sl = (e, index) => {
    let newsl = sl;
    if (!Number(e.target.value)) {
    } else if (Number(e.target.value) < cart[index].product_id.quantity) {
      newsl[index] = Number(e.target.value);
    } else if (Number(e.target.value) >= cart[index].product_id.quantity) {
      newsl[index] = cart[index].product_id.quantity;
    }
    setsl([...newsl]);
  };
  const cong_sl = (index) => {
    let newsl = sl;
    if (newsl[index] < cart[index].product_id.quantity) newsl[index] += 1;
    setsl([...newsl]);
  };
  const tru_sl = (index) => {
    let newsl = sl;
    if (newsl[index] >= 2) newsl[index] -= 1;
    setsl([...newsl]);
  };
  const xoaAll = () => {
    let xoa = cart;
    xoa.splice(0, xoa.length);
    setcart([...cart]);
    handleCloseXoaAll();
  };
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const userID = jwt_decode(token)._id;
        // console.log(userID);
        getUserById(userID).then((res) => {
          const user = res.data;
          //   console.log(user);
          setAvatar(user.photoUrl);
          setToken(token);
        });
        getCart().then((res) => {
          console.log(res.data);
          setcart(res.data.cart.items);
          let mang = [];
          let check = [];
          let tong = [];
          res.data.cart.items.map((item) => {
            mang.push(item.quantity);
            check.push(false);
            tong.push(item.totalPrice);
            return <div></div>;
          });
          setsl(mang);
          setcheckBox(check);
          setTong(tong);
        });
      } catch (error) {
        setToken("");
        setAvatar("");
      }
    }
  }, [token]);

  const [, setShow_acc] = useState(false);
  const handle_accShow = () => setShow_acc(true);

  const sao = (item) => {
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
        <img src={anh} className="sao1" alt=""></img>
        <img src={anh1} className="sao1" alt=""></img>
        <img src={anh2} className="sao1" alt=""></img>
        <img src={anh3} className="sao1" alt=""></img>
        <img src={anh4} className="sao1" alt=""></img>
      </div>
    );
  };

  const change = (index) => {
    let newCheck = checkBox;
    newCheck[index] = !newCheck[index];
    setcheckBox([...newCheck]);
  };
  const changeAll = () => {
    let newCheck = checkBox;
    setcheckBoxAll(!checkBoxAll);
    for (let i = 0; i < newCheck.length; i++) {
      newCheck[i] = !checkBoxAll;
    }
    setcheckBox([...newCheck]);
  };

  useEffect(() => {
    let d = 0;
    let tong = 0;
    for (let i = 0; i < checkBox.length; i++) {
      if (checkBox[i] === true) {
        d++;
        tong += Tong[i];
      }
    }
    console.log(tong);
    if (d === checkBox.length) {
      setcheckBoxAll(true);
    } else {
      setcheckBoxAll(false);
    }
    settien(tong);
  }, [checkBox, Tong]);

  const xoa_item = (index) => {
    let xoa = cart;
    xoa.splice(index, 1);
    setcart([...cart]);
    handleCloseXoa();
  };

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
      <div className="sp">
        <div className="soluong">
          {index + 1}.
          <div>
            <input
              type="checkbox"
              checked={checkBox[index]}
              onChange={() => {
                change(index);
              }}
            />
          </div>
        </div>

        <div style={{ flex: "1.3" }}>
          <img className="img_cart" alt="" src={item.product_id.img} />
        </div>

        <div style={{ flex: "2" }}>
          <div className="ten_cart">
            {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
          </div>
          <div>{sao(item.product_id.vote)}</div>
        </div>
        <div style={{ flex: "2" }}>
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

        <div style={{ flex: "2.5" }}>
          <button
            className="button_1"
            onClick={() => {
              cong_sl(index);
              tinh_tien(
                item.product_id.discountPrice > 0
                  ? item.product_id.discountPrice * sl[index]
                  : item.product_id.listedPrice * sl[index],
                index
              );
            }}
          >
            +
          </button>
          <input
            className="input_sl"
            type="text"
            onChange={(e) => {
              input_sl(e, index);
              tinh_tien(
                item.product_id.discountPrice > 0
                  ? item.product_id.discountPrice * sl[index]
                  : item.product_id.listedPrice * sl[index],
                index
              );
            }}
            value={sl[index]}
          ></input>
          <button
            className="button_1"
            onClick={() => {
              tru_sl(index);
              tinh_tien(
                item.product_id.discountPrice > 0
                  ? item.product_id.discountPrice * sl[index]
                  : item.product_id.listedPrice * sl[index],
                index
              );
            }}
          >
            -
          </button>
        </div>
        <div className="thanhTien">
          {phay(
            item.product_id.discountPrice > 0
              ? item.product_id.discountPrice * sl[index]
              : item.product_id.listedPrice * sl[index]
          )}
          <div className="d">đ</div>
        </div>

        <div>
          <img
            className="anh"
            alt=""
            src="/xoa-item.png"
            onClick={() => {
              handleShowXoa();
            }}
          />
        </div>
        <Modal show={showXoa} onHide={handleCloseXoa}>
          <Modal.Header closeButton>
            <Modal.Title>Bạn có muốn xóa sản phẩm này? </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseXoa}>
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                xoa_item(index);
              }}
            >
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const tinh_tien = (x, index) => {
    let t = Tong;
    t[index] = x;
    setTong([...t]);
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
                <div className="text_header1" onClick={gotoHome}>Trang Chủ</div>
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
            <div className="text_header text_header_first" onClick={gotoHome}>Trang Chủ</div>
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
                    src="acc.png"
                    alt=""
                  />
                )}
              </OverlayTrigger>
            </div>
          </div>
        </div>
        {cart.length ? (
          <div>
            <div className="tieude">
              <div style={{ flex: "0.7" }}>
                Stt
                <div style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    checked={checkBoxAll}
                    onChange={() => {
                      changeAll();
                    }}
                  />
                  {checkBoxAll ? (
                    <div>
                      <img
                        className="anhtd"
                        alt=""
                        onClick={handleShowXoaAll}
                        src="/xoa-item.png"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div style={{ flex: "1" }}>Ảnh</div>
              <div style={{ flex: "2" }}>Tên sản phẩm</div>
              <div style={{ flex: "2.2" }}>Đơn giá</div>
              <div style={{ flex: "2" }}>Số lượng</div>
              <div className="mua">
                Mua hàng
                <div className="thanhTienTo">
                  {phay(tien)}
                  <div className="d">đ</div>
                </div>
              </div>
            </div>
            <div className="cart">{cart.map(map_cart)}</div>
          </div>
        ) : (
          <div className="rong-to">
            <img className="rong" alt="" src="/empty-cart.png" />
          </div>
        )}

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
            <div className="menu" onClick={gotoHome}>Trang Chủ</div>
            <div className="menu" onClick={gotoProduct}>Sản Phẩm</div>
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
      {cart.length ? (
        <div
          className="hienTieuDe"
          style={{ zIndex: scrollTop > 40 ? "2" : "0" }}
        >
          <div className="tieude_sau">
            <div style={{ flex: "0.7" }}>
              Stt
              <div>
                <input
                  type="checkbox"
                  checked={checkBoxAll}
                  onChange={() => {
                    changeAll();
                  }}
                />
              </div>
            </div>
            <div style={{ flex: "1" }}>Ảnh</div>
            <div style={{ flex: "2" }}>Tên sản phẩm</div>
            <div style={{ flex: "2.2" }}>Đơn giá</div>
            <div style={{ flex: "2" }}>Số lượng</div>
            <div className="mua">
              Mua hàng
              <div className="thanhTienTo">
                {phay(tien)}
                <div className="d">đ</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="layer3" style={{ zIndex: scrollTop > 40 ? "2" : "0" }}>
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
      <Modal show={showXoaAll} onHide={handleCloseXoaAll}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có muốn xóa tất cả sản phẩm? </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseXoaAll}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              xoaAll();
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
