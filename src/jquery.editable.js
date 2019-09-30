//////////////////////////////////////
//  AUTHOR:         Marco Cusano    //
//  CREATION DATE:  2019/09/25      //
//  LAST UPDATE:    2019/09/25      //
//  VERSION:        1.0             //
//////////////////////////////////////

$('[editable="true"]').each(function() { initJQueryEditable($(this)); });

function jQueryEditable(dom) {
    if (dom.attr("editable")) { initJQueryEditable(dom); } else {
        dom.find('[editable="true"]').each(function() {
            initJQueryEditable($(this));
        });
    }

}

function initJQueryEditable(dom) {
    // Initialize
    dom.attr("contentEditable", "true");
    // Prevent new line if not a textarea
    dom.on("keypress", function(e) { if (e.keyCode == 13 && $(dom).attr("data-type") != "textarea") { $(dom).blur(); e.preventDefault(); } });
    // Check content type
    dom.on("DOMSubtreeModified", function(e) {
        // Get editable object options
        var o = {
            dom : $(this),
            content : $(this).attr("data-content") || $(this).html(),
            input : $("#" + $(this).attr("data-input")) || null,
            type :  $(this).attr("data-type") || "text",
            min : $(this).attr("data-min") || -2147483647,
            max : $(this).attr("data-max") || 2147483647,
            onChange : $(this).attr("data-onchange") || null
        }; var c = $(this).html();
        // Execute only if there is a content to check
        if (o.content.length) {
            if (o.type == "number") {
                if (isNaN(c)) { $(o.dom).html("0"); return false; }
                if (v < o.min) { $(o.dom).html(o.min); return true; } if (v > o.max) { $(o.dom).html(o.max); return true; }
            } else if (o.type == "price" || o.type == "real" || o.type == "double" || o.type == "float") {
                // Allowed values
                var a = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","];
                var i = o.content.length; var cc = 0; var ca = -1; while (i--) { var c = o.content.charAt(i);
                    if (c == "," || c == ".") { cc++; }
                    if (cc > 1) { $(o.dom).html("0.00"); return false; }
                    if (jQuery.inArray(c, a) < 0) { $(o.dom).html("0.00"); return false; }
                    var v = o.content.replace(",", ".");
                    if (v < o.min) { $(o.dom).html(o.min); return false; } if (v > o.max) { $(o.dom).html(o.max); return false; }
                }
            } else if (o.type == "email") {
                var i = o.content.length; var cc = 0; var cp = 0; while (i--) { var c = o.content.charAt(i); if (c == "@") { cc++; } if (c == ".") { cp++; } }
                if (cc !== 1 || cp !== 1 || o.content.length < 5 ) { if (o.input) { $(o.input).val(null); } }
            } else if (o.type == "link" || o.type == "url") {
                var i = o.content.length; var ch = 0; var cs = 0; while (i--) { var c = o.content.charAt(i); if (c == "http") { ch++; } if (cs == "/") { cp++; } }
                if (cc !== 1 || cs < 1 || o.content.length < 7 ) { if (o.input) { $(this).html("https://"); $(o.input).val(null); } }
            }
        }
        // Set value to an attached input element
        try { if (o.input) { var v = $(this).html().replace(",", "."); $(o.input).val(v); } } catch (e) { console.log("Attached input element not found. Please make sure you specified a valid 'id' in your 'data-input' value."); return false; }
        // Execute a custom code on changing values
        if (o.onChange) { window[o.onChange](1); }
        // Everything completed
        return true;
    });
    // Bind a custom event
    var ce = {
        event : $(this).attr("data-onevent") || null,
        function : $(this).attr("data-onevent-function") || null
    }
    if (ce.event && ce.function) { $(this).on(ce.event, function() { window[ce.function](0); }); }
    // End initialization with a custom function
    if ($(this).attr("data-onend")) { window[$(this).attr("data-onend")]; }
}
