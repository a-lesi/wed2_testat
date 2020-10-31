function configurator(req, res) {
    let configuration;
    if (req.session.configuration) {
        configuration = JSON.parse(req.session.configuration);
    }
    else {
        configuration = {
            theme: '',
            notes: {
                filterBy: '',
                orderBy: 'createdAt',
                sorting: 1
            }
        };
    }
    if (req.body.theme !== undefined) {
        configuration.layout = req.body.theme;
    }
    if (req.body.orderBy !== undefined) {
        configuration.notes.orderBy = req.body.orderBy;
        // 1 = ascending, -1 = descending
        if (configuration.notes.sorting === 1) {
            configuration.notes.sorting = -1;
        }
        else {
            configuration.notes.sorting = 1;
        }
    }
    if (req.body.filterBy !== undefined) {
        configuration.notes.filterBy = req.body.filterBy;
    }
    req.session.configuration = configuration;
}
export const sessionConfigurator = configurator;
//# sourceMappingURL=configurator.js.map