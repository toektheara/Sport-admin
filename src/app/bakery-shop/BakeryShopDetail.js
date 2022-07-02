import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import useAuthContext from "../../context/AuthContext";
import awsS3Client from "../../libs/awsS3";
import axios_instance from '../../libs/axiosInstance';
import { useParams } from 'react-router-dom';

const BakeryShopDetail = () => {
  const [uploadImage, setUploadImage] = useState(undefined);
  const [token] = useAuthContext();
  const [data, setData] = useState();

  const params = useParams();

  useEffect(() => {
    axios_instance.get(`/bakery-shop/${params.id}`).then((res) => {
      setData(res.data)
      setUploadImage(res.data.bakeryShop.thumbnail)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const onHandleUpload = (e) => {
    e.preventDefault();

    awsS3Client
      .uploadFile(e.target.files[0], e.target.files[0].name)
      .then((data) => {
        setUploadImage(data.location);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const x = e.target;

    const input = {
      name: x.name.value,
      phone_number: x.phone_number.value,
      description: x.description.value,
      thumbnail: uploadImage
    };


    try {
      const res = await axios_instance.post(`/bakery-shop/${params.id}/update`, {
          ...input
      }, { headers: {'Authorization': 'Bearer '+  token} })

      console.log(res.data)

      window.location.replace(`/bakery-shop/${res.data.bakeryShopId}/edit`)
    } catch(err) {
      console.error(err)
    }
  };

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
          </span>{" "}
          Edit Bakery Shop{" "}
        </h3>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
              <span></span>Overview{" "}
                <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
              </li>
            </ul>
          </nav>
        </div>

      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="forms-sample" onSubmit={onHandleSubmit}>
                <Form.Group>
                  <label>Thumbnail</label>
                  {!uploadImage ? (
                    <div className="custom-file">
                      <Form.Control
                        type="file"
                        className="form-control visibility-hidden"
                        id="customFileLang"
                        lang="es"
                        onChange={onHandleUpload}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileLang"
                      >
                        Upload image
                      </label>
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <i className="mdi mdi-trash-can" onClick={() => {setUploadImage(undefined)}} style={{ color: "red", position: "absolute", top: 10, left: 95, cursor: "pointer" }} ></i>
                      <img
                        src={uploadImage}
                        alt="upload"
                        style={{
                          width: 120,
                          height: 120,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                        }}
                      />
                    </div>
                  )}
                </Form.Group>

                <Form.Group>
                  <label>Name</label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    size="lg"
                    defaultValue={data.bakeryShop.name}
                  />
                </Form.Group>
                <Form.Group>
                  <label>Phone Number</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    name="phone_number"
                    defaultValue={data.bakeryShop.phone_number}
                  />
                </Form.Group>

                <Form.Group>
                  <label>Description</label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={5}
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    defaultValue={data.bakeryShop.description}
                  />
                </Form.Group>
                <button type="submit" className="btn btn-gradient-primary mr-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryShopDetail;
