import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Detailcss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import renderHTML from "react-render-html";
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
import * as Scroll from "react-scroll";
import {
  getUserById,
  Login,
  getProduct,
  getProductById,
  addCart,
  checkToken,
} from "./Axios";
export default function DetailProduct(props) {
  const navigate = useNavigate();
  const params = useParams();
  const [array, setarray] = useState([]);
  const [Giam, setGiam] = useState();
  const [show, setShow] = useState(false);
  const [scrollTop, setScrollTop] = useState();
  const [id, setid] = useState(params.id);
  const [sold, setsold] = useState([]);
  const [giam, setgiam] = useState([]);
  const [sp, setsp] = useState("");
  const [Product_is_hot, setProduct_is_hot] = useState([]);
  const [Input_sl, setInput_sl] = useState(1);
  const [err, seterr] = useState("");
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [addDone, setaddDone] = useState(false);
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

  const addPro = () => {
    if (!Avatar) setShow_acc(true);
    else {
      const obj = {
        product_id: id,
        quantity: Input_sl,
      };
      addCart(obj).then((res) => {
        props.them();
        setaddDone(true);
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
  const [show_acc, setShow_acc] = useState(false);

  const handle_accClose = () => {
    setShow_acc(false);
    seterr("");
  };
  const handle_accShow = () => setShow_acc(true);
  const gotoHome = () => {
    navigate("/");
  };

  const gotoProfile = () => {
    navigate("/profile");
  };
  const input = (e) => {
    if (Number(e.target.value) < sp.quantity) {
      if (Number(e.target.value) === 0) {
        setInput_sl(1);
      } else setInput_sl(Number(e.target.value));
    } else if (Number(e.target.value) >= sp.quantity) {
      setInput_sl(Number(sp.quantity));
    }
  };

  useEffect(() => {
    // setid(params.id);
    getProductById(id).then((res) => {
      let a = res.data;
      a.name = a.name.charAt(0).toUpperCase() + a.name.slice(1);
      setsp(a);
      setarray(res.data.listphotos);
      if (res.data.discountPrice > 0) {
        let giamgia =
          100 - (res.data.discountPrice / res.data.listedPrice) * 100;

        giamgia = giamgia.toFixed(0);

        if (giamgia === 100 || giamgia > 99.9) giamgia = 99;
        setGiam(giamgia);
      }
    });
    getProduct().then((res) => {
      const mang = [];
      const gia = [];
      let d1 = 0;

      let mangis = [];

      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].is_hot && d1 <= 4) {
          mangis.push(res.data[i]);
          d1++;
        }
        if (d1 === 5) {
          setProduct_is_hot(mangis);
        }
      }
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
    });
  }, [id]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ok = (item) => {
    return (
      <Carousel.Item>
        <img alt="" className="d-block w-100 dt" src={item} />
      </Carousel.Item>
    );
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
        <img alt="" src={anh} className="sao1"></img>
        <img alt="" src={anh1} className="sao1"></img>
        <img alt="" src={anh2} className="sao1"></img>
        <img alt="" src={anh3} className="sao1"></img>
        <img alt="" src={anh4} className="sao1"></img>
      </div>
    );
  };

  const sao1 = (item) => {
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
  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  const map_hastack = (item) => {
    return <div className="map_hastack">{item}</div>;
  };

  const gotoProduct = () => {
    navigate("/product");
  };

  const oksa = (id) => {
    setid(id);
    setaddDone(false);
    window.scrollTo(10, 0);
  };
  const pro = (item, index) => {
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
      <Link to={"/detail-product/" + item._id}>
        <div
          className="hover1"
          onClick={() => {
            oksa(item._id);
          }}
        >
          <img alt="" className="img_pro" src={item.img} />

          <div style={{ padding: "1vw 1vw 0vw 1vw" }}>
            <div className="name_pro">
              {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
            </div>
            <div className="sl">
              <div>{sao1(item.vote)}</div>
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

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  return (
    <div>
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
                <div className="text_header1">Sản phẩm</div>
                <div className="text_header1">Tin Tức</div>
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
            <div className="text_header">Tin Tức</div>
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
            {addDone ? (
              <div className="tb">"Bạn đã thêm thành công"</div>
            ) : null}
            <div className="detail_sp">
              <div className="img_slider">
                <Carousel className="car">{array.map(ok)}</Carousel>
              </div>

              <div>
                <div className="name_sp">{sp.name}</div>
                <div className="tag">{sp.tags.map(map_hastack)}</div>
                <div className="sl1">
                  <div>{sao(sp.vote)}</div>
                  <div style={{ margin: "0px 20px 0px 20px" }}>|</div>
                  <div style={{ marginRight: "5px" }}>
                    {sp.sold === "0" ? "" : <div>Đã bán</div>}
                  </div>
                  <div className="sold">
                    {sp.sold === "0" ? "" : <div>{sp.sold}</div>}
                  </div>
                  <div style={{ margin: "0px 20px 0px 20px" }}>|</div>
                  <div style={{ marginRight: "5px" }}>
                    <div>Sản phẩm có sẵn</div>
                  </div>
                  <div className="sold">
                    <div>{sp.quantity}</div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  {sp.discountPrice > 0 ? (
                    <div className="discountPrice1">
                      <div className="listedPrice2">
                        {phay(sp.listedPrice)}
                        <div className="d">đ</div>
                      </div>
                      <div style={{ display: "flex" }}>
                        {phay(sp.discountPrice)}
                        <div className="d">đ</div>
                      </div>
                      <div className="giam1">-{Giam}%</div>
                    </div>
                  ) : (
                    <div className="listedPrice1">
                      {phay(sp.listedPrice)}
                      <div className="d">đ</div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "2vh", fontWeight: "600" }}>
                  Nhà sản xuất: {sp.supplier}
                </div>
                <div style={{ marginTop: "2vh", display: "flex" }}>
                  Số Lượng:
                  <div style={{ marginLeft: "20px" }}>
                    <button
                      className="button_1"
                      onClick={() => {
                        if (Input_sl < sp.quantity) setInput_sl(Input_sl + 1);
                      }}
                    >
                      +
                    </button>
                    <input
                      className="input_sl"
                      type="number"
                      onChange={input}
                      value={Input_sl}
                    ></input>
                    <button
                      className="button_1"
                      onClick={() => {
                        if (Input_sl > 1) setInput_sl(Input_sl - 1);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "3vh" }}>
                  <div className="listedPrice4" onClick={addPro}>
                    <div style={{ marginRight: "10px" }}>Thêm vào giỏ hàng</div>
                  </div>
                  <div className="listedPrice3">
                    <div style={{ marginRight: "10px" }}>Thành tiền:</div>
                    {phay(
                      sp.discountPrice > 0
                        ? sp.discountPrice * Input_sl
                        : sp.listedPrice * Input_sl
                    )}
                    <div className="d">đ</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "5vh", fontWeight: "600" }}>Mô tả: </div>
            <div>{renderHTML(sp.description)}</div>
          </div>
        ) : null}
        <div className="chu_gt" id="sp_hot">
          <div className="list">
            <div>Sản phẩm nổi bật</div>
          </div>
          <div className="bonus" onClick={gotoProduct}>
            Xem thêm ->
          </div>
        </div>

        <div className="product1">{Product_is_hot.map(pro)}</div>

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
              Trang chủ
            </div>
            <div className="menu" onClick={gotoProduct}>
              Sản phẩm
            </div>
            <div className="menu">Tin Tức</div>
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
