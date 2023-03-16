require('dotenv').config();
const crypto = require("crypto")
const { Users } = require("../models")

// salt
// 64 바이트 길이의 문자열을 만든다.
// salt는 비밀번호 비교시 사용되야하므로 같이 저장되어야한다.
const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

// pbkdf2(암호화 알고리즘) : pbkdf2(비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘)
// pbkdf2는 멀티 스레딩 방식으로 동작함.
const createHashedPassword = (plainPassword) =>
new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, Number(process.env.SALT_ITERATIONS_CNT), Number(process.env.SALT_SET_BYTE), process.env.ENCRYPT_SET_ALGORITHM, (err, key) => {
        if (err) reject(err);
        resolve({ hashedPassword: key.toString(process.env.SALT_SET_ALGORITHM), salt });
    });
});

// 로그인
const makePasswordHashed = (userId, plainPassword) =>
new Promise(async (resolve, reject) => {
    const user = await Users.findByPk(userId)

    crypto.pbkdf2(plainPassword, user.salt, Number(process.env.SALT_ITERATIONS_CNT), Number(process.env.SALT_SET_BYTE), process.env.ENCRYPT_SET_ALGORITHM, (err, key) => {
        if (err) reject(err);
        resolve({hashedpassword: key.toString(process.env.SALT_SET_ALGORITHM)});
    });
});

module.exports = { createHashedPassword, makePasswordHashed };