const Log = require("logging-middleware");

exports.test = async (req, res) => {
    try {

        const log = await Log(
            "backend",
            "info",
            "controller",
            "Test API called"
        );

        console.log("Returned:", log);

        res.json({
            message: "Working"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error" });
    }
};