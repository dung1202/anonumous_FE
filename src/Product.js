import React, { useState, useEffect } from "react";
import "./Productcss.css";
import {
  Carousel,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Form,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-scroll";
import { Data } from "./Data";
export default function Product() {
  const navigate = useNavigate();
  const [array] = useState(["anh1.png", "anh2.png", "anh3.png"]);
  const [array_vote, setarray_vote] = useState([]);
  const [sold, setsold] = useState([]);
  const [, setgiam] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  // const [Product, setProduct] = useState([]);

  useEffect(() => {
    const number = [];
    const mang = [];
    const gia = [];
    Data.map((item) => {
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
  }, []);

  const ok = (item) => {
    return (
      <Carousel.Item>
        <img alt="" className="d-block w-100" src={item} />
      </Carousel.Item>
    );
  };

  const pro = (item, index) => {
    let string_name = "";
    let d = 0;
    for (let i = 0; i < item.name.length; i++) {
      if (d <= 2) {
        if (item.name[i] === " ") d++;
        if (d < 3) string_name += item.name[i];
      } else {
        string_name += "...";
        break;
      }
    }
    return (
      <div className="hover">
        <img alt="" className="img_pro" src={item.img} />

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
    console.log(list);
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
    let o = currentPage - 1;
    setcurrentPage(o);
    window.scrollTo(0, 0);
  };
  const sau = () => {
    let o = currentPage + 1;
    setcurrentPage(o);
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <div className="windown layer1">
        <div className="header" id="header_top">
          <div className="ok1">
            <img alt="" src="menu.png" className="menu1" onClick={handleShow} />

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
                  <img alt="" className="layer" src="Layer.png" />
                </div>
                <div className="text_header1" onClick={gotoHome}>
                  Home
                </div>
                <div className="text_header1">Product</div>
                <div className="text_header1">News</div>
                <div style={{ display: "flex" }}>
                  <div className="text_header1">About</div>
                  <div className="text_header1 Us1">Us</div>
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
                  src="./logo-removebg-preview (1).png"
                />
              </div>
              <div style={{ width: "80px", opacity: "0.8" }}>
                <img alt="" className="logo-chu" src="./logo-chu.png" />
              </div>
            </div>
          </div>
          <div>
            <div className="ok1">
              <div style={{ display: "flex" }}>
                <img alt="" className="shop" src="Shop.png" />
                <div className="donhang">999</div>
              </div>
              <div>
                <img alt="" className="shop shop1" src="acc.png" />
              </div>
            </div>
          </div>
          <div className="ok2">
            <div className="text_header text_header_first" onClick={gotoHome}>
              Home
            </div>
            <div className="text_header">Product</div>
            <div className="text_header">News</div>
            <div className="text_header">About</div>
            <div className="Us">Us</div>
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
              <img alt="" className="layer" src="Layer.png" />
            </div>
            <div style={{ display: "flex" }}>
              <img alt="" className="shop" src="Shop.png" />
              <div className="donhang">100</div>
            </div>
            <div>
              <img alt="" className="shop shop1" src="acc.png" />
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
            <div className="menu">Home</div>
            <div className="menu">Product</div>
            <div className="menu">News</div>
            <div className="menu us">
              <div>About</div>
              <div style={{ marginLeft: "4px" }}>us</div>
            </div>
          </div>
          <div className="footer_flex">
            <img alt="" src="tt1.png" className="img_footer" />
            <div>
              <img alt="" src="tt2.png" className="img_footer_1" />
            </div>
          </div>
          <div className="footer_flex"></div>
          <div className="footer_flex">
            <img alt="" src="app1.png" className="img_footer app" />
            <div>
              <img alt="" src="app2.png" className="img_footer app" />
            </div>
          </div>
        </div>
      </div>
      <div className="layer3" style={{ zIndex: scrollTop > 40 ? "2" : "0" }}>
        <div className="on_top1">
          <Link activeClass="active" to="header_top">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">To the top</Tooltip>}
              >
                <img alt="" src="onTop.png" />
              </OverlayTrigger>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
