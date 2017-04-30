class Formatter {
    formatPhoneNumber(s) {
        var s2 = ("" + s).replace(/\D/g, '');
        var m = s2.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
        return (!m) ? null : "+" + m[1] + " (" + m[2] + ") " + m[3] + "-" + m[4] + "-" + m[5];
    }
}

const formatter = new Formatter();
export {formatter};