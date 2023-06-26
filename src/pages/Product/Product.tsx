import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import "./product-page.css";
import { SyntheticEvent, useState } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const products = useSelector((state: any) => state.products.products);
  let product: any = null;
  if (id) product = products?.find((p: any) => p.id === +id) || null;
  const images = product?.attributes.images.data?.map((img: any) => {
    return "http://localhost:1337" + img.attributes.url;
  });
  const [bigImg, setBigImg] = useState(images[0]);
  const handleChangeImg = (e: SyntheticEvent<HTMLImageElement>) => {
    setBigImg(e.currentTarget.src);
  };
  const {
    name: productName,
    price: productPrice,
    category,
  } = product?.attributes;
  const categoryName = category.data?.attributes.name;
  if (!product?.attributes)
    return <SectionHeading position="center" text="Not Found" />;

  return (
    <>
      <section>
        <SectionHeading position="left" text={productName} />
        <hr />
        <div className="product-container">
          <div className="product-images">
            {images &&
              images.map((imgUrl: string) => (
                <img
                  key={imgUrl}
                  src={imgUrl}
                  alt={imgUrl}
                  onClick={handleChangeImg}
                />
              ))}
          </div>
          <div className="big-img">
            {bigImg && <img src={bigImg} alt={bigImg} />}
          </div>
          <div className="details">
            <h3>{productName}</h3>
            <div className="price">
              <span>price: </span>
              <span>${productPrice}</span>
            </div>
            <div className="category">
              <span>category: </span>
              <span>{categoryName || "Not Exist"}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
