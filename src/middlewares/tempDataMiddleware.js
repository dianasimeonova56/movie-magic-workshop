export const tempData = (req, res, next) => {
    res.dataRedirect = function(url, tempData) {
        //session -> to temporarily store data
        req.session.tempData = tempData;
        req.session.isFirstRequest = true; //we need to have 2 runs, we delete tempData on second tun


        return red.redirect(url);
    }

    if(!req.session.tempData) {
        return next();
    }

    if(req.session.isFirstRequest) {
        //we are on the first return, we should use the temp data NOW
        res.session.isFirstRequest = false;
        res.locals = Object.assign(req.locals, req.session.tempData);
    } else {
        req.session.tempData = null;
        req.session.isFirstRequest = null; //we delete on the secon run
    }

    next();
};