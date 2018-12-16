describe('App Routing', function () {
    var channel;

    beforeAll(function () {
        App.on('start', function () {
            App.router.map(function (route) {
                route('testrouter', {path: '/test', abstract: true}, function () {
                    route('testrouter.create', {path: 'create/'});
                    route('testrouter.edit', {path: 'edit/:testroutereditid/'});
                    route('testrouter.getType', {path: ':page/'});
                });
            });

            App.router.use(this.entityViewMiddleware);

            // start listening to URL changes
            App.router.listen();
        });

        channel = Backbone.Radio.channel('testrouter');
        App.start();
    });

    afterAll(() => {
        App.destroy();
    });

    it('called edit service method', async function () {
        var callBackSpy = jasmine.createSpy();
        channel.on('edit', callBackSpy);

        var params = {};
        params['testroutereditid'] = 1;

        await App.router.transitionTo('testrouter.edit', params);
        expect(callBackSpy).toHaveBeenCalled();
    });

    it('calls getType service method', async function () {
        var callBackSpy = jasmine.createSpy();
        channel.on('getType', callBackSpy);

        await App.router.transitionTo('testrouter.getType', {page: 1});
        expect(callBackSpy).toHaveBeenCalled();
    });

    it('calls create service method', async function () {
        var callBackSpy = jasmine.createSpy();
        channel.on('create', callBackSpy);

        await App.router.transitionTo('testrouter.create');
        expect(callBackSpy).toHaveBeenCalled();
    });
});