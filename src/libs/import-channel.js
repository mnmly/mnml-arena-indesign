
const importContents = (contents) => {

    let doc = app.activeDocument;
    let types = ['image', 'text', 'attachment']
    let spreads = types.map((t) => {
        return doc.masterSpreads.itemByName(`A-${t}`);
    }).filter((d) => {
        return d.isValid
    })

    // Function to override a master page item and make it editable
    function overrideItem(page, itemName) {
        var masterItem = page.masterPageItems.itemByName(itemName);
        if (masterItem.isValid) {
            return masterItem.override(page);
        } else {
            alert("Item '" + itemName + "' not found on master page.");
            return null;
        }
    }

    // Function to apply styles based on Markdown structure
    function applyMarkdownStyling(textFrame, markdownContent) {
        var htmlContent = marked.parse(markdownContent);
        
        // Parse HTML and apply styles
        var parser = new XML(htmlContent);
        for (var i = 0; i < parser.children().length(); i++) {
            var element = parser.children()[i];
            var paragraphStyle;
            
            switch (element.localName()) {
                case "h1":
                    paragraphStyle = "Heading 1";
                    break;
                case "h2":
                    paragraphStyle = "Heading 2";
                    break;
                case "p":
                    paragraphStyle = "Body";
                    break;
                case "ul":
                    paragraphStyle = "Bullet List";
                    break;
                // Add more cases as needed
            }
            
            if (paragraphStyle) {
                textFrame.paragraphs.add(element.toString());
                textFrame.paragraphs[-1].appliedParagraphStyle = myDocument.paragraphStyles.itemByName(paragraphStyle);
            }
        }
    }

    contents.forEach(( content )=>{

        let masterSpread = spreads[content.type.toLowerCase()]
        let masterPageIndex = (doc.pages.length + 1) % 2
        let masterPage = masterSpread.pages[masterPageIndex]
        let newPage = doc.pages.add(LocationOptions.AT_END, masterPage)
        Object.keys(content).forEach((key) => {
            var frame = overrideItem(newPage, key);
            if (frame && frame.isValid) {
                if(key == 'image') {

                } else {
                    frame.contents = content[key];
                }
            }
        })
    })
}