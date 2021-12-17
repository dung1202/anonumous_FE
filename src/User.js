import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, Navigate, useParams, useLocation } from "react-router-dom";
import "./user.css";
import React, { useEffect, useState } from 'react'
import { getuser, updateuser, getuserid } from '../../axios'
export default function User() {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role,setRole] = useState('');
  const[dob,setDob] = useState('')
  const [data, setData] = useState([])
  let location = useLocation();
  const param = useParams()
  const [id, setId] = useState(param.id)
  useEffect(() => {
    if (id) {
      getuserid(id).then(res => {
        let data = res.data
        setusername(data.username)
        setEmail(data.email)
        setPhone(data.phone)
        setAddress(data.address)
      })

    }
  }, [])
  const img = "https://firebasestorage.googleapis.com/v0/b/anonymous-b685e.appspot.com/o/acc_clone.png?alt=media";

  const updatedata = () => {
    let body = {
      id,
      username,
      email,
      phone,
      address
    }
    updateuser(body).then(res => {
      Navigate.push('/user')
    })
  }

  const changeName = (e) => {
    setusername(e.target.value)
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
      <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{dob}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={username} onChange={changeName}
                  placeholder="Username"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 123 456 67"

                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  value={address} onChange={(e) => setAddress(e.target.value)}
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
              <img className='userShowImg' src={img} />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={updatedata}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}