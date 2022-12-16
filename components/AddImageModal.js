/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { useSession } from 'next-auth/react';
import { XIcon, PhotographIcon, UserGroupIcon, ChevronDownIcon, UserAddIcon, LocationMarkerIcon, FlagIcon, DotsVerticalIcon, DotsHorizontalIcon, PhoneIcon, PencilAltIcon, PencilIcon } from '@heroicons/react/solid'
import { DeviceMobileIcon, EmojiHappyIcon } from '@heroicons/react/outline'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { db, storage, storageRef } from '../firebase'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'


function Modal({ showModal, setShowModal }) {
    const filepickerRef = useRef(null)
    const { data: session, status } = useSession();
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [showAddImage, setShowAddImage] = useState(true)
    const [imageToPost, setImageToPost] = useState([]);
    const [addFromMoblie, setAddFromMoblie] = useState(false);
    const inputRef = useRef(null)



    const addImageToPost = (e) => {
        setImageUpload(e.target.files[0])
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setImageToPost((prev) => [...prev, readerEvent.target.result])
        };
    };


    const imagesListRef = ref(storage, "posts/");
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `posts/${doc.id}`);
        uploadBytes(imageRef,imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });

        console.log(imageUrls[0])
        addDoc(collection(db, 'posts'), {
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            postImage:imageUrls[0],
            timestamp: serverTimestamp()
        })
        inputRef.current.value = "";
        setImageUrls([])
        setShowModal(false)
        setImageToPost([])
    };

    const deleteSection = () => {
        setShowAddImage(false)
        setImageToPost([])
        setAddFromMoblie(false)
        if (imageUpload) {
            setImageUrls([])
            setImageUpload([])
        }
    }

    // useEffect(() => {
    //     listAll(imagesListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageUrls((prev) => [...prev, url]);
    //             });
    //         });
    //     });
    // }, []);



    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[60] outline-none focus:outline-none shadow-2xl drop-shadow-2xl"
                    >
                        <div className="relative w-[520px] my-6 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-center p-3 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="flex-1 text-xl font-semibold text-center text-black">
                                        Create post
                                    </h3>
                                    <XIcon
                                        onClick={() => setShowModal(false)}
                                        className='bg-gray-200 p-[6px] rounded-full w-9 h-9 text-xl cursor-pointer hover:bg-gray-300'>X</XIcon>

                                </div>

                                {/* form */}
                                <div className='flex space-x-2 px-6 py-2 items-center'>
                                    <div>
                                        <img src={session?.user.image} className="w-11 rounded-full" alt='' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-[#333]'>{session.user.name}</span>
                                        <div className='flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-lg w-28 cursor-pointer' id="app-title">
                                            <UserGroupIcon className='w-5 text-black' />
                                            <span className='text-black text-sm font-semibold'>Friends</span>
                                            <ChevronDownIcon className='text-black w-5' />
                                            <ReactTooltip anchorId="app-title" content="Your friends" place="bottom" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <form className={showAddImage ? 'flex flex-1 items-end' : 'flex flex-1 items-end my-4'}>
                                        {
                                            showAddImage ?
                                                (<input className='rounded-full h-12 flex-grow px-7 focus:outline-none placeholder:text-gray-700 text-black placeholder:font-normal text-base'
                                                    type="text"
                                                    ref={inputRef}
                                                    placeholder={`What's on your mind, ${session.user.name}?`}
                                                />) :
                                                (
                                                    <textarea rows="5" className="px-6 flex-grow focus:outline-none placeholder:text-gray-700 text-black placeholder:font-normal text-xl flex-1"
                                                        ref={inputRef}
                                                        placeholder={`What's on your mind, ${session.user.name}?`}
                                                    >
                                                    </textarea>
                                                )
                                        }
                                        <EmojiHappyIcon id="my-anchor-element" className='w-8 h-8 text-gray-400 mx-5 cursor-pointer hover:text-gray-500 focus:outline-none' />
                                        <ReactTooltip anchorId="my-anchor-element" content="Emoji" place="top" />
                                        <button hidden type='submit'>Submit</button>
                                    </form>

                                    {/*body*/}
                                    {
                                        showAddImage ?
                                            (
                                                <div className="border-[1px] border-gray-300 border-b-0 overflow-y-scroll scrollbar-hide rounded-lg relative m-6 mb-0 pb-8">
                                                    <XIcon onClick={() => deleteSection()}
                                                        className='absolute top-4 right-5 p-[5px] z-10 rounded-full w-8 h-8 text-xl cursor-pointer bg-white border-[1px] border-gray-300'>X</XIcon>

                                                    <div className="rounded-md flex items-center justify-center flex-col">
                                                        <div className='relative w-[96%] h-[280px] rounded-lg m-2 flex items-center justify-center hover:bg-gray-200/80 group'>
                                                            <div onClick={() => filepickerRef.current.click()} className="flex flex-col justify-center items-center flex-1 cursor-pointer h-full">
                                                                <PhotographIcon className='text-black w-10 bg-gray-200 rounded-full p-2 group-hover:bg-gray-300' />
                                                                <p className='text-black font-normal'>Add photos/videos</p>
                                                                <p className='text-xs'>or drag and drap</p>
                                                            </div>
                                                            {
                                                                imageToPost.length !== 0 ? (
                                                                    <div className="absolute bg-white rounded-lg w-full h-full flex flex-col gap-2">
                                                                        {imageToPost.map((image, index) => <img key={index} src={image} alt="" className="w-full hover:opacity-95 rounded-lg" />)}
                                                                        {
                                                                            imageToPost ? (<div className="absolute top-3 left-3 z-10 flex opacity-0 group-hover:opacity-100 gap-3">
                                                                                <div className="flex items-center justify-center bg-white rounded-md px-[10px] py-[6px] gap-1 cursor-pointer">
                                                                                    <PencilIcon
                                                                                        className='rounded-full w-6 h-6 text-xl text-black'
                                                                                    />
                                                                                    <p className="text-black text-base">{imageToPost.length <= 1 ? "Edit" : "Edit All"}</p>
                                                                                </div>
                                                                                <div onClick={() => filepickerRef.current.click()} className="flex items-center justify-center bg-white rounded-md px-[10px] py-[6px] gap-1 cursor-pointer">
                                                                                    <PhotographIcon
                                                                                        className='rounded-full w-5 h-5 text-xl text-black'
                                                                                    />
                                                                                    <p className="text-black text-base">Add Photos/Videos</p>
                                                                                </div>
                                                                            </div>) : null
                                                                        }

                                                                    </div>
                                                                ) : null
                                                            }
                                                        </div>



                                                    </div>
                                                    <input
                                                        ref={filepickerRef}
                                                        onChange={addImageToPost}
                                                        type="file"
                                                        hidden
                                                    />
                                                </div>
                                            ) : null
                                    }

                                </div>

                                <div className="relative mx-6 mb-4">
                                    <div className="flex items-center justify-between px-[1.44rem] w-full border-[1px] border-gray-300 border-t-0 rounded-md py-6">
                                        {
                                            !addFromMoblie ? (
                                                <>
                                                    <DeviceMobileIcon className="w-10 p-[6px] rounded-full bg-gray-200 text-black" />
                                                    <p className="text-black text-sm font-normal">Add photos and videos from your mobile device</p>
                                                    <button className="bg-gray-200 px-3 py-2 text-black rounded-md hover:bg-gray-300" onClick={() => setAddFromMoblie(true)}>Add</button>
                                                </>
                                            )
                                                : (
                                                    <>
                                                        <div className="lds-ring top-5 left-5 pointer-events-none"><div></div><div></div></div>
                                                        <DeviceMobileIcon className=" w-10 p-[6px] rounded-full bg-blue-500 text-white" />
                                                        <p className="text-black text-sm font-normal flex-1 px-3">Tap the notification on your mobile device to add photos and videos.</p>
                                                        <button className="bg-gray-200 px-3 py-2 text-black rounded-md hover:bg-gray-300" onClick={() => setAddFromMoblie(false)}>Cancel</button>
                                                    </>
                                                )
                                        }
                                    </div>
                                </div>

                                <div className="relative px-6">
                                    <div className='border-[1px] border-gray-300 rounded-md w-full p-3 flex items-center justify-between cursor-pointer'>
                                        <p className='text-black font-semibold'>Add to your post</p>
                                        <div className='flex space-x-2'>
                                            <PhotographIcon id="photographIcon" className='text-green-500 w-8 hover:bg-gray-200 rounded-full focus:outline-none' onClick={() => setShowAddImage(true)} />
                                            <ReactTooltip anchorId="photographIcon" content="Photo/Video" place="top" />
                                            <UserAddIcon id="userAddIcon" className='text-blue-500 w-8 focus:outline-none' />
                                            <ReactTooltip anchorId="userAddIcon" content="Tag people" place="top" />
                                            <EmojiHappyIcon id="emojiHappyIcon" className='text-yellow-500 w-8 focus:outline-none' />
                                            <ReactTooltip anchorId="emojiHappyIcon" content="Feeling/activity" place="top" />
                                            <LocationMarkerIcon id="locationMarkerIcon" className='text-red-500 w-8 focus:outline-none' />
                                            <ReactTooltip anchorId="locationMarkerIcon" content="Check in" place="top" />
                                            <FlagIcon id="flagIcon" className='text-gray-300 w-8 -rotate-[20deg] focus:outline-none' />
                                            <ReactTooltip anchorId="flagIcon" content="This cant be combined with youve already added to your post" place="top" />
                                            <DotsHorizontalIcon id="dotsHorizontalIcon" className='text-gray-500 w-5 focus:outline-none' />
                                            <ReactTooltip anchorId="dotsHorizontalIcon" content="More" place="top" />
                                        </div>

                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 pt-4 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        disabled={!imageToPost}
                                        className="w-full bg-[#1A6ED8] text-white rounded-lg py-2 disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
                                        type="button"
                                        onClick={()=>uploadFile()}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-70 fixed inset-0 z-50 bg-white "></div>
                </>
            ) : null}
        </>
    )
}

export default Modal