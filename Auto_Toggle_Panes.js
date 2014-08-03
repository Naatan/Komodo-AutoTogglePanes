(function()
 {

    // Initiate namespace
    if ( ! ("extensions" in ko)) ko.extensions = {};
    if ( ! ("autoTogglePanes" in ko.extensions))
    {
        ko.extensions.autoTogglePanes = {};
    }
    var self = ko.extensions.autoTogglePanes;

    // Retrieve relevant nodes
    var editorViewBox = document.getElementById('editorviewbox');
    var contentWindow = document.getElementById("komodo_main");
    var leftPane = document.getElementById("workspace_left_area");
    var rightPane = document.getElementById("workspace_right_area");
    var bottomPane = document.getElementById("workspace_bottom_area");

    // Retrieve preferences
    var hotspotsizeLeft = ko.prefs.getLong("autoTogglePaneHotspotSizeLeft", 50);
    var hotspotsizeRight = ko.prefs.getLong("autoTogglePaneHotspotSizeRight", 50);
    var hotspotsizeTop = ko.prefs.getLong("autoTogglePaneHotspotSizeTop", 20);
    var hotspotsizeBottom = ko.prefs.getLong("autoTogglePaneHotspotSizeBottom", 20);
    var delay = ko.prefs.getLong("autoTogglePaneDelay", 100);
    var toggleTabs = ko.prefs.getBoolean("autoTogglePaneToggleTabs", true);

    // Remove existing event listener (if any)
    if ("onMouseMove" in self)
        window.removeEventListener("mousemove", self.onMouseMove);

    var log = require("ko/logging").getLogger("autopanetoggle");
    //log.setLevel(0);

    self.onMouseMove = function(e)
    {
        if ("timer" in self) clearTimeout(self.timer);
        self.timer = setTimeout(function() // Prevent multiple calls in short succession
        {
            // Stop if cursor is not on editor (eg. is on tab, statusbar)
            if (e.originalTarget.nodeName != "html:embed") return;

            // Stop if any mouse buttons are pressed (eg. selecting text)
            if (e.buttons !== 0) return;

            // Left pane
            var relativeX = e.screenX - editorViewBox.boxObject.screenX;
            if (relativeX < hotspotsizeLeft && leftPane.collapsed)
            {
                log.debug("Show left pane");
                ko.uilayout.togglePane("workspace_left_area");
            }
            else if (relativeX > hotspotsizeLeft &&  ! leftPane.collapsed)
            {
                log.debug("Hide left pane");
                ko.uilayout.togglePane("workspace_left_area");
            }

            // Right pane
            var rightRelativeX =  editorViewBox.boxObject.width - relativeX;
            if (rightRelativeX < hotspotsizeRight && rightPane.collapsed)
            {
                log.debug("Show right pane");
                ko.uilayout.togglePane("workspace_right_area");
            }
            else if (rightRelativeX > hotspotsizeRight &&  ! rightPane.collapsed)
            {
                log.debug("Hide right pane");
                ko.uilayout.togglePane("workspace_right_area");
            }

            // Tabs
            var relativeY = e.screenY - editorViewBox.boxObject.screenY;
            if (toggleTabs)
            {
                if (relativeY < hotspotsizeTop && ! ko.openfiles.isTabBarVisible())
                {
                    log.debug("Show tabs");
                    ko.openfiles.toggleTabBar();
                }
                else if (relativeY > hotspotsizeTop && ko.openfiles.isTabBarVisible())
                {
                    log.debug("Hide tabs");
                    ko.openfiles.toggleTabBar();
                }
            }

            // Bottom pane
            var relativeY = e.screenY - editorViewBox.boxObject.screenY;
            var bottomRelativeY = editorViewBox.boxObject.height - relativeY;
            if (bottomRelativeY < hotspotsizeBottom && bottomPane.collapsed)
            {
                log.debug("Show bottom pane");
                ko.uilayout.togglePane("workspace_bottom_area");
            }
            else if (bottomRelativeY > hotspotsizeBottom &&  ! bottomPane.collapsed)
            {
                log.debug("Hide bottom pane");
                ko.uilayout.togglePane("workspace_bottom_area");
            }

        }, delay);
    }

    window.addEventListener("mousemove", self.onMouseMove);

})();
