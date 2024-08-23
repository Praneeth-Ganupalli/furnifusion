export const saveUserInfo = (userInfo)=>{
    localStorage.setItem('userInfo',JSON.stringify(userInfo));
}

export const getSavedInfo = ()=>{
    return JSON.parse(localStorage.getItem('userInfo')) || null
}
export const clearAndNavigateToLogin = ()=>{
    removeSavedInfo();
    window.location.href="/login"
}
export const removeSavedInfo = ()=>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cart');
}