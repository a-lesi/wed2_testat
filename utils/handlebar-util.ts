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

    hbs.registerHelper('dateFormat', function (date) {
        let dd: any = date.getDate();
        let mm: any = date.getMonth()+1;
        let yyyy: any = date.getFullYear();

        if(dd<10) {
            dd = '0' + dd;
        }
        if(mm<10) {
            mm = '0' + mm;
        }

        return yyyy + '-' + mm + '-' + dd;
    });

    hbs.registerHelper('times', function(n, block) {
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    });
}