<div className="relative m-6 mb-4">
<XIcon onClick={() => deleteSection()}
    className='absolute top-4 right-5 p-[5px] z-10 rounded-full w-8 h-8 text-xl cursor-pointer bg-white border-[1px] border-gray-300'>X</XIcon>

<div className="border-[1px] border-gray-300 rounded-md flex items-center justify-center flex-col">
    <div className='relative w-[96%] h-[280px] rounded-lg m-2 flex items-center justify-center hover:bg-gray-200/80 group'>
        <div onClick={() => filepickerRef.current.click()} className="flex flex-col justify-center items-center flex-1 cursor-pointer h-full">
            <PhotographIcon className='text-black w-10 bg-gray-200 rounded-full p-2 group-hover:bg-gray-300' />
            <p className='text-black font-normal'>Add photos/videos</p>
            <p className='text-xs'>or drag and drap</p>
        </div>
        {
            imageToPost.length !== 0 ? (
                <div className="absolute bg-black rounded-lg w-full h-full flex flex-col gap-4">
                    {imageToPost.map((image, index) => <img key={index} src={image} alt="" className="w-full hover:opacity-95" />)}
                    {
                        imageToPost ? (<div className="absolute top-3 left-3 z-10 flex opacity-0 group-hover:opacity-100 gap-3">
                            <div className="flex items-center justify-center bg-white rounded-md px-[10px] py-[6px] gap-1 cursor-pointer">
                                <PencilIcon
                                    className='rounded-full w-6 h-6 text-xl text-black'
                                />
                                <p className="text-black text-base">Edit</p>
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

    <div className="relative flex items-center justify-between w-full p-6 ">
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
<input
    ref={filepickerRef}
    onChange={addImageToPost}
    type="file"
    hidden
/>
</div>