(function (controller) {
    controller.init = function (app) {
        app.get("/", function (req, res) {
            res.render("index", { title: "Tech Note" });
        });
    };
})(module.exports);