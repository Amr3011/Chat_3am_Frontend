import React from "react";
import AmigosChatting from '../assets/Amigos Chatting.png'
import Profile from '../assets/Profile.png'
import { useState } from 'react'
import { CgClose } from "react-icons/cg";
import UseWindowSize from "../components/hooks/UseWindowSize";

const UserInfo = () => {

    const [width] = UseWindowSize();

    const [isUserInfo, setUserInfo] = useState(true);
    const [isUpdateuserInfo, setUpdateUserInfo] = useState(false);
    const [isChangePassword, setChangePassword] = useState(false);
    const [isUpdateInfo, SetUpdateInfo] = useState(false);
    const [isChangeinfoPassword, SetChangeinfoPassword] = useState(false);

    const toggleupdateinputinfo = () => {
        SetUpdateInfo(!isUpdateInfo)
    }

    const toggleChangeinfoPassword = () => {
        SetChangeinfoPassword(!isChangeinfoPassword)
    }

    const toggleChangePassword = () => {
        setUserInfo(false);
        setUpdateUserInfo(false);
        setChangePassword(true);
    };

    const toggleUpdateInfo = () => {
        setUserInfo(false);
        setChangePassword(false);
        setUpdateUserInfo(true);
    };

    const toggleUserInfo = () => {
        setUpdateUserInfo(false);
        setChangePassword(false);
        setUserInfo(true);
    };

    const closehandler = () => {
        toggleUserInfo();
    }

    const submitUpdateInfoForm = (e) => {
        e.preventDefault();
    };

    const submitChangePasswordForm = (e) => {
        e.preventDefault();
    };

    // console.log(window.innerHeight);
    // console.log(window.innerWidth);


    return (
        <div className="min-h-screen flex text-neutral font-roboto">
            <div className="w-full md:w-[40%] lg:w-[30%] p-8 bg-base-100 rounded-3xl shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-secondary">Personal Information</h1>

                <div className="flex items-center mb-8">
                    <img
                        src={Profile}
                        alt="User Profile"
                        className="w-20 h-20 rounded-full mr-6"
                    />
                    <span className="text-xl font-semibold text-secondary">Lavern Laboy</span>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-4 text-secondary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v16m4-16v16m4-16v16m4-16v16m4-16v16" />
                        </svg>
                        <span className="text-lg">Change Profile Picture</span>
                    </div>

                    <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary"
                        onClick={toggleUpdateInfo}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-4 text-secondary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V8m0 6h.01M6.5 8H18l2 7-4 4.5H8.5l-4-4.5 2-7z" />
                        </svg>
                        <span className="text-lg">Edit Personal Info.</span>
                    </div>

                    <div className="flex items-center border-b border-neutral pb-4 cursor-pointer hover:text-primary"
                        onClick={toggleChangePassword}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-4 text-secondary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 7V3a1 1 0 011-1h6.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0115.414 4H20a1 1 0 011 1v10a1 1 0 01-1 1h-1"
                            />
                        </svg>
                        <span className="text-lg">Change Password</span>
                    </div>
                </div>
            </div>

            {width < 768 ? <>
                
            </> : <>


                {isUserInfo && (
                    <div className="md:block flex-1 bg-primary flex justify-center items-center p-12">
                        <div className="text-center text-base-100 mt-16">
                            <div className="flex justify-center">
                                <img
                                    src={AmigosChatting}
                                    alt="Illustration"
                                    className="mb-8"
                                />
                            </div>
                            <p className="text-xl">Start Chat with your Friends, Make calls, Share your Screen and get Faster Now...</p>
                        </div>
                    </div>
                )}

                {isUpdateuserInfo && (
                    <div className="md:block flex-1 flex justify-center items-center p-12">
                        <div className="flex justify-between">
                            <h2 className='text-black mb-4 text-4xl'>Personal Information</h2>
                            <div>
                                <CgClose
                                    onClick={closehandler}
                                    className="text-3xl justify-items-center text-primary hover:cursor-pointer"
                                />
                            </div>
                        </div>
                        {!isUpdateInfo ?
                            <>
                                <form onSubmit={submitUpdateInfoForm}>
                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="fullName">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            defaultValue="aymanhossam"
                                            className="input input-bordered w-full p-3 rounded-md"
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="username">
                                            UserName
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            defaultValue="Aymanhossam66"
                                            className="input input-bordered w-full p-3 rounded-md"
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            defaultValue="01232343567"
                                            className="input input-bordered w-full p-3 rounded-md"
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            defaultValue="ayman@gmail.com"
                                            className="input input-bordered w-full p-3 rounded-md"
                                            disabled
                                        />
                                    </div>

                                    <div className="flex justify-end" onClick={toggleupdateinputinfo}>
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-6 py-3 rounded-md text-base-100 text-lg font-medium"
                                        >
                                            Update Info
                                        </button>
                                    </div>
                                </form>
                            </> : <>
                                <form onSubmit={submitUpdateInfoForm}>
                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="fullName">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            defaultValue="aymanhossam"
                                            className="input input-bordered w-full p-3 rounded-md"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="username">
                                            UserName
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            defaultValue="Aymanhossam66"
                                            className="input input-bordered w-full p-3 rounded-md"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            defaultValue="01232343567"
                                            className="input input-bordered w-full p-3 rounded-md"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-lg font-medium mb-2" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            defaultValue="ayman@gmail.com"
                                            className="input input-bordered w-full p-3 rounded-md"
                                        />
                                    </div>

                                    <div className="flex justify-end" onClick={toggleupdateinputinfo}>
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-6 py-3 rounded-md text-base-100 text-lg font-medium"
                                        >
                                            Save the Changes.
                                        </button>
                                    </div>
                                </form>
                            </>}
                    </div>
                )}

                {isChangePassword && (
                    <div className="md:block flex-1 flex justify-center items-center rounded-3xl ml-8 p-12 shadow-lg">
                        <div className="flex justify-between">
                            <h2 className='text-black mb-4 text-4xl'>Change Password</h2>
                            <div>
                                <CgClose
                                    onClick={closehandler}
                                    className="text-3xl justify-items-center text-primary hover:cursor-pointer"
                                />
                            </div>
                        </div>
                        {!isChangeinfoPassword ? <>
                            <form onSubmit={submitChangePasswordForm}>
                                <div className="mb-4">
                                    <label className="block text-lg font-medium mb-2" htmlFor="fullName">
                                        Enter Old Password
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        defaultValue="aymanhossam"
                                        className="input input-bordered w-full p-3 rounded-md"
                                        disabled
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-medium mb-2" htmlFor="username">
                                        Enter New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        defaultValue="Aymanhossam66"
                                        className="input input-bordered w-full p-3 rounded-md"
                                        disabled
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-medium mb-2" htmlFor="phoneNumber">
                                        Enter New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmnewPassword"
                                        name="confirmnewPassword"
                                        defaultValue="01232343567"
                                        className="input input-bordered w-full p-3 rounded-md"
                                        disabled
                                    />
                                </div>

                                <div className="flex justify-end" onClick={toggleChangeinfoPassword}>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-6 py-3 rounded-md text-base-100 text-lg font-medium"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </> : <>
                            <form onSubmit={submitChangePasswordForm}>
                                <div className="mb-4">
                                    <label className="block text-lg font-medium mb-2" htmlFor="fullName">
                                        Enter Old Password
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        defaultValue="aymanhossam"
                                        className="input input-bordered w-full p-3 rounded-md"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-medium mb-2" htmlFor="username">
                                        Enter New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        defaultValue="Aymanhossam66"
                                        className="input input-bordered w-full p-3 rounded-md"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-lg font-medium mb-2" htmlFor="phoneNumber">
                                        Enter New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmnewPassword"
                                        name="confirmnewPassword"
                                        defaultValue="01232343567"
                                        className="input input-bordered w-full p-3 rounded-md"
                                    />
                                </div>

                                <div className="flex justify-end" onClick={toggleChangeinfoPassword}>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-6 py-3 rounded-md text-base-100 text-lg font-medium"
                                    >
                                        Save new Password
                                    </button>
                                </div>
                            </form>
                        </>}
                    </div>
                )}
            </>
            }
        </div>
    );
};

export default UserInfo;
