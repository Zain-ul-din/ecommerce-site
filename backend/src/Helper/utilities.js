import { Prisma } from "@prisma/client";

export const RESPONSE = {
  status: 200,
  message: "success",
  data: undefined,
};

export const BAD_REQ_RESPONSE = {
  status: 400,
  message: "fail",
  error: "bad request",
};

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

export function PRISMA_ERROR_RESPONSE(err) {
  if (err instanceof Prisma.PrismaClientKnownRequestError)
    return {
      message: `fail with error code ${err.code} learn more about it site : https://www.prisma.io/docs/reference/api-reference/error-reference`,
      code: err.code,
    };
  return {
    message: `fail with unkown error`,
    code: -1,
  };
}

// salt <=> do revserse
export function addSalt(token, mode = "http" | "decode") {
  let _token = "";

  const NUMBERS = ["a", "A", "b", "C", "B", "d", "E"];

  const salt = `MXZUCCYFNRMLOEFMDCOOERIUUKEQ5eA7uB7fXZ6aA6qG1hN1yUzxZN5yE3eO5kD2xZO3qN3tF5xZWzdT4bZ3yO7mK5nZ0vU5oB6pQ9nH7mCztXZ7jB8tK5eS9oA8tZ8oF9uL2hz1cI2vR8gY7oH8eZ6sQ8cVzmD2zO5eY2vL2oB4hC7tEzbB9rZ5nJ7eM1pB7mNzqY2uB6gI1iV8jS7sXZ2uM8eK6nB2zD8zU4gA1cJ5rY8oOzkI5bE2nK7zH8oB8sP7zC2pSzcz6nR8eJ7bY5vG6eB4tJ1iA9tM6nM1fG8nD1nP2yB4nB3eY9jK5tA2jA2fE2lF5dC8uP1kN9fF2tQ6tU5nQ8cC1tF6fE3fJ3bW2yR1lKztEzkO2nV8aG3vV4vF6lV8bR9kW3aH6mXZ0eK3aM8y`;
  const anOtherSalt =
    "y8Ma3KG0ZXm6Ha3Wk9Rb8Vl6Fv4Vv3Ga8Vn2OkzEtzKl1Ry2Wb3Jf3Ef6Ft1Cc8Qn5Ut6Qt2Ff9Nk1Pu8Cd5Fl2Ef2Aj2At5Kj9Ye3Bn4By2Pn1Dn8Gf1Mn6Mt9Ai1Jt4Be6Gv5Yb7Je8Rn6zczSp2Cz7Ps8Bo8Hz7Kn2Eb5IkzOo8Yr5Jc1Ag4Uz8Dz2Bn6Ke8Mu2ZXs7Sj8Vi1Ig6Bu2YqzNm7Bp1Me7Jn5Zr9BbzEt7Ch4Bo2Lv2Ye5Oz2DmzVc8Qs6Ze8Ho7Yg8Rv2Ic1zh2Lu9Fo8Zt8Ao9Se5Kt8Bj7ZXtzCm7Hn9Qp6Bo5Uv0Zn5Km7Oy3Zb4TdzWZx5Ft3Nq3OZx2Dk5Oe3Ey5NZxzUy1Nh1Gq6Aa6Z";

  let isDone = false;
  if (mode === "http") {
    for (let i = 0; i < token.length; i += 1) {
      _token += token[i];
      if (!isDone) {
        if (NUMBERS.includes(token[i])) {
          for (let power of salt) _token += power;
          isDone = true;
        }
      }

      if (token.length / 2 === i) {
        for (let power of anOtherSalt) _token += power;
      }
    }
  } else {
    _token = token;
    _token = _token.replace(salt, "");
    _token = _token.replace(anOtherSalt, "");
  }

  return _token;
}

/*
for (let i = 0 ; i < 26 ; i += 1 ) {
    salt += Arr [ Math.round ( Math.random () * Arr.length ) ]
    salt += number [ Math.round ( Math.random () * number.length ) ]
    salt += arr [ Math.round ( Math.random () * arr.length ) ]
}
*/
