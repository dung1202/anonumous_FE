import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Detailcss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Carousel,
  OverlayTrigger,
  Tooltip,
  Offcanvas,
  Form,
  Row,
  Col,
  // Pagination,
} from "react-bootstrap";
import { Link } from "react-scroll";
import { Data } from "./Data";
export default function DetailProduct() {
  const navigate = useNavigate();
  const [array] = useState(["anh1.png", "anh2.png", "anh3.png"]);
  const [Giam, setGiam] = useState();
  const [show, setShow] = useState(false);
  const [scrollTop, setScrollTop] = useState();

  const [array_vote, setarray_vote] = useState([]);
  const [sold, setsold] = useState([]);
  const [, setgiam] = useState([]);

  const [Input_sl, setInput_sl] = useState(1);
  const gotoHome = () => {
    navigate("/");
  };
  const input = (e) => {
    // console.log(e.target.value)
    // let k = Number(e.target.value);
    if (!Number(e.target.value)) {
      setInput_sl(0);
    } else {
      setInput_sl(Number(e.target.value));
    }
  };
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
        <img alt="" src={anh} className="sao1"></img>
        <img alt="" src={anh1} className="sao1"></img>
        <img alt="" src={anh2} className="sao1"></img>
        <img alt="" src={anh3} className="sao1"></img>
        <img alt="" src={anh4} className="sao1"></img>
      </div>
    );
  };

  const sao1 = (item) => {
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
          <img alt="" className="img_pro" src={item.img} />

          <div style={{ padding: "1vw 1vw 0vw 1vw" }}>
            <div className="name_pro">
              {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
            </div>
            <div className="sl">
              <div>{sao1(array_vote[index])}</div>
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

    if (Data[1].discountPrice > 0) {
      let giamgia = 100 - (Data[1].discountPrice / Data[1].listedPrice) * 100;
      giamgia = giamgia.toFixed(0);
      if (giamgia === 100 || giamgia > 99.9) giamgia = 99;
      setGiam(giamgia);
    }
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
        <div className="detail_sp">
          <div className="img_slider">
            <Carousel className="car">{array.map(ok)}</Carousel>
          </div>
          <div>
            <div className="name_sp">
              gzgczg uu gwg ahih uu ug weutgoeusg useguseg useu gugsu usg usg
              usu s su sg sh ushh ishi h
              {/* {Data[0].name.charAt(0).toUpperCase() + Data[0].name.slice(1)} */}
            </div>
            <div className="tag">{Data[0].tags.map(map_hastack)}</div>
            <div className="sl1">
              <div>{sao(4.5)}</div>
              <div style={{ margin: "0px 20px 0px 20px" }}>|</div>
              <div style={{ marginRight: "5px" }}>
                {Data[0].sold === "0" ? "" : <div>Đã bán</div>}
              </div>
              <div className="sold">
                {Data[0].sold === "0" ? "" : <div>{Data[0].sold}</div>}
              </div>
              <div style={{ margin: "0px 20px 0px 20px" }}>|</div>
              <div style={{ marginRight: "5px" }}>
                <div>Sản phẩm có sẵn</div>
              </div>
              <div className="sold">
                <div>{Data[0].quantity}</div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              {Data[1].discountPrice > 0 ? (
                <div className="discountPrice1">
                  <div className="listedPrice2">
                    {phay(Data[0].listedPrice)}
                    <div className="d">đ</div>
                  </div>
                  <div style={{ display: "flex" }}>
                    {phay(Data[1].discountPrice)}
                    <div className="d">đ</div>
                  </div>
                  <div className="giam1">-{Giam}%</div>
                </div>
              ) : (
                <div className="listedPrice1">
                  {phay(Data[0].listedPrice)}
                  <div className="d">đ</div>
                </div>
              )}
            </div>
            <div style={{ marginTop: "2vh" }}>Mô tả: {Data[0].description}</div>
            <div style={{ marginTop: "2vh", fontWeight: "600" }}>
              Nhà sản xuất: {Data[0].supplier}
            </div>
            <div style={{ marginTop: "2vh", display: "flex" }}>
              Số Lượng:
              <div style={{ marginLeft: "20px" }}>
                <button
                  className="button_1"
                  onClick={() => {
                    if (Input_sl < Data[0].quantity) setInput_sl(Input_sl + 1);
                  }}
                >
                  +
                </button>
                <input
                  className="input_sl"
                  type="text"
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
              <div className="listedPrice4">
                <div style={{ marginRight: "10px" }}>Thêm vào giỏ hàng</div>
              </div>
              <div className="listedPrice3">
                <div style={{ marginRight: "10px" }}>Mua Ngay:</div>
                {phay(
                  Data[1].discountPrice > 0
                    ? Data[1].discountPrice * Input_sl
                    : Data[0].listedPrice * Input_sl
                )}{" "}
                <div className="d">đ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="chu_gt" id="sp_hot">
          <div className="list">
            <div>Sản phẩm nổi bật</div>
          </div>
          <div className="bonus" onClick={gotoProduct}>
            Xem thêm ->
          </div>
        </div>

        <div className="product1">{Data.map(pro)}</div>

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
