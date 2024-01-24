import React, {useEffect, useState} from 'react';
import Header from '../partials/Header';
import {getStylistDetails, updateStylistDetails} from "../network/stylistCrud";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {createBlob, getBlobs} from "../network/blobCrud";
import {ServiceType, ServiceTypeLabels} from "../enum/service-type.enum";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {auth} from "../config/firebase";

function StylistProfile() {
  const storage = getStorage();
  const id = auth.currentUser.uid;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    description: '',
    icon: null,
    serviceTypes: [],
  });
  const [newIcon, setNewIcon] = useState(null);

  const addService = (event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      serviceTypes: [...prevData.serviceTypes, { name: '', price: 0 }],
    }));
  };

  const handleServiceChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedServices = [...prevData.serviceTypes];
      updatedServices[index][field] = value;
      return { ...prevData, serviceTypes: updatedServices };
    });
  };

  const removeService = (index) => {
    setFormData((prevData) => {
      const updatedServices = [...prevData.serviceTypes];
      updatedServices.splice(index, 1);
      return { ...prevData, serviceTypes: updatedServices };
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Manual validation
    const requiredFields = [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
      { name: 'serviceTypes', label: 'Services' },
    ];

    const missingFields = requiredFields.filter((field) => {
      if (field.name === 'serviceTypes') {
        // Check if at least one service is provided
        console.log(formData.serviceTypes)
        return formData.serviceTypes.length === 0 || !formData.serviceTypes.every(service => service.name && service.price);
      }

      return !formData[field.name];
    });

    if (missingFields.length > 0) {
      const missingFieldLabels = missingFields.map((field) => field.label).join(', ');
      alert(`Please fill in the following required fields: ${missingFieldLabels}.`);
      return;
    }

    try {
      const body = {...formData};
      delete body.icon;

      await updateStylistDetails(id, body);

      if (newIcon) {
        console.log(formData)
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
        const fileNameWithTimestamp = `${formData.icon.name.replace(/\.[^/.]+$/, '')}_${timestamp}.${formData.icon.name.split('.').pop()}`;

        const storage = getStorage();
        const iconStorageRef = ref(storage, `icons/${fileNameWithTimestamp}`);

        await uploadBytes(iconStorageRef, formData.icon);
        console.log('Icon file uploaded successfully!');

        await createBlob({
          type: "icons",
          fileName: fileNameWithTimestamp,
          userId: id
        });
      }

      window.location.href = "/";

      console.log('Stylist profile updated successfully!');
    } catch (error) {
      console.error('Error updating stylist profile: ', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
    if (type === 'file') {
      setNewIcon(files[0]);
    }
  };

  useEffect(() => {
    // Fetch stylist details and blobs
    Promise.all([getStylistDetails(id), getBlobs([id], "icons")])
      .then(([stylist, blobs]) => {
        setFormData({
          firstName: stylist.firstName,
          lastName: stylist.lastName,
          description: stylist.description,
          icon: null,
          serviceTypes: stylist.serviceTypes,
        });

        if (blobs.length > 0) {
          const pathReference = ref(storage, blobs[0].path);

          // Fetch download URL and update formData
          getDownloadURL(pathReference).then((url) => {
            setFormData((prevData) => ({
              ...prevData,
              icon: url,
            }));
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching stylist details and blobs:", error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Update to show your recent skills to customers.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="firstName">
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="lastName">
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-input w-full h-32 text-gray-800"
                        placeholder="Tell customers something about you"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="icon">
                        Upload Icon
                      </label>
                      <input
                        id="icon"
                        name="icon"
                        type="file"
                        accept="image/*"
                        className="form-input w-full text-gray-800"
                        onChange={handleInputChange}
                      />
                      {formData.icon && !newIcon && (
                        <div className="mt-2">
                          <img src={formData.icon} alt="Uploaded Icon" className="max-w-full h-auto" />
                        </div>
                      )}
                      {formData.icon && newIcon && (
                        <div className="mt-2">
                          <img
                            id="uploadedIcon"
                            src={URL.createObjectURL(formData.icon)}
                            alt="Uploaded Icon"
                            className="w-full max-w-sm mb-4"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="services">
                        Services you provide <span className="text-red-600">*</span>
                      </label>
                      {formData.serviceTypes.map((service, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <select
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                            className="form-input w-full text-gray-800 mr-2"
                          >
                            <option value="" disabled>Select Service</option>
                            {Object.values(ServiceType).map((type) => (
                              <option key={type} value={type}>{ServiceTypeLabels[type]}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            placeholder="Enter Price"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, 'price', parseInt(e.target.value))}
                            className="form-input w-full text-gray-800 mr-2"
                          />
                          <div className="ml-auto">
                            <MinusIcon
                              className="h-5 w-5 text-gray-400 hover:text-gray-500"
                              aria-hidden="true"
                              style={{ cursor: "pointer" }}
                              onClick={() => removeService(index)}
                            />
                          </div>
                        </div>
                      ))}
                      <PlusIcon
                        className="h-5 w-5 text-gray-400 hover:text-gray-500 mt-4"
                        aria-hidden="true"
                        style={{ cursor: "pointer" }}
                        onClick={addService}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button type="submit" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default StylistProfile;
