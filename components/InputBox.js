/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { db, storage, storageRef } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
import AddImageModal from './AddImageModal'
import Link from 'next/link'


function InputBox() {
    const { data: session, status } = useSession();
    const inputRef = useRef(null)
    const filepickerRef = useRef(null)
    const [imageToPost, setImageToPost] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            {
                session ? (
                    <div className='flex space-x-4 p-4 item-center justify-center'>
                           <Image src={session?.user.image}
                                alt=""
                                className='rounded-full mt-5'
                                width={48}
                                height={48}
                                layout="fixed" />
                        <form className='flex flex-1'>
                            <input className='rounded-full h-12 hover:bg-gray-200 
                    flex-grow px-5 focus:outline-none cursor-pointer'
                                onClick={() => setShowModal(true)}
                                type="text"
                                placeholder={`What's on your mind, ${session?.user.name}?`}
                            />
                        </form>

                        {imageToPost && (
                            <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition
                    duration-150 transform hover:scale-105 cursor-pointer">
                                <img className='h-10 object-contain' src={imageToPost} alt="" />
                                <p className='text-xs text-red-500 text-center'>Remove</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='flex space-x-4 p-4 item-center'>
                        <UserCircleIcon width={50} height={50} className="text-gray-400" />
                        <Link href='/api/auth/signin'>
                            <form className='flex flex-1'>
                                <input className='rounded-full h-12 hover:bg-gray-200 
                                            flex-grow px-5 focus:outline-none cursor-pointer'
                                    type="text"
                                    placeholder={`What's on your mind?`}
                                />
                            </form>
                        </Link>
                    </div>
                )
            }

            <div className='flex justify-evenly p-3 border-t'>
                <div className='inputIcon'>
                    <VideoCameraIcon className='h-7 text-red-500' />
                    <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
                </div>

                {
                    session ? (
                        <div type="button" onClick={() => setShowModal(true)} className='inputIcon'>
                            <CameraIcon className='h-7 text-green-400' />
                            <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                        </div>
                    ) : (
                        <Link href='/api/auth/signin'>
                        <div type="button" className='inputIcon'>
                            <CameraIcon className='h-7 text-green-400' />
                            <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                        </div>
                        </Link>

                    )
                }

                <div className='inputIcon'>
                    <EmojiHappyIcon className='h-7 text-yellow-500' />
                    <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
                </div>
            </div>

            <div>
                {imageUrls.map((url, index) => {
                    return <img src={url} key={index} alt="" />;
                })}
            </div>

            <AddImageModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

export default InputBox