const createBoilerplateSpread = (doc, name) => {
    // Create a new master spread
    var masterSpread = doc.masterSpreads.add();
    masterSpread.baseName = name;
    masterSpread.namePrefix = "A"

    function createNoPrintLayer() {
        var noPrintLayer;
        try {
            noPrintLayer = doc.layers.itemByName("NO_PRINT");
            if (!noPrintLayer.isValid) {
                noPrintLayer = doc.layers.add({name: "NO_PRINT"});
            }
        } catch (e) {
            noPrintLayer = doc.layers.add({name: "NO_PRINT"});
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
        var offsetX = isSecondPage ? pageWidth + leftMargin : leftMargin;

        // Create graphic frame
        var graphicFrame = page.rectangles.add({
            geometricBounds: [
                topMargin,
                offsetX,
                topMargin + graphicFrameHeight,
                offsetX + frameWidth
            ],
            strokeColor: "None",
            fillColor: "None"
        });
        graphicFrame.name = "image";
        
        // Create text frame
        var textFrame = page.textFrames.add({
            geometricBounds: [
                topMargin + graphicFrameHeight + 5, // 5mm offset from bottom of graphic frame
                offsetX,
                pageHeight - bottomMargin,
                offsetX + frameWidth
            ],
            strokeColor: "None",
            fillColor: "None"
        });
        textFrame.name = "title";

        if (!isSecondPage) {
            // Create text frame
            var textFrame = page.textFrames.add({
                geometricBounds: [
                    topMargin + graphicFrameHeight + 5, // 5mm offset from bottom of graphic frame
                    offsetX,
                    pageHeight - bottomMargin,
                    offsetX + frameWidth
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
}

export { createBoilerplateSpread }