import { useEffect, useState } from "react";
import Container from "../styles/Container";
import ListingItem from "../listingitem/ListingItem";
import { Link } from "react-router-dom";
import ProductSpinner from "../spinner/ProductSpinner";
import { toast } from "react-toastify";

const Popular = () => {
  const [category, setCategory] = useState("Offer");
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function changeListing() {
      try {
        const res = await fetch("/api/listing/getlistings?limit=4");
        const data = await res.json();
        setLoading(true);

        if (category === "Offer") {
          const filteredProduct = data.filter((item) => item.offer === true);
          setAllListings(filteredProduct);
          setLoading(false);
        }
        if (category === "Rent") {
          const filteredProduct = data.filter((item) => item.type === "rent");
          setAllListings(filteredProduct);
          setLoading(false);
        }
        if (category === "Sale") {
          const filteredProduct = data.filter((item) => item.type === "sale");
          setAllListings(filteredProduct);
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    }
    changeListing();
  }, [category]);
  return (
    <section className="py-20 w-[100%]">
      <Container>
        <ul className="mt-4 flex w-[97%] flex-wrap items-center justify-center gap-4 rounded-md bg-gray-300 p-7 md:flex-nowrap">
          <li
            className={`cursor-pointer text-slate-700 text-lg font-semibold py-1 px-2 rounded-md ${
              category === "Offer" ? "activeElement" : ""
            }`}
            onClick={() => {
              setCategory("Offer");
              setLoading(true);
            }}
          >
            Offer
          </li>
          <li
            className={`cursor-pointer text-slate-700 text-lg font-semibold py-1 px-2 rounded-md ${
              category === "Rent" ? "activeElement" : ""
            }`}
            onClick={() => {
              setCategory("Rent");
              setLoading(true);
            }}
          >
            Rent
          </li>
          <li
            className={`cursor-pointer text-slate-700 text-lg font-semibold py-1 px-2 rounded-md ${
              category === "Sale" ? "activeElement" : ""
            }`}
            onClick={() => {
              setCategory("Sale");
              setLoading(true);
            }}
          >
            Sale
          </li>
        </ul>
        <div className="my-3">
          <h2 className="text-2xl font-semibold text-slate-600">Recent {`${category}`}</h2>
          <Link className="text-sm text-blue-800 hover:underline" to={"/search"}>
            Show more {`${category}`}
          </Link>
        </div>
        {loading ? (
          <div className="self-center">
            <ProductSpinner />
          </div>
        ) : null}
        <div className="grid w-full gap-5 pt-2 sm:grid-cols-2 lg:grid-cols-3">
          {!loading &&
            allListings &&
            allListings.map((item) => <ListingItem listing={item} key={item._id} />)}
        </div>
      </Container>
    </section>
  );
};

export default Popular;
