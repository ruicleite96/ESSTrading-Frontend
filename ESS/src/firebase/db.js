import { db } from './firebase';
import userImage from '../constants/userImage';

export const doCreateUser = (id, username, first_name, last_name, contacto) =>
    db.ref(`users/${id}`).set({
        username,
        first_name,
        last_name,
        contacto,
        saldo: 10000,
        image: userImage,
        imageCroped: userImage,
    });

export const onceGetUser = id =>
    db.ref(`users/${id}`).once('value');

export const onGetUser = (id, func) =>
    db.ref(`users/${id}`).on('value', func);

export const doUpdateUser = function (id, username, first_name, last_name, contacto, image, imageCroped, data_nascimento, sexo, nif) {
    return new Promise((resolve, reject) => {
        db.ref(`users/${id}`).update({
            username,
            first_name,
            last_name,
            contacto,
            image: (image || userImage),
            imageCroped: (imageCroped || userImage),
            data_nascimento,
            sexo,
            nif
        })
            .then(() => resolve())
            .catch(error => reject());
    })
}

export const doUpdateSaldo = function (id, saldo) {
    return new Promise((resolve, reject) => {
        db.ref(`users/${id}`).update({
            saldo,
        })
            .then(() => resolve())
            .catch(error => reject());
    })
}

export const doAbrirCFD = function (id, tipo, ativo, unidades, montante, valorAbertura) {
    return new Promise((resolve, reject) => {
        db.ref(`cfds/${id}`).push({
            ativo,
            tipo,
            unidades,
            montante,
            valorAbertura,
        })
            .then(() => resolve())
            .catch(error => reject());
    });
}

export const onceGetCFDs = id =>
    db.ref(`cfds/${id}`).once('value');

export const onGetCFDs = (id, func) =>
    db.ref(`cfds/${id}`).on('value', func);