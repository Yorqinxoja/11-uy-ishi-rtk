import React from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import "./ProductDetails.css";

const { Title, Paragraph } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useGetProductsQuery();

  const product = data?.payload?.find((item) => item._id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details-container">
      <Card
        cover={
          <img
            className="product-image-large"
            src={product.product_images[0]}
            alt={product.product_name}
          />
        }
        style={{ backgroundColor: "#1d1d1d", color: "#fff" }}
      >
        <Title className="product-name-large" style={{ color: "#fff" }}>
          {product.product_name}
        </Title>
        <Paragraph className="product-price-large">
          ${product.sale_price}
        </Paragraph>
        <Paragraph
          className="product-description-large"
          style={{ color: "#fff" }}
        >
          {product.description}
        </Paragraph>
        <Paragraph className="product-category-large" style={{ color: "#fff" }}>
          Category: {product.category}
        </Paragraph>
        <Paragraph className="product-rating-large">
          Rating: {product.rating}
        </Paragraph>
        <Button className="buy-now-btn">Buy Now</Button>
      </Card>
    </div>
  );
};

export default ProductDetails;
