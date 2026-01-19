import { useState, useEffect, useRef } from "react";

import { getAllProduce } from "../../api/produceAPI"
import ProduceItem from "./ProduceItem";

import { NavLink } from "react-router-dom";
import Backbutton from "../Utilities/Backbutton";

export default function ProduceList() {
  const [produceList, setProduceList] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [sortOption, setSortOption] = useState({ sortBy: 'created_at', sortOrder: 'desc' });
  const [unitFilter, setUnitFilter] = useState('');

  // Calling Backend API
  useEffect(() => {
    const fetchProduceData = async () => {
      try {
        const params = {
          sortBy: sortOption.sortBy,
          sortOrder: sortOption.sortOrder,
        };
        if (unitFilter) params.filterByUnit = unitFilter;

        const res = await getAllProduce(params);
        setProduceList(res.data.produceDetails)
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduceData()
  }, [sortOption, unitFilter]
  )

  const [isListView, setIsListView] = useState(() => {
    return JSON.parse(localStorage.getItem("isListView")) ?? true
  });

  useEffect(() => {
    localStorage.setItem("isListView", JSON.stringify(isListView));
  }, [isListView])


  return (
    <div
      id="produce-list"
      className="max-w-9xl mx-auto w-full bg-gray-100 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8"
    >
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
            Your Listing
          </h1>
        </div>
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          <div className="relative inline-flex space-x-1" ref={dropdownRef}>

            <Backbutton />

            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="border border-gray-200 bg-white px-2.5 py-1.5 text-gray-400 hover:border-gray-300 dark:border-gray-700/60 dark:!bg-gray-800 dark:text-gray-500 dark:hover:border-gray-600 rounded"
              aria-haspopup="true"
              aria-expanded="true">
              <span className="sr-only">Filter</span>
              <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM7 12a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z">
                </path>
              </svg>
            </button>

            {dropdownOpen
              &&
              <div className="origin-top-right z-50 absolute top-full left-0 right-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 pt-1.5 rounded-lg shadow-lg mt-1 md:left-auto md:right-0 flex items-center p-2 space-x-2">
                <select
                  value={`${sortOption.sortBy}-${sortOption.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split("-");
                    setSortOption({ sortBy, sortOrder });
                  }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 dark:text-gray-100 border rounded p-2"
                >
                  <option value="name-asc">Alphabetically (A-Z)</option>
                  <option value="name-desc">Alphabetically (Z-A)</option>
                  <option value="price-desc">Price (High-Low)</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="created_at-desc">Listing Date (New-Old)</option>
                  <option value="created_at-asc">Listing Date (Old-New)</option>
                </select>

                <select
                  value={unitFilter}
                  onChange={(e) => setUnitFilter(e.target.value)}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 dark:text-gray-100 border rounded p-2"
                >
                  <option value="">All Units</option>
                  <option value="lb">Lb</option>
                  <option value="pc">Pc</option>
                  <option value="pkt">Pkt</option>
                </select>
              </div>
            }

            <button
              onClick={() => setIsListView(false)}
              className="border border-gray-200 bg-white px-2.5 py-1.5 text-gray-400 hover:border-gray-300 dark:border-gray-700/60 dark:!bg-gray-800 dark:text-gray-500 dark:hover:border-gray-600 rounded"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="sr-only">Grid Layout</span>
              {/* <svg viewBox="0 0 18 18" className="DaraKe v3ey5">
                <path className="KZT3Q" fill="white" d="M3 9.23529L6.84 13L15 5">
                </path>
              </svg> */}
              <svg className="w-6 h-6 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z" />
              </svg>
            </button>

            <button
              onClick={() => setIsListView(true)}
              className="border border-gray-200 bg-white px-2.5 py-1.5 text-gray-400 hover:border-gray-300 dark:border-gray-700/60 dark:!bg-gray-800 dark:text-gray-500 dark:hover:border-gray-600 rounded"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="sr-only">List Layout</span>
              {/* <svg viewBox="0 0 18 18" className="absolute top-0">
                  <path className="KZT3Q" fill="white" d="M3 9.23529L6.84 13L15 5">
                  </path>
                </svg> */}
              <svg className="w-6 h-6 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5" />
              </svg>
            </button>

            <button className="px-2.5 py-1.5 rounded bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
              <NavLink to="add" className="max-xs:sr-only">Add Produce</NavLink>
            </button>
          </div>
        </div>
      </div>

      {/* Produce container */}
      <ProduceItem produceList={produceList} isListView={isListView} />
    </div>
  );
};
