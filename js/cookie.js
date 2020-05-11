const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const getCookie = (name) => {
    const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
    return value ? value[2] : null;
};

setCookie("todo-list", "true", 1);
console.log(getCookie("todo-list"));