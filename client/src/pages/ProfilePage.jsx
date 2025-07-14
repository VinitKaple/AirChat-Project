import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[url("/vivid.jpg")] bg-cover bg-no-repeat'>

      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className='absolute top-5 left-5 bg-white/70 backdrop-blur-md text-black px-4 py-2 rounded-full text-sm shadow-md hover:bg-white/90 transition-all flex items-center gap-2'
      >
        <img src={assets.arrow_icon} alt="Back" className='w-4' />
        Back
      </button>

      <div className='w-5/6 max-w-2xl bg-white/70 backdrop-blur-xl text-black flex items-center justify-between max-sm:flex-col-reverse rounded-2xl p-6 shadow-lg'>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">

          <h3 className="text-2xl font-semibold mb-2">Edit Profile</h3>

          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer text-sm'>
            <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : authUser.profilePic || assets.avatar_icon}
              alt="avatar"
              className='w-12 h-12 rounded-full object-cover border border-black/20' />
            <span className='hover:underline text-black'>Upload Profile Picture</span>
          </label>

          <input onChange={(e) => setName(e.target.value)} value={name}
            type="text"
            required
            placeholder='Your name'
            className='p-3 bg-white border border-black/20 rounded-lg text-black placeholder-gray-600 outline-none focus:ring-2 focus:ring-pink-500 text-sm' />

          <textarea onChange={(e) => setBio(e.target.value)} value={bio}
            placeholder="Write your bio"
            required
            rows={4}
            className="p-3 bg-white border border-black/20 rounded-lg text-black placeholder-gray-600 outline-none focus:ring-2 focus:ring-pink-500 text-sm"></textarea>

          <button type="submit" className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-all">Save Changes</button>

        </form>

        <img
          className='max-w-44 aspect-square rounded-full object-cover mx-10 max-sm:mt-8 border-2 border-black/20 shadow-lg'
          src={selectedImg ? URL.createObjectURL(selectedImg) : authUser.profilePic || assets.Profile}
          alt="profile" />

      </div>

    </div>
  )
}

export default ProfilePage
