import decodeit from 'jwt-decode'

// salt <=> do revserse
export function removeSalt ( token ) {
    let _token = token

    const salt = 'MXZUCCYFNRMLOEFMDCOOERIUUKEQ5eA7uB7fXZ6aA6qG1hN1yUzxZN5yE3eO5kD2xZO3qN3tF5xZWzdT4bZ3yO7mK5nZ0vU5oB6pQ9nH7mCztXZ7jB8tK5eS9oA8tZ8oF9uL2hz1cI2vR8gY7oH8eZ6sQ8cVzmD2zO5eY2vL2oB4hC7tEzbB9rZ5nJ7eM1pB7mNzqY2uB6gI1iV8jS7sXZ2uM8eK6nB2zD8zU4gA1cJ5rY8oOzkI5bE2nK7zH8oB8sP7zC2pSzcz6nR8eJ7bY5vG6eB4tJ1iA9tM6nM1fG8nD1nP2yB4nB3eY9jK5tA2jA2fE2lF5dC8uP1kN9fF2tQ6tU5nQ8cC1tF6fE3fJ3bW2yR1lKztEzkO2nV8aG3vV4vF6lV8bR9kW3aH6mXZ0eK3aM8y'
    const anOtherSalt = 'y8Ma3KG0ZXm6Ha3Wk9Rb8Vl6Fv4Vv3Ga8Vn2OkzEtzKl1Ry2Wb3Jf3Ef6Ft1Cc8Qn5Ut6Qt2Ff9Nk1Pu8Cd5Fl2Ef2Aj2At5Kj9Ye3Bn4By2Pn1Dn8Gf1Mn6Mt9Ai1Jt4Be6Gv5Yb7Je8Rn6zczSp2Cz7Ps8Bo8Hz7Kn2Eb5IkzOo8Yr5Jc1Ag4Uz8Dz2Bn6Ke8Mu2ZXs7Sj8Vi1Ig6Bu2YqzNm7Bp1Me7Jn5Zr9BbzEt7Ch4Bo2Lv2Ye5Oz2DmzVc8Qs6Ze8Ho7Yg8Rv2Ic1zh2Lu9Fo8Zt8Ao9Se5Kt8Bj7ZXtzCm7Hn9Qp6Bo5Uv0Zn5Km7Oy3Zb4TdzWZx5Ft3Nq3OZx2Dk5Oe3Ey5NZxzUy1Nh1Gq6Aa6Z'
    
    _token = _token.replace(salt , '')
    _token = _token.replace(anOtherSalt , '')
    
    return _token
}



//
/// @Returns => unkown | admin | stuff | user
// 
const getUserAuth = (cookie) => {
    // const cookie = window.document.cookie.match (
    //     process.env.NEXT_PUBLIC_COOKIE_NAME
    // )
    if (!cookie) return `unkown`
    
    const token = removeSalt (cookie)
    const decode = decodeit (token)
    
    if (decode.isAdmin === true) return `admin`
    if (decode.isStuff === true) return `stuff`
    else return `user`
}

//
/// @Returns => User ? user credentials : null
//
export const getUserByToken = (cookie) => {
    if (!cookie) return null

    const token = removeSalt (cookie)
    const decode = decodeit (token)
    
    return decode
}

export default getUserAuth

