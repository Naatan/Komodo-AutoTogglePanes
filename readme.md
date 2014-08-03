I like to use Komodo without any panes or tabs showing - just the editor.
Normally I would use keybindings to toggle the relevant panes when I need them
but I wanted something more intuitive; so I wrote this macro.

Basically what this does is it shows/hides the relevant pane/tabs when you move
your mouse cursor towards them. While editing your mouse cursor can rest somewhere
centered on the editor, then when you want to access eg. the left pane you move
your mouse cursor to the left editor edge and the left pane will automatically
show itself.

## Caveats

There are some caveats to consider that I'd still like to work out as much as
possible (pull requests welcome)

 * You might be trying to position your cursor to select some text in the editor
    and in doing so accidentally trigger a pane
 * Currently when you move your cursor off Komodo entirely panes will open from
    the side where your mouse left the application (not an issue if you work
    with Komodo maximized)
 * Probabably more that I haven't ran in to yet

## Configuration

There are a few preferences that you can tweak to your liking, you can set these
with `ko.prefs.setLong(pref,value)` or `ko.prefs.setBoolean(pref,value)`

 * autoTogglePaneHotspotSizeLeft
 * autoTogglePaneHotspotSizeRight
 * autoTogglePaneHotspotSizeTop
 * autoTogglePaneHotspotSizeBottom
 * autoTogglePaneDelay *(in ms, don't set this too low as it can make your UI jumpy)*
 * autoTogglePaneToggleTabs *true/false, in case you dont want it to toggle tabs*
