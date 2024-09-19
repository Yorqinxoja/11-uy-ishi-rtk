import React, { useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Table, Input, Button, Card, ConfigProvider, theme } from "antd";
import "./Products.css";

const { Search } = Input;

const Products = () => {
  const { data } = useGetProductsQuery();
  const [cart, setCart] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product._id !== productId)
    );
  };

  const toggleLike = (product) => {
    if (likedProducts.some((p) => p._id === product._id)) {
      setLikedProducts(likedProducts.filter((p) => p._id !== product._id));
    } else {
      setLikedProducts([...likedProducts, product]);
    }
  };

  const filteredProducts =
    data?.payload?.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input) {
      const newSuggestions = data?.payload
        ?.filter((product) =>
          product.product_name.toLowerCase().startsWith(input.toLowerCase())
        )
        .map((product) => product.product_name);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const cartColumns = [
    { title: "Product", dataIndex: "product_name", key: "product_name" },
    {
      title: "Price",
      dataIndex: "sale_price",
      key: "sale_price",
      render: (price) => `$${price}`,
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Remove",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => removeFromCart(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  const likedColumns = [
    { title: "Product", dataIndex: "product_name", key: "product_name" },
    {
      title: "Price",
      dataIndex: "sale_price",
      key: "sale_price",
      render: (price) => `$${price}`,
    },
    { title: "Category", dataIndex: "category", key: "category" },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#28a745",
          colorBgContainer: "#1d1d1d",
          colorText: "#fff",
        },
      }}
    >
      <div className="products-container">
        <div className="cart-icon">
          <FaShoppingCart size={40} />
          <span className="cart-count" style={{ marginLeft: "10px" }}>
            {cart.length}
          </span>
        </div>

        <div className="liked-products-icon">
          <FaHeart
            size={40}
            color={likedProducts.length > 0 ? "#28a745" : "gray"}
          />
          <span className="liked-count" style={{ marginLeft: "10px" }}>
            {likedProducts.length}
          </span>
        </div>

        <div
          className="search-container"
          style={{ marginBottom: "20px", position: "relative" }}
        >
          <Search
            placeholder="Search for products..."
            onChange={handleSearchChange}
            value={searchTerm}
            style={{ width: "100%", background: "#444" }}
          />
          {searchTerm && (
            <ul
              className={`suggestions-list ${
                suggestions.length > 0 ? "show" : ""
              }`}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-table-container" style={{ marginBottom: "20px" }}>
          {cart.length > 0 ? (
            <Table
              columns={cartColumns}
              dataSource={cart}
              pagination={false}
              rowKey="_id"
            />
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        <div
          className="liked-products-table-container"
          style={{ marginBottom: "20px" }}
        >
          {likedProducts.length > 0 ? (
            <Table
              columns={likedColumns}
              dataSource={likedProducts}
              pagination={false}
              rowKey="_id"
            />
          ) : (
            <p>No liked products yet</p>
          )}
        </div>

        <div className="products-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card
                key={product._id}
                title={product.product_name}
                cover={
                  <img
                    src={product.product_images[0]}
                    alt={product.product_name}
                  />
                }
                extra={
                  <Link
                    to={`/product/${product._id}`}
                    style={{ color: "#28a745" }}
                  >
                    Details
                  </Link>
                }
                actions={[
                  <Button onClick={() => toggleLike(product)}>
                    {likedProducts.some((p) => p._id === product._id)
                      ? "♥"
                      : "♡"}
                  </Button>,
                  <Button onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>,
                ]}
              >
                <p>{product.category}</p>
                <p>${product.sale_price}</p>
                <p>Rating: {product.rating}</p>
              </Card>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Products;
