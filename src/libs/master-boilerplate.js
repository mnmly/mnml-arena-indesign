const createBoilerplateSpread = (doc, name) => {
    // Create a new master spread
    const NO_PRINT_LAYER_NAME = 'NO_PRINT'
    var masterSpread = doc.masterSpreads.add();
    masterSpread.baseName = name;
    masterSpread.namePrefix = "A"
    
    function createNoPrintLayer() {
        var noPrintLayer;
        try {
            noPrintLayer = doc.layers.itemByName(NO_PRINT_LAYER_NAME);
            if (!noPrintLayer.isValid) {
                noPrintLayer = doc.layers.add({name: NO_PRINT_LAYER_NAME});
            }
        } catch (e) {
            noPrintLayer = doc.layers.add({name: NO_PRINT_LAYER_NAME});
        }

        // Set the layer to not print
        noPrintLayer.printable = false;
        return noPrintLayer
    }

    // Function to create frames on a page
    function createFramesOnPage(page, isSecondPage) {
        var pageWidth = page.bounds[3] - page.bounds[1];
        var pageHeight = page.bounds[2] - page.bounds[0];
        
        // Get margins
        var leftMargin = page.marginPreferences.left;
        var topMargin = page.marginPreferences.top;
        var rightMargin = page.marginPreferences.right;
        var bottomMargin = page.marginPreferences.bottom;
        
        // Calculate frame dimensions
        var frameWidth = pageWidth - leftMargin - rightMargin;
        var graphicFrameHeight = (pageHeight - topMargin - bottomMargin) * 0.5; // 50% of document height
        var x = isSecondPage ? pageWidth + leftMargin : leftMargin;
        var y = topMargin
        var layer = null
        for (let i = 0; i < doc.layers.count(); i++) {
            let _layer = doc.layers.item(i)
            if (_layer.name !== NO_PRINT_LAYER_NAME) {
                layer = _layer
                break
            }
        }
        if (name == 'text') {
            var textContentFrame = page.textFrames.add({
                geometricBounds: [
                    y,
                    x,
                    y += graphicFrameHeight,
                    x + frameWidth
                ],
                strokeColor: "None",
                fillColor: "None"
            });
            textContentFrame.itemLayer = layer
            textContentFrame.name = "content";

        } else {
            // Create graphic frame
            var graphicFrame = page.rectangles.add({
                geometricBounds: [
                    y,
                    x,
                    y += graphicFrameHeight,
                    x + frameWidth
                ],
                strokeColor: "None",
                fillColor: "None"
            });
            graphicFrame.itemLayer = layer
            graphicFrame.name = "image";
        }
        
        // Create text frame
        var h = 10
        var textFrame = page.textFrames.add({
            geometricBounds: [
                y += 5, // 5mm offset from bottom of graphic frame
                x,
                y += h,
                x + frameWidth
            ],
            strokeColor: "None",
            fillColor: "None"
        });
        textFrame.itemLayer = layer
        textFrame.name = "title";
        if (name == 'text') {
            textFrame.name = "created_at";
        }
        if (name == 'link' || name == 'attachment') {
            var sourceURLFrame = page.textFrames.add({
                geometricBounds: [
                    y += 5, // 5mm offset from bottom of graphic frame
                    x,
                    y += h,
                    x + frameWidth
                ],
                strokeColor: "None",
                fillColor: "None"
            });
            sourceURLFrame.itemLayer = layer
            sourceURLFrame.name = "source.url";
        }

        if (!isSecondPage) {
            // Create text frame
            var textFrame = page.textFrames.add({
                geometricBounds: [
                    topMargin + graphicFrameHeight + 5, // 5mm offset from bottom of graphic frame
                    x,
                    pageHeight - bottomMargin,
                    x + frameWidth
                ],
                strokeColor: "None",
                fillColor: "None"
            });
            textFrame.name = "note";
            textFrame.itemLayer = createNoPrintLayer();
            textFrame.contents = "Refer to https://dev.are.na/documentation/blocks#Block52094 for available layer names."
        }
    }

    createFramesOnPage(masterSpread.pages.item(0));
    if (doc.documentPreferences.facingPages) {
        createFramesOnPage(masterSpread.pages.item(1), true);
    }
    return masterSpread
}

export { createBoilerplateSpread }