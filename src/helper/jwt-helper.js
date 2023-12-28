import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ResponseError } from "./../error/response-error.js";

const convertExpToDate = async (exp) => {
  const date = new Date(0);
  date.setUTCSeconds(exp);

  return date;
};

const generateAccessToken = async (user) => {
  let exp;
  if (user.role?.role_name === "Admin") {
    exp = "15m";
  } else {
    exp = "12h";
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role?.role_name,
    },
    process.env.SECRET,
    {
      expiresIn: exp,
    }
  );

  return token;
};

const generateRefreshToken = async (user) => {
  let exp;
  if (user.role?.role_name === "Admin") {
    exp = "2h";
  } else {
    exp = "30d";
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET,
    {
      expiresIn: exp,
    }
  );

  return token;
};

const generateResetPasswordToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET,
    {
      expiresIn: "5m",
    }
  );

  return token;
};

const generateVerifyEmailToken = async (user) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET,
    {
      expiresIn: "5m",
    }
  );

  return token;
};

const getTokenPart = async (token) => {
  try {
    const tokenParts = token.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new ResponseError(400, "Invalid token format");
    }

    const tokenFinal = tokenParts[1];

    return tokenFinal;
  } catch (e) {
    throw new ResponseError(400, "Invalid token format");
  }
};

const decodeToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      throw new ResponseError(400, "Token has expired");
    }

    return decodedToken;
  } catch (e) {
    throw new ResponseError(400, "Invalid token");
  }
};

const generateTokens = async (user) => {
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export {
  generateAccessToken,
  generateRefreshToken,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  generateTokens,
  getTokenPart,
  decodeToken,
  convertExpToDate,
};
