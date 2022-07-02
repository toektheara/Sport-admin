import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";
import awsS3Client from "../../libs/awsS3";
import axios_instance from "../../libs/axiosInstance";

const CakeDetail = () => {
  const [uploadImage, setUploadImage] = useState(undefined);
  const [token] = useAuthContext();
  const [data, setData] = useState({});

  const params = useParams();

  useEffect(() => {
    axios_instance
      .get("/bakery-shops")
      .then((bakery_res) => {
        setData({
          ...data,
          bakeryShopList: bakery_res.data.bakeryShopList,
        });

        axios_instance
          .get("/cake-categories")
          .then((cake_category_res) => {
            setData({
              bakeryShopList: bakery_res.data.bakeryShopList,
              cakeCategoryList: cake_category_res.data.cakeCategoryList,
            });

            axios_instance
              .get(`/cake/${params.id}`)
              .then((cake_detail_res) => {
                setData({
                  bakeryShopList: bakery_res.data.bakeryShopList,
                  cakeCategoryList: cake_category_res.data.cakeCategoryList,
                  cake: cake_detail_res.data.cake
                });
                setUploadImage(cake_detail_res.data.cake.thumbnail);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

    console.log(x.bakery_shop_id.value)

    const input = {
      name: x.name.value,
      price: Number(x.price.value),
      description: x.description.value,
      bakery_shop_id: Number(x.bakery_shop_id.value),
      cake_category_id: Number(x.cake_category_id.value),
      thumbnail: uploadImage,
    };

    try {
      const res = await axios_instance.post(
        `/cake/${params.id}/update`,
        {
          ...input,
        },
        { headers: { Authorization: "Bearer " + token } }
      );

      window.location.replace(`/cake/${res.data.cakeId}/edit`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!Object.keys(data).length === 3)
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
          Create Cake{" "}
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
                      <i
                        className="mdi mdi-trash-can"
                        onClick={() => {
                          setUploadImage(undefined);
                        }}
                        style={{
                          color: "red",
                          position: "absolute",
                          top: 10,
                          left: 95,
                          cursor: "pointer",
                        }}
                      ></i>
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
                    defaultValue={data.cake ? data.cake.name : undefined}
                  />
                </Form.Group>

                <Form.Group>
                  <label>price (USD)</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="Price (USD)"
                    name="price"
                    defaultValue={data.cake ? data.cake.price : undefined}
                  />
                </Form.Group>

                <Form.Group>
                  <label>Bakery Shop</label>
                  <select name="bakery_shop_id" className="form-control" >
                    {data.bakeryShopList ? (
                      data.bakeryShopList.map((item) => {
                        return (
                          <option key={item.id} value={item.id} selected={data.cake ? item.id === data.cake.bakery_shop_id ? 'selected' : undefined : undefined} >
                            {item.name}
                          </option>
                        );
                      })
                    ) : (
                      <option></option>
                    )}
                  </select>
                </Form.Group>

                <Form.Group>
                  <label>Cake Category</label>
                  <select name="cake_category_id" className="form-control">
                    {data.cakeCategoryList ? (
                      data.cakeCategoryList.map((item) => {
                        return (
                          <option key={item.id} value={item.id} selected={data.cake ? item.id === data.cake.cake_category_id  ? 'selected' : undefined : undefined}>
                            {item.name}
                          </option>
                        );
                      })
                    ) : (
                      <option></option>
                    )}
                  </select>
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
                    defaultValue={data.cake ? data.cake.description : undefined}
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

export default CakeDetail;
