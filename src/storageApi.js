export function clearToken() {
  localStorage.removeItem('token');
};

export function storeToken(token){
  if(!token){
    return;
  }
  localStorage.setItem('token', token);
}
export function getToken(){
  return localStorage.getItem('token');
}