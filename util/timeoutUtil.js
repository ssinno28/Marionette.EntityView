var TimeoutUtil;
(function (_) {
    TimeoutUtil = (function () {

        var constructor = function () {
            var pendingOperation = false;
            //takes a variable set of arguments.. the first argument should be the delay
            this.suspendOperation = function () {
                var outerScope = this;

                //need to set the arguments in the outerscope
                this.arguments = arguments;

                //the first argument should always be the delay
                if (!parseInt(this.arguments[0])) {
                    console.log('the first argument should always be the number of miliseconds');
                    return;
                }

                var delay = this.arguments[0];

                //this will only be true if the operation is pending
                if (pendingOperation) {
                    pendingOperation = false;
                    clearTimeout(this.setDelay);
                }

                //queue up the operation
                pendingOperation = true;
                this.setDelay = setTimeout(
                    function () {
                        if (pendingOperation) {
                            for (var i = 1; i < outerScope.arguments.length; i++) {
                                outerScope.arguments[i]();
                            }
                            pendingOperation = false;
                        }
                    }, delay);
            };
        };

        return constructor;
    })();
})(_);