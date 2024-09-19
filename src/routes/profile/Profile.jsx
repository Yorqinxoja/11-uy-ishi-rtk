import React from "react";
import { Card, Typography } from "antd";
import { useProfileQuery } from "../../redux/api/profileApi";
import "./Profile.css";

const { Title } = Typography;

const Profile = () => {
  const { data } = useProfileQuery();

  return (
    <div className="profile-container">
      {data && data.payload && (
        <Card className="profile-card" bordered={false}>
          <img src={data.payload.photo_url} alt="Profile" />
          <Title level={2}>{data.payload.username}</Title>
          <Title level={4}>{data.payload.first_name}</Title>
        </Card>
      )}
    </div>
  );
};

export default Profile;
