export function registerHelpers(hbs) {
    hbs.registerHelper('pretty_importance', function (importance) {
        let prettyImportance = "";
        for (let i = 0; i < importance; i++) {
            prettyImportance += "*"
        }
        return prettyImportance;
    });

    hbs.registerHelper('check_importance', function(importance, value) {
        return Number(importance) === value;
    })
}