import { React, useState, useEffect } from "react";
import { getLawyers } from "../../firebase";
import { Link } from "react-router-dom";

export default function Marketplace() {

  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getLawyers();
      setLawyers(data);
    }
    fetch();
  }, []);
  
  console.log(lawyers[0]);

  return (
    <div className="bg-zinc-800 h-screen overflow-hidden">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg">
          Lawyers Available
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {lawyers.filter((lawyer, index) => {
            return lawyer.company !== "" && lawyer.fullName !== "" && lawyer.expertise.map((x) => x.bool).includes(false)
          }).map((product) => (
            <div key={product.key} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.photoURL}
                  alt=""
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-white">
                    <Link to={`/marketplace/${product.uid}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.fullName}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-white">{product.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}