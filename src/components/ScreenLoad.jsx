const ScreenLoad = () => {
    return (
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
            <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className='rounded-full h-28 w-28' alt="" />
        </div>
    );
};

export default ScreenLoad;