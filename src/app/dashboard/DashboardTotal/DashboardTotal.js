import React, { useEffect, useState } from 'react'
import axios_instance from '../../../libs/axiosInstance';

const DashboardTotal = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    axios_instance
    .get(`/dashboard/total`)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }, [])

  if (!data)
    return (
      <div>
        <div className="spinner-wrapper">
          <div className="donut"></div>
        </div>
      </div>
    );

  return (
    <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard </h3>
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" aria-current="page">
                <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">All Bakery Shops <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{data.totalBakeryShop ? data.totalBakeryShop : 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">All Cake Categories <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{data.totalCakeCategory ? data.totalCakeCategory : 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">All Cake <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{data.totalCake ? data.totalCake : 0}</h2>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DashboardTotal