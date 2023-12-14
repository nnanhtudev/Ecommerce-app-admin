import React, { useEffect, useState } from "react";
import HistoryAPI from "../API/HistoryAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import convertMoney from "../utils/convertMoney";
import io from "socket.io-client";
import config from "../config/index";

import "./Home.css";
import { toast } from "react-toastify";
Home.propTypes = {};
const socket = io(`${config.URL_SERVER_SOCKET}/checkout`, { transports: ["websocket"] });
function Home(props) {
  const [history, setHistory] = useState([]);
  const [dashboard, setDashboard] = useState({
    currentUser: 2,
    totalRevenueForMonth: 44779000,
    newOrders: 2,
  });
  const [showNewOrderAnimation, setShowNewOrderAnimation] = useState(false);
  useEffect(() => {
    // Kết nối đến server socket
    // Listen for "order_response" event from the server
    socket.on("order_response", (data) => {
      console.log("Received order response from server:", data);
      // Update state or perform other actions when an order is received
      setDashboard((prevDashboard) => ({
        ...prevDashboard,
        newOrders: (prevDashboard.newOrders || 0) + 1,
      }));
      toast.success(`User ${data} order received`);
      // Trigger the animation when a new order is received
      setShowNewOrderAnimation(true);
      // Reset the animation after a short delay
      setTimeout(() => setShowNewOrderAnimation(false), 5000);
    });

    return () => {
      // Đóng kết nối khi component unmount
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  useEffect(async () => {
    const response = await HistoryAPI.getAll();
    setHistory(response.DT);
    const res = await UserAPI.getDashBoard();
    setDashboard(res.DT);
  }, []);
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="card-group">
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">{(dashboard && dashboard.currentUser) || 2}</h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Clients</h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="user-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card border-right">
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">
                    {(dashboard && convertMoney(dashboard.totalRevenueForMonth)) || 44779000}
                    <sup className="set-doller">VND</sup>
                  </h2>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Earnings of Month</h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="dollar-sign"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={`card border-right ${showNewOrderAnimation ? "shake" : ""}`}>
            <div className="card-body">
              <div className="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div className="d-inline-flex align-items-center">
                    <h2 className="text-dark mb-1 font-weight-medium">{(dashboard && dashboard.newOrders) || 0}</h2>
                  </div>
                  <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">New Order</h6>
                </div>
                <div className="ml-auto mt-md-3 mt-lg-0">
                  <span className="opacity-7 text-muted">
                    <i data-feather="file-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">History</h4>
                <br />
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>ID User</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Delivery</th>
                        <th>Status</th>
                        <th>Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history &&
                        history.map((value) => (
                          <tr key={value._id}>
                            <td>{value.user}</td>
                            <td>{value.fullName}</td>
                            <td>{value.phone}</td>
                            <td>{value.address}</td>
                            <td>{value.total}</td>
                            <td>{value.delivery ? "Đã Vận Chuyển" : "Chưa Vận Chuyển"}</td>
                            <td>{value.status}</td>
                            <td>
                              <a
                                style={{
                                  cursor: "pointer",
                                  color: "white",
                                }}
                                className="btn btn-success"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Home;
