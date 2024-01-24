import React, {useEffect, useState} from 'react';
import samplePhoto from '../images/default-headshot.png'
import {ServiceTypeLabels} from "../enum/service-type.enum";
import {getBlobs} from "../network/blobCrud";
import {getStorage, ref, getDownloadURL} from "firebase/storage";

function StylistBlocks({stylists}) {
  const storage = getStorage();

  const [iconPaths, setIconPaths] = useState([]);
  const [icons, setIcons] = useState({});

  useEffect(() => {
    if (stylists?.length > 0) {
      getBlobs(stylists.map(stylist => stylist._id), "icons").then((res) => {
        setIconPaths(res);
      });
    }
  }, [stylists]);

  useEffect(() => {
    if (iconPaths?.length > 0) {
      iconPaths.map(iconPath => {
        const pathReference = ref(storage, iconPath.path);
        getDownloadURL(pathReference).then((url) => {
          setIcons(icons => {
            return {...icons, [iconPath.userId]: url}
          });
        }).catch((error) => {
          console.log(error);
        });
      });
    }
  }, [iconPaths]);


  return (
    <section id='stylists' className="relative">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Items */}
        <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
          {stylists.map((stylist, index) => (
            <a key={index} href={`/stylistDetail/${stylist._id}`} className="block-link">
              <div key={index} className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <img
                  className="mx-auto rounded -mt-1 mb-2"
                  src={icons[stylist._id] ? icons[stylist._id] : samplePhoto}
                  alt="Stylist"
                />
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">{`${stylist.firstName} ${stylist.lastName}`}</h4>
                {/*<p className="text-gray-600 text-center">{stylist.description}</p>*/}
                <p className="mt-4 text-gray-500 text-center">
                  Provided services:
                  <br />
                  {stylist.serviceTypes.map(serviceType=> ServiceTypeLabels[serviceType.name]).join(', ')}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StylistBlocks;
