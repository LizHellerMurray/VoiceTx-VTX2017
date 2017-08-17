cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/uk.co.workingedge.cordova.plugin.sqliteporter/www/sqlitePorter.js",
        "id": "uk.co.workingedge.cordova.plugin.sqliteporter.sqlitePorter",
        "clobbers": [
            "cordova.plugins.sqlitePorter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-email/www/email_composer.js",
        "id": "cordova-plugin-email.EmailComposer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "uk.co.workingedge.cordova.plugin.sqliteporter": "0.1.3",
    "cordova-plugin-email": "1.2.6"
}
// BOTTOM OF METADATA
});