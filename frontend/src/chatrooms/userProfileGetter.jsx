
import axios from 'axios';
const axiosApiInstance = axios.create();

export async function getProfileColor(senderName) {
      try{
        const color = await axiosApiInstance.get('http://localhost:3000/user/getUserProfile', {
            withCredentials: true,
            params : {
              userName : senderName
            }
            });
        return color.data.profilePicture;
      }catch(error)
      {
        return error
      }
}

export async function getDisPlayName(senderName)
    {
      try
      {
        const disPlayName = await axiosApiInstance.get('http://localhost:3000/user/getUserProfile', {
            withCredentials: true,
            params : {
              userName : senderName
            }
            });
        return disPlayName.data.displayName;
      }catch(error)
      {
        return error
      }
      
};