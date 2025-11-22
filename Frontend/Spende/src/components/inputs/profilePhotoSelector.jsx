import React from 'react'
import {LuUser,LuUpload,LuTrash} from 'react-icons/lu';

const ProfilePhotoSelector = () => {
    const inputRef = React.useRef(null);
    const [preview, setPreview] = React.useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
      if (file){
        //Upload image preview
        setImage(file);

        //Generate preview from URL from the file
        const previewUrl = URL.createObjectURL(file);
      }
    };
    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    }
    const onChooseFile = () => {
        inputRef.current.click();
    }
  return (
    <div>
        <input 
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
         />
         {!image? (
         <div className='w-20 h-20 items-center bg-purple-100 rounded-full relative'>
            <LuUser className='text-4xl text-primary'/>

            <button 
            type='button'
            className='w-8 h-8 items-center justify-center flex bg-primary text-white rounded-full absolute -bottom-1 -right-1 '
            onClick={onChooseFile}
            >
                <LuUpload />
            </button>
         </div>
            ):(
                <div className=''>
                    <img src={previewUrl} alt="profile photo" className='' />
                    <button 
                    type='button'
                    className=''
                    onClick={handleRemoveImage}>
                        <LuTrash />
                    </button>
                </div>
         )}
    </div>
  )
}

export default ProfilePhotoSelector