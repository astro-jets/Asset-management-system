"use client"
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import QRScanner from "./QRScanner";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { notificationProps } from "@/types/notification";
import { BsEnvelope, BsFilterCircle, BsLaptop, BsPerson, BsXCircle } from "react-icons/bs";
import { FaFilter, FaMapMarker } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AssetProps } from "@/types/asset";
import { userProps } from "@/types/user";
import AssetExpiry from "@/app/(dashboard)/assets/[id]/expiry";
import moment from "moment";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  notifications?: notificationProps
}) => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [showFilter, setShowFilter] = useState(false);
  const [filterOption, setFilterOption] = useState('asset');
  const [query, setQuery] = useState<string>();
  const [assets, setAsset] = useState<AssetProps[]>();
  const [searchedUsers, setSearchedUser] = useState<userProps[]>();
  const [searchResults, setSearchResults] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = filterOption == "user"
        ? await fetch(`http://localhost:3000/api/users/byName?user=${query}`)
        : await fetch(`http://localhost:3000/api/assets/byName?asset=${query}`);
      const result = await res.json();
      if (result) {
        setSearchResults(true)
        if (filterOption == 'user') { setSearchedUser(result.usersData) }
        else {
          setAsset(result.assetsData)
        }
        console.log("Yonseee => ", result)
      }
      console.log("Search Result => ", result)

    } catch (err) {
    }
  }
  return (
    <div className="rounded-2xl sticky top-0 z-999 flex w-[93%] bg-white  dark:bg-boxdark drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4  2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-300"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "delay-400 !w-full"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!w-full delay-500"
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <div className="relative">
            <div className="flex flex-col absolute left-0 top-1/2 -translate-y-1/2">
              <div className={`${showFilter ? ' bg-primary rounded-full p-2 flex items-center justify-center' : ''}`}>
                <FaFilter
                  size={`${showFilter ? 15 : 20}`}
                  color={`${showFilter ? '#fff' : '#ccc'}`}
                  onClick={() => { setShowFilter(!showFilter) }}
                />
              </div>
              <div
                className={`${showFilter ? "absolute -left-4 top-10 z-40 w-40 space-y-1  border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark block rounded-2xl" : "hidden"}`}
              >
                <p
                  className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
                  onClick={() => {
                    setFilterOption("user")
                    setShowFilter(!showFilter);
                  }}
                >
                  <BsPerson size={20} color="orange" />
                  User
                </p>
                <p
                  className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
                  onClick={() => {
                    setFilterOption("asset")
                    setShowFilter(!showFilter);
                  }}
                >
                  <BsLaptop size={20} color="orange" />
                  Asset
                </p>
              </div>
            </div>
            <button className="absolute left-9 top-1/2 -translate-y-1/2" onClick={() => { handleSubmit() }}>
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder={`Search for ${filterOption == 'user' ? "a user" : "an asset"}`}
              className="w-full bg-transparent pl-20 pr-4 font-medium focus:outline-none xl:w-125"
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              value={query}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification notifications={props.notifications as notificationProps} />
            {/* <!-- Notification Menu Area --> */}

            {
              user?.role == 'admin' ? <QRScanner /> : null
            }
          </ul>
        </div>
      </div >
      {searchResults &&
        <div className="absolute w-full h-[95vh] z-9999">
          {
            filterOption == "asset" ?
              <>{
                assets?.map(asset => (
                  <div className="w-full flex flex-col justify-center  bg-white p-2 rounded-2xl shadow-3 shadow-boxdark">
                    <div className="ml-auto cursor-pointer" onClick={() => { setSearchResults(false) }}>
                      <BsXCircle color="orange" size={20} />
                    </div>
                    <div className="w-11/12 flex justify-between">
                      <img src={`/uploads/${asset.path}`} className="object-cover rounded-2xl w-[400px] h-[400px]" alt="" />
                      <div className="flex items-center text-boxdark-2 space-y-2 flex-col text-2xl">
                        <img src="/images/logo.png" className="w-full h-20 object-contain overflow-hidden" alt="" />
                        <div className="flex flex-col w-11/12 space-y-4">
                          <h1>Asset Name: {asset.name}</h1>
                          <p>Asset Cost: {asset.cost}</p>
                          {user &&
                            <>

                              <p>Assigned To:
                                <span className="px-2 font-bold text-primary cursor-pointer">{user.name}</span>
                              </p>

                              <div className="flex flex-col">
                                <p>Assigned On:</p>
                                <p> {asset.assigned_on}</p>
                              </div>
                            </>
                          }
                          <div className="flex flex-col">
                            <p>Registered On:</p><p> {moment(asset.createdAt).calendar()}</p>
                          </div>
                          <AssetExpiry expiryDate={asset.createdAt} />
                          <img src={asset.qrCode} className="object-cover rounded-2xl w-30 h-30" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
              </>
              :
              <>
                {
                  searchedUsers?.map(suser => (
                    <div className="flex z-999 bg-white items-center justify-between space-x-4 p-2 shadow-3 rounded-2xl shadow-primary w-full h-[90vh]">
                      <div className="flex flex-col space-y-3 items-start justify-start h-full w-full">
                        <div className="ml-auto cursor-pointer" onClick={() => { setSearchResults(false) }}>
                          <BsXCircle color="orange" size={20} />
                        </div>
                        <p className="flex space-x-2 items-center">
                          <BsPerson size={20} color="orangered" />
                          <span>{suser.name}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <BsEnvelope size={20} color="orangered" />
                          <span>{suser.email}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <FaMapMarker size={20} color="orangered" />
                          <span>Lilongwe</span>
                        </p>

                      </div>
                    </div>
                  ))
                }
              </>
          }

        </div>
      }
    </div >
  );
};

export default Header;
