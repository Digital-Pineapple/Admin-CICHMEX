export const getUsers = async() =>{
    const url = `https://api.carwashymas.com/api/user`;
    const resp = await fetch ( url );
    const { data } = await resp.json();
    
    const users = data.map (user => ({
        id: user._id,
        name: user.fullname,
        email:user.email,

    }))
    
    return users;
    
}