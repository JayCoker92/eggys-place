import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { menuItems } from "../db";
import MyButton from "../components/MyButton";
import { useEffect } from "react";
import CartContext from "../context/CartContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import rateIcon from "../assets/rating-icon.svg";
 
const baseUrl = import.meta.env.VITE_API_URL;
const Product = () => {
  const { handleAddToCart } = useContext(CartContext);
  const [product,setProduct] = useState(null)
  const[similarProducts,setSimilarProducts] = useState([]);
  // const { id } = useParams();
  // const product = menuItems.find((item) => item._id == id);
  // const similarProducts = menuItems
  //   .filter((item) => item.category == product.category)
  //   .map((it) => it);

  const { productId } = useParams();


 
  const fetchProduct = async () => {
    try {
      const req = await fetch(`http://localhost:4040/api/product/${productId}`);
      const res = await req.json();
      setProduct(res.product)
      const allproducts = await fetch (`http://localhost:4040/api/product/all-products`);
      const allproductsData = await allproducts.json();
       const filteredSimilarProducts = allproductsData.products.filter((item)=>item.category === res.product.category && item._id)
      setSimilarProducts(filteredSimilarProducts);
      // const filteredSimilarProducts = allproductsData.products.filter(
      //   (item) => item.category === res.product.category && item._id !== res.product._id
      // );
      // setSimilarProducts(filteredSimilarProducts);
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
    // window.scroll({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
    fetchProduct()
  },[productId]);

  return (
    <>
      <main className="wrapper bg-[#2F2F2F]  ">
        <section className="md:grid grid-cols-2 py-1 ">
          <div className="">
            <img src={product?.image} alt="" className="w-[650px] object-cover" />
          </div>
          <div className="text-[#FFFFFF] md:px-8 flex flex-col justify-center gap-y-[20px] ">
            <h1 className="font-[500] text-[34px]"> {product?.title} </h1>
            <p className="font-[400] text-[20px] py-4">
              {" "}
              {product?.description}{" "}
            </p>
            <MyButton
              onClick={() => {
                handleAddToCart(product), toast.success("Item added");
              }}
              text="Add To Cart"
              className="w-full h-[56px] "
            />
          </div>
        </section>

        <section className="mt-10 snap-x ">
          <h2 className="text-white text-4xl pb-6">Others You Might Like</h2>
          <div className="flex overflow-x-auto snap-x scroll-smooth space-x-3 md:space-x-6 pb-4 no-scrollbar">
            {similarProducts.map((similarProduct) => {
              const {_id,image,title,rating,price,duration} = similarProduct
              return (
               <div
                  key={_id}
                  className="card bg-[#252422] w-[300px] md:w-[340px] md:min-w-[340px]  flex-none snap-start p-[16px] shadow-sm "
                >
                  <Link to={`/product/${_id}`}>
                  
                  <figure>
                    <img
                      src={image}
                      alt="Shoes"
                      className="w-full h-auto object-cover "
                    />
                  </figure>
                  </Link>
                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <h2 className="card-title font-[500] text-[20px] text-[#FBFBFB] ">
                        {title}{" "}
                      </h2>
                      <div className="flex gap-x-2 border border-[#B67B0F] py-[6px] px-[4px] rounded-[2px] ">
                        <img src={rateIcon} alt="rate-icon" />
                        <p className="text-[#FBFBFB] font-[400] text-[14px]">
                          {" "}
                          {rating}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[#B67B0F]  py-5 ">
                        {" "}
                        <span className="font-[200] text-[23px]">
                          &#8358;
                        </span>{" "}
                        <span className="font-[500] text-[31px]">{price}</span>{" "}
                      </p>
                      <p className="text-[#FBFBFB]"> {duration} </p>
                    </div>
                    <div className="card-actions justify-center ">
                      <MyButton
                        text="Add to cart"
                        className="w-full h-[56px]"
                        onClick={()=> {handleAddToCart(similarProduct) ,  toast.success('Item added')  } }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;