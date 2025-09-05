// utils/getFreshToken.js
const getFreshToken = async (user) => {
    if (!user) throw new Error("No user authenticated");
    return await user.getIdToken(true); // ✅ always fetch fresh token
  };
  
  export default getFreshToken;
  