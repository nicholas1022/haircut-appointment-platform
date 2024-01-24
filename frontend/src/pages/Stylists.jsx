import React, {Fragment, useEffect, useState} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import StylistBlocks from "../partials/StylistBlocks";
import {getAll} from "../network/stylistCrud";
import {ServiceTypeLabels, ServiceType} from "../enum/service-type.enum";
import {SortOptionType, SortOptionTypeLabel} from "../enum/sort-option-type.enum";

export default function Stylists() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [stylists, setStylists] = useState([]);
  const [filteredStylists, setFilteredStylists] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [categoryFilter, setCategoryFilter] = useState({
    [ServiceType.HAIRCUT]: true,
    [ServiceType.HAIR_COLORING]: true,
    [ServiceType.HAIR_STYLING]: true,
    [ServiceType.HAIR_TREATMENT]: true,
    [ServiceType.NAIL]: true,
    [ServiceType.SKIN_CARE]: true,
    [ServiceType.MAKEUP]: true,
    [ServiceType.OTHERS]: true,
  })
  const [sortOptions, setSortOptions] = useState(SortOptionType.NEWEST);

  useEffect(() => {
    getAll().then((res) => {
      setStylists(res);
      setFilteredStylists(sortStylists(res, sortOptions));
    });
  }, []);

  useEffect(() => {
    const activeFilters = Object.entries(categoryFilter)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    let updatedStylists = stylists.filter((stylist) => {
      return stylist.serviceTypes.some(serviceType => {
        return activeFilters.includes(serviceType.name) && serviceType.price >= minPrice && serviceType.price <= maxPrice;
      });
    });

    setFilteredStylists(sortStylists(updatedStylists, sortOptions));
  }, [categoryFilter, minPrice, maxPrice, sortOptions]);

  const sortStylists = (stylists, sortOptions) => {
    switch (sortOptions) {
      case SortOptionType.NEWEST:
        return stylists.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      case SortOptionType.LOW_TO_HIGH:
        return stylists.sort((a, b) => {
          return a.serviceTypes[0].price - b.serviceTypes[0].price;
        });
      case SortOptionType.HIGH_TO_LOW:
        return stylists.sort((a, b) => {
          return b.serviceTypes[b.serviceTypes.length - 1].price - a.serviceTypes[a.serviceTypes.length - 1].price;
        });
      default:
        return stylists.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }
  }

  const handleFilterChange = (value, checked) => {
    setCategoryFilter((prevFilters) => {
      const newFilters = {...prevFilters};
      newFilters[value] = checked;
      return newFilters;
    });
  }

  const handleMinPriceChange = (e) => {
    let value = parseInt(e.target.value, 10);
    value = Math.max(0, Math.min(value, maxPrice));
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    let value = parseInt(e.target.value, 10);
    value = Math.max(0, value);
    setMaxPrice(value);
  };

  const handleSortChange = (value) => {
    setSortOptions(value);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <div as="div" key="category" className="border-t border-gray-200 px-4 py-6">
                      <>
                        <span className="font-medium text-gray-900">Category</span>
                        <div className="pt-6">
                          <div className="space-y-4">
                            {Object.entries(categoryFilter).map(([key, value]) => (
                              <div key={key} className="flex items-center">
                                <input
                                  id={`category-${key}`}
                                  type="checkbox"
                                  defaultChecked={value}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={(e) => handleFilterChange(key, e.target.checked)}
                                />
                                <label
                                  htmlFor={`category-${key}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {ServiceTypeLabels[key]}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    </div>

                    <div className="mx-4 space-y-4 my-8">
                      <div className="flex items-center">
                        <label htmlFor="minPrice" className="text-sm text-gray-600">
                          Min Price:
                        </label>
                        <input
                          type="number"
                          id="minPrice"
                          value={minPrice}
                          onChange={handleMinPriceChange}
                          className="ml-3 w-20 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="flex items-center">
                        <label htmlFor="maxPrice" className="text-sm text-gray-600">
                          Max Price:
                        </label>
                        <input
                          type="number"
                          id="maxPrice"
                          value={maxPrice}
                          onChange={handleMaxPriceChange}
                          className="ml-3 w-20 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 h2 mb-4">Explore Stylists</h1>
            {/*<h1 className="h2 mb-4">Explore the stylists</h1>*/}

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {Object.entries(SortOptionType).map(([key, value]) => (
                        <Menu.Item key={value}>
                          <div className= 'text-sm text-gray-600 block px-4 py-2' xf onClick={() => handleSortChange(value)}>
                            {SortOptionTypeLabel[value]}
                          </div>
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <div key="category" className="border-b border-gray-200 pb-6">
                  <>
                    <span className="font-medium text-gray-900">Category</span>
                    <div className="pt-6">
                      <div className="space-y-4">
                        {Object.entries(categoryFilter).map(([key, value]) => (
                          <div key={key} className="flex items-center">
                            <input
                              id={`category-${key}`}
                              type="checkbox"
                              defaultChecked={value}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={(e) => handleFilterChange(key, e.target.checked)}
                            />
                            <label
                              htmlFor={`category-${key}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {ServiceTypeLabels[key]}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                </div>

                <div className="space-y-4 my-8">
                  <div className="flex items-center">
                    <label htmlFor="minPrice" className="text-sm text-gray-600">
                      Min Price:
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      className="ml-3 w-20 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="maxPrice" className="text-sm text-gray-600">
                      Max Price:
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      className="ml-3 w-20 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </form>

              {/* Product grid */}
              {stylists && stylists.length > 0 &&
                <div className="lg:col-span-3">{<StylistBlocks stylists={filteredStylists} />}</div>
              }
            </div>
          </section>
        </main>
      </div>
    </div>

      {/*  Site footer */}
      <Footer />
    </div>
  )
}
