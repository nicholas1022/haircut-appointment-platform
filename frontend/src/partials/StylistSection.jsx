import StylistBlocks from "./StylistBlocks";
import {useEffect, useState} from "react";
import {getAll} from "../network/stylistCrud";

const StylistSection = () => {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      setStylists(res
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 3));
    });
  }, []);

  return (
    <section className="relative">

    {/* Section background (needs .relative class on parent and next sibling elements) */}
    <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
    <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

    <div className=" max-w-6xl mx-auto px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h2 mt-40 mb-4">Explore the stylists</h1>
        <p className="text-xl text-gray-600">Here are the best stylist in Toronto. Get personalized, expert styling services including Hair cuts for Men & Women, Extenstions, Keratine treatment, Microblading, & Much more. Available in-store or virtually. Book your appointment today!
        </p>
      </div>
    </div>
    <StylistBlocks stylists={stylists}/>

    </section>
  );
};

export default StylistSection;