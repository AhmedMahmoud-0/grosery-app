import axios from "axios";

const axiosGlobal = axios.create({
  baseURL:
    process.env.NEXT_PUPLIC_STRAPI_API_URL || "http://localhost:1337/api",
});

const getCategory = () => axiosGlobal.get("/categories?populate=*");
const getSlider = () =>
  axiosGlobal.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });
const getCategoryList = () =>
  axiosGlobal.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductList = () =>
  axiosGlobal.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });
const getProductByCategory = (category) =>
  axiosGlobal
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data.data;
    });
const registerUser = (username, email, password) =>
  axiosGlobal.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });
const signIn = (email, password) =>
  axiosGlobal.post("/auth/local", {
    identifier: email,
    password: password,
  });
const AddToCart = (data, jwt) =>
  axiosGlobal.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
const getCartItems = (userid, jwt) =>
  axiosGlobal
    .get(
      "/user-carts?filters[userid][$eq]=" +
        userid +
        "&[populate][product][populate]=image",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      },
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemList = data.map((item, index) => {
        const product = item?.product[0];
        return {
          name: product?.name,
          quantity: item?.quantity,
          amount: item?.amount,
          image: product.image?.[0]?.formats?.large?.url,
          sellingPrice: product?.sellingPrice,
          id: item.id,
          product: product?.id,
        };
      });
      return cartItemList;
    });

const createOrder = (data, jwt) =>
  axiosGlobal.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const myOrders = (userid, jwt) =>
  axiosGlobal
    .get(
      "/orders?[userId][$eq]=" +
        userid +
        "&[populate][orderItemList][populate][product][populate]=image",
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item, index) => ({
        id: item.id,
        totalOrderAmount: item.totalOrderAmount,
        orderItemList: item.orderItemList,
        createdAt: item.createdAt,
      }));
      return orderList;
    });

export default {
  getCategory,
  getSlider,
  getCategoryList,
  getProductList,
  getProductByCategory,
  registerUser,
  signIn,
  AddToCart,
  getCartItems,
  createOrder,
  myOrders,
};
