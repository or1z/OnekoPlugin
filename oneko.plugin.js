/**
 * @name OnekoPlugin
 * @version 1.0.0
 * @author or1z
 * @authorId b5se
 * @description Made Possible By: b5se - Adds an interactive cat following your mouse cursor. Made compatible with BetterDiscord plugins.
 * @source https://github.com/or1z/OnekoPlugin
 * @changelogDate 2024-11-27
 * @credits adryd325 (oneko.js), or1z (BetterDiscord compatibility)
 * @invite https://discord.gg/swear
 * Changelog: Initial Release: Added mouse-following cat with BetterDiscord compatibility.
 */

'use strict';

/*@module @manifest */
const manifest = {
    "name": "OnekoPlugin",
    "version": "1.0.0",
    "author": "or1z",
    "authorId": "b5se",
    "description": "Made Possible By: b5se - Adds an interactive cat following your mouse cursor. Made compatible with BetterDiscord plugins.",
    "source": "https://github.com/adryd325/oneko.js",
    "invite": "https://discord.gg/swear",  // Change this to your actual invite link
    "changelog": [{
        "title": "Initial Release",
        "type": "added",
        "items": [
            "Initial release of the Oneko plugin that makes a cat follow the mouse cursor with BetterDiscord compatibility."
        ]
    }],
    "changelogDate": "2024-11-27"
};
/*@end */

/* @module @api */
const { Webpack } = BdApi;
/*@end */

/* @module oneko.js */

// Plugin Initialization
class OnekoPlugin {
    constructor() {
        this.pluginName = 'OnekoPlugin';
    }

    start() {
        this.loadScript();
    }

    stop() {
        this.removeCat();
    }

    loadScript() {
        fetch("https://raw.githubusercontent.com/adryd325/oneko.js/8fa8a1864aa71cd7a794d58bc139e755e96a236c/oneko.js")
            .then(response => response.text())
            .then(script => {
                // Modify the script if needed
                const modifiedScript = script
                    .replace("./oneko.gif", "https://raw.githubusercontent.com/adryd325/oneko.js/14bab15a755d0e35cd4ae19c931d96d306f99f42/oneko.gif")
                    .replace("(isReducedMotion)", "(false)");

                // Execute the modified script to create the cat
                eval(modifiedScript);

                // Ensure the cat stays on top
                this.makeCatStayOnTop();
            })
            .catch(error => console.error("Error loading oneko.js:", error));
    }

    removeCat() {
        const onekoElement = document.getElementById("oneko");
        if (onekoElement) {
            onekoElement.remove();
        }
    }

    makeCatStayOnTop() {
        const onekoElement = document.getElementById("oneko");
        if (onekoElement) {
            onekoElement.style.position = "fixed";  // Make sure it's fixed to the screen
            onekoElement.style.zIndex = "9999";     // Ensure it's above all other elements
            onekoElement.style.pointerEvents = "none";  // Allow interaction with underlying elements
        }
    }
}

// Plugin Entry Points
const plugin = new OnekoPlugin();

module.exports = plugin;
