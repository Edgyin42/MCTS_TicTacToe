const DialogueBox = ({ message }) => {
  return (
    <div className="flex-1 ml-4 relative border-4 border-gray-800 p-2 bg-gray-100">
      {/* Main dialogue box with pixel art style */}
      <div className="
        bg-gray-300 
        p-6 
        rounded-none
        border-4 
        border-red-500 
        shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]
        relative
        font-['Press_Start_2P',_monospace]
        min-h-[100px]
      ">
        {/* Triangle indicator at bottom right */}
        <div className="
          absolute 
          bottom-0 
          right-4 
          w-0 
          h-0 
          border-l-[15px] 
          border-l-transparent
          border-t-[15px] 
          border-t-gray-300
        "></div>
        
        {/* Message text */}
        <p className="
          text-gray-800 
          text-lg 
          leading-relaxed 
          mb-8
          font-pixel
        ">{message}</p>
        
        {/* Buttons container */}
        <div className="flex justify-end mt-4 space-x-4">
          <button className="
            px-6 
            py-2 
            bg-red-500 
            text-white 
            border-2 
            border-red-700
            hover:bg-red-600 
            active:translate-y-1
            transition-all
            font-pixel
            text-sm
          ">
            Next Step
          </button>
          <button className="
            px-6 
            py-2 
            bg-red-500 
            text-white 
            border-2 
            border-red-700
            hover:bg-red-600 
            active:translate-y-1
            transition-all
            font-pixel
            text-sm
          ">
            Auto Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
