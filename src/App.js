import React, { useEffect, useState } from "react";
import { Card, Image, Input, List, Space, Typography } from "antd";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
      .then((res) => res.json())
      .then((response) => {
        setDataSource(response.products);
        setLoading(false);
      });
  }, [searchText]);

  return (
    <Space style={{ padding: "0px 30px" }} direction="vertical">
      <Typography.Title
        style={{ textAlign: "center", fontFamily: "monospace" }}
      >
        Galery
      </Typography.Title>
      <Input.Search
        defaultValue={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ maxWidth: 500, display: "flex", margin: "0 auto" }}
        onSearch={(value) => {
          setSearchText(value);
        }}
      />
      <Typography.Text>
        Showing results for:{" "}
        <Typography.Text strong>{searchText || "all"}</Typography.Text>
      </Typography.Text>
      <List
        loading={loading}
        dataSource={dataSource}
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        renderItem={(item) => {
          return (
            <Card
              hoverable
              key={item.id}
              style={{ height: 300, margin: 10, overflow: "hidden" }}
            >
              <Image
                src={item.thumbnail}
                preview={{ visible: false }}
                onClick={() => {
                  setPreviewImages(item.images);
                }}
              />
            </Card>
          );
        }}
      ></List>
      {previewImages.length > 0 ? (
        <Image.PreviewGroup
          preview={{
            visible: previewImages.length,
            onVisibleChange: (val) => {
              if (!val) setPreviewImages([]);
            },
          }}
        >
          {previewImages.map((image) => {
            return <Image src={image} />;
          })}
        </Image.PreviewGroup>
      ) : null}
    </Space>
  );
}

export default App;
