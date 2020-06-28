//import Matter from "matter-js";

export const getRandomInt = (max, min) => {
    return parseInt(Math.random() * (max - min) + min);
}

export const selectDeselectButton = (selected, otherButtons) => {

    selected.render.opacity = 0.3;
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].render.opacity = 1;
    }
}

//----------------------------------------------------------------------------

export const radians = (degrees) => {
    return degrees * Math.PI / 180.0;
}

export const dot = (u, v) => {
    if (u.length != v.length) {
        throw { message: "dot(): vectors are not the same dimension" };
    }

    var sum = 0.0;
    for (var i = 0; i < u.length; ++i) {
        sum += u[i] * v[i];
    }

    return sum;
}

export const vectorLength = (u) => {
    return Math.sqrt(u.x * u.x + u.y * u.y);
}


