export function registerHelpers(hbs) {
    hbs.registerHelper('check_importance', function (importance, value) {
        return Number(importance) === value;
    });
    hbs.registerHelper('dateFormat', function (date) {
        return date.toISOString().substring(0, 10);
    });
    hbs.registerHelper('times', function (n, block) {
        let accum = '';
        for (let i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });
}
//# sourceMappingURL=handlebar-util.js.map