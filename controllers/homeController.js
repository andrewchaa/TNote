(function (controller) {
    controller.init = function (app) {
        app.get("/", function (req, res) {
            res.render("index", { title: "Tech Note" });
        });

        app.get("/firebase", function(req, res) {
            res.render("firebase", {})
        });
    };
})(module.exports);